import { validateRequest } from "@/lib/auth";
import ClientAuthMenu from "./ClientAuthMenu";

export default async function Navbar() {
  const { user } = await validateRequest();

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-black-main/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <span className="font-kyiv font-bold text-2xl tracking-widest text-white uppercase">Qaldas</span>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <div className="flex items-center border border-primary/30 rounded-none px-3 py-1 text-xs font-semibold bg-black-surface">
              <span className="px-2 text-primary cursor-pointer text-shadow-neon">EN</span>
              <span className="text-gray-600">|</span>
              <span className="px-2 text-gray-500 hover:text-primary cursor-pointer transition-colors">ES</span>
            </div>
            
            <a className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-black-main font-bold text-sm transition-all duration-300 shadow-neon hover:shadow-neon-hover tracking-wider uppercase ml-4" href="#">
              Contact
            </a>

            {/* Inyectamos el componente interactivo de la sesión del usuario del cliente */}
            {/* 
              // @ts-ignore */}
            <ClientAuthMenu user={user} />
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button className="inline-flex items-center justify-center p-2 text-primary hover:text-white focus:outline-none" type="button">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
