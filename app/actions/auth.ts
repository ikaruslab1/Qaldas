"use server"

// We use WebCrypto for password hashing to avoid Cloudflare Workers node:crypto issues
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { initializeLucia } from "@/lib/auth";
import { generateIdFromEntropySize } from "lucia";

import { Resend } from "resend";
import WelcomeEmail from "@/app/components/emails/WelcomeEmail";

// Helper function to safely get our Cloudflare bindings
async function getDB() {
  const { env } = await getCloudflareContext({ async: true }) as unknown as { env: { DB: D1Database } };
  if (!env || !env.DB) throw new Error("Database binding not found");
  return env.DB;
}

// WebCrypto based PBKDF2 hashing compatible with Cloudflare Workers
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const derivedBits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  // Convert to hex
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const hashHex = Array.from(new Uint8Array(derivedBits)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${saltHex}:${hashHex}`;
}

async function verifyPassword(hashString: string, password: string): Promise<boolean> {
  const parts = hashString.split(':');
  if (parts.length !== 2) return false;
  const [saltHex, hashHex] = parts;
  
  const salt = new Uint8Array(saltHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const derivedBits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  const newHashHex = Array.from(new Uint8Array(derivedBits)).map(b => b.toString(16).padStart(2, '0')).join('');
  return newHashHex === hashHex;
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
    return { error: "Invalid input" };
  }

  try {
    const db = await getDB();
    
    // Create password hash (using WebCrypto compatible PBKDF2)
    const passwordHash = await hashPassword(password);
    const userId = generateIdFromEntropySize(10); // 16 character string

    // Check if user already exists
    const existingUser = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
    if (existingUser) {
      return { error: "Email is already registered." };
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
        subject: 'Welcome to Qaldas!',
        // @ts-expect-error - Incompatibilidad de tipos entre React 19 y Resend
        react: WelcomeEmail({ firstName }),
      });
    } catch (emailError) {
      // We don't want to break the registration process if email fails
      console.error("Failed to send welcome email:", emailError);
    }

    return { success: true, emailSent: true };
  } catch (error) {
    console.error("Error registering user: ", error);
    return { error: "Error registering user, please try again." };
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" || !email.includes("@") ||
    typeof password !== "string" || password.length < 6
  ) {
    return { error: "Invalid input" };
  }

  try {
    const db = await getDB();

    const user = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<{ id: string, password_hash: string }>();

    if (!user) {
      return { error: "Incorrect credentials" };
    }

    const validPassword = await verifyPassword(user.password_hash, password);

    if (!validPassword) {
      return { error: "Incorrect credentials" };
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
    return { error: "An error occurred while trying to log in." };
  }
}

export async function logoutUser() {
  try {
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
  } catch (error) {
    console.error("Logout user error: ", error);
    return { error: "Error logging out" };
  }
}
