"use server"

import { Scrypt } from "oslo/password";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { initializeLucia } from "@/lib/auth";
import { generateIdFromEntropySize } from "lucia";

import { Resend } from "resend";
import WelcomeEmail from "@/app/components/emails/WelcomeEmail";

// Helper function to safely get our Cloudflare bindings
async function getDB() {
  const { env } = await getCloudflareContext({ async: true }) as unknown as { env: { DB: D1Database } };
  return env.DB;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerUser(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof name !== "string" || name.length < 3 ||
    typeof email !== "string" || !email.includes("@") ||
    typeof password !== "string" || password.length < 6
  ) {
    return { error: "Entrada inválida" };
  }

  const db = await getDB();

  // Create password hash (using Scrypt optimized for Edge/WebCrypto compatibility)
  const scrypt = new Scrypt();
  const passwordHash = await scrypt.hash(password);

  const userId = generateIdFromEntropySize(10); // 16 character string

  try {
    // Check if user already exists
    const existingUser = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
    if (existingUser) {
      return { error: "El correo electrónico ya está registrado." };
    }

    // Insert new user
    await db.prepare("INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)")
      .bind(userId, name, email, passwordHash, "user")
      .run();

    const lucia = initializeLucia(db);
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    
    const cookieStore = await cookies();
    // @ts-ignore
    cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    // Send Welcome Email asynchronously
    try {
      const firstName = name.split(" ")[0];
      await resend.emails.send({
        from: 'Qaldas <onboarding@qaldas.com>',
        to: [email],
        subject: '¡Bienvenido a Qaldas!',
        react: WelcomeEmail({ firstName }),
      });
    } catch (emailError) {
      // We don't want to break the registration process if email fails
      console.error("Failed to send welcome email:", emailError);
    }

    return { success: true, emailSent: true };
  } catch (error) {
    console.error("Error registering user: ", error);
    return { error: "Error al registrar el usuario, por favor intenta de nuevo." };
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" || !email.includes("@") ||
    typeof password !== "string" || password.length < 6
  ) {
    return { error: "Entrada inválida" };
  }

  const db = await getDB();

  try {
    const user = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<{ id: string, password_hash: string }>();

    if (!user) {
      return { error: "Credenciales incorrectas" };
    }

    const scrypt = new Scrypt();
    const validPassword = await scrypt.verify(user.password_hash, password);

    if (!validPassword) {
      return { error: "Credenciales incorrectas" };
    }

    const lucia = initializeLucia(db);
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    
    const cookieStore = await cookies();
    // @ts-ignore
    cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: true };
  } catch (error) {
    console.error("Login user error: ", error);
    return { error: "Ocurrió un error al intentar iniciar sesión." };
  }
}

export async function logoutUser() {
  const db = await getDB();
  const lucia = initializeLucia(db);
  
  const cookieStore = await cookies();
  // @ts-ignore
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value;
  if (!sessionId) {
    return { success: false, error: "No session found" };
  }

  await lucia.invalidateSession(sessionId);

  const sessionCookie = lucia.createBlankSessionCookie();
  
  // @ts-ignore
  cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return { success: true };
}
