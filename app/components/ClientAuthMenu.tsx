"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";
import { logoutUser } from "@/app/actions/auth";

type UserType = {
  id: string;
  // Añadir tipados extras acorde a DatabaseUserAttributes en lib/auth.ts
  email?: string;
  name?: string;
  role?: string;
} | null;

export default function ClientAuthMenu({ user }: { user: UserType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    window.location.reload();
  };

  if (!user) {
    return (
      <>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group relative inline-flex items-center justify-center px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-black-main font-bold text-sm transition-all duration-300 shadow-neon hover:shadow-neon-hover tracking-wider uppercase ml-6"
        >
          {/* Decorative Corner Lines */}
          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-l-2 border-t-2 border-primary group-hover:border-black-main"></span>
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r-2 border-b-2 border-primary group-hover:border-black-main"></span>
          Ingresar
          <span className="material-symbols-outlined text-lg ml-2 group-hover:translate-x-1 transition-transform">login</span>
        </button>

        <AuthModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          initialMode="login"
        />
      </>
    );
  }

  // Si está autenticado
  return (
    <div className="relative group ml-6">
      <button className="flex items-center gap-2 px-4 py-2 border border-primary/40 bg-black-surface/50 text-white font-mono text-sm tracking-widest hover:border-primary transition-colors cursor-crosshair">
        <span className="material-symbols-outlined text-primary text-sm">person</span>
        <span className="truncate max-w-[100px]">{user.name || user.email?.split('@')[0]}</span>
        <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] ml-1">{user.role}</span>
        <span className="material-symbols-outlined text-xs mt-[1px] ml-1">arrow_drop_down</span>
      </button>

      {/* Menú Dropdown Estilo Cyber/Tech */}
      <div className="absolute right-0 mt-0 w-48 bg-black-main border border-primary/40 shadow-[0_4px_30px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
        <div className="absolute -top-[1px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="p-3">
          <p className="text-[10px] uppercase text-primary/50 tracking-widest mb-1 border-b border-primary/20 pb-1">Identidad Activa</p>
          <p className="text-white text-xs truncate max-w-full">{user.email}</p>
        </div>
        <ul className="flex flex-col text-sm border-t border-primary/10">
          <li>
            <a href="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-primary/10 hover:border-l-2 hover:border-primary transition-all">
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              Analíticas & Perfil
            </a>
          </li>
          <li className="border-t border-primary/10">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 hover:border-l-2 hover:border-red-500 transition-all text-left">
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Cerrar Conexión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
