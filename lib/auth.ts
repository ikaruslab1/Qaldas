import { Lucia } from "lucia";
import type { Session, User } from "lucia";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";
import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cache } from "react";

// Type extending the module for lucia sessions
declare module "lucia" {
  interface Register {
    Lucia: Lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  name: string;
  role: string;
}

// In Cloudflare Workers/Pages, D1 is passed through the context bindings.
// Instead of a global Lucia instance, we often need to initialize it per-request, 
// OR initialize it as needed by passing the D1 binding.
export function initializeLucia(D1: D1Database) {
  const adapter = new D1Adapter(D1, {
    user: "users",
    session: "sessions"
  });

  return new Lucia(adapter, {
    sessionCookie: {
      expires: false,
      attributes: {
        secure: process.env.NODE_ENV === "production"
      }
    },
    getUserAttributes: (attributes) => {
      return {
        email: attributes.email,
        name: attributes.name,
        role: attributes.role
      };
    }
  });
}

export const validateRequest = cache(async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
  const { env } = await getCloudflareContext({ async: true }) as unknown as { env: { DB: D1Database } };
  const db = env.DB;
  const lucia = initializeLucia(db);

  // @ts-ignore
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null
    };
  }

  const result = await lucia.validateSession(sessionId);
  
  // En Next.js App Router no puedes modificar las cookies en componentes Server de solo lectura,
  // por lo tanto, envolvemos la actualización de la cookie en un bloque try-catch
  // (esto es seguro ya que Lucia igualmente invalidará la sesión).
  try {
    const cookieStore = await cookies();
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      // @ts-ignore
      cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      // @ts-ignore
      cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {}
  
  return result;
});
