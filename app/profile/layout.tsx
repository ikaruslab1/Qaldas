import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    // Redirige al inicio si el usuario no tiene una sesión activa
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 
        Añadimos un contenedor protegido. Opcionalmente podrías inyectar el rol del usuario mediante
        React Context aquí para todos los subcomponentes del perfil, de la siguiente forma
      */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
