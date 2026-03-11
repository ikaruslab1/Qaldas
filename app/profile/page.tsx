import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { AnimatedContainer } from "@/app/components/AnimatedContainer";
import { AnimatedIcon } from "@/app/components/AnimatedIcon";

export default async function ProfilePage() {
  const { user: luciaUser } = await validateRequest();

  if (!luciaUser) {
    redirect("/");
  }

  // Fuerza de tipado para evitar el lint error temporalmente
  const user = luciaUser as typeof luciaUser & { name: string, email: string, role: string };

  // Generate some realistic fake stats for the cyberpunk flavor
  const fakeId = user.id.toUpperCase().substring(0, 8);
  const joinDate = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });

  return (
    <>
      <Navbar />
      
      {/* Background Matrix & Elements reused from main layout */}
      <div className={'fixed inset-0 z-0 pointer-events-none opacity-[0.4] bg-matrix bg-matrix'}></div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden block">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <main className="relative z-10 pt-40 pb-20 min-h-screen flex items-center justify-center px-4">
        
        {/* Main Dashboard Container */}
        <AnimatedContainer animation="scaleIn" delay={0.1} className="w-full max-w-5xl bg-black-surface/80 border border-primary/20 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          
          {/* Aesthetic Cyber Lines & Corners */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary"></div>
          
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 relative z-10">
            
            {/* Sidebar Identity Section */}
            <div className="md:col-span-4 border-r border-primary/10 p-8 flex flex-col items-center justify-center bg-black/40">
              
              <div className="relative mb-8 group-hover:scale-105 transition-transform duration-700">
                <AnimatedIcon delay={0.4} className="w-40 h-40 rounded-full border border-primary/40 bg-black flex items-center justify-center relative z-10 shadow-neon">
                  <span className="material-symbols-outlined text-6xl text-primary/70">shield_person</span>
                </AnimatedIcon>
                {/* Orbital rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-primary/10 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
              </div>

              <div className="text-center space-y-2 mb-8">
                <h1 className="font-display text-2xl font-bold text-white tracking-widest uppercase">{user.name || 'Autonomous Operative'}</h1>
                <p className="text-primary font-mono text-sm">{user.email}</p>
              </div>

              <div className="w-full space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Op-Class</span>
                  <span className={`text-xs px-2 py-1 font-bold tracking-widest uppercase ${user.role === 'admin' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-primary/10 text-primary border border-primary/30'}`}>
                    {user.role}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Entry UID</span>
                  <span className="text-xs text-gray-300 font-mono">{fakeId}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Init Date</span>
                  <span className="text-xs text-gray-300 font-mono">{joinDate}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Network</span>
                  <span className="text-xs text-green-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e] animate-pulse"></span>
                    SECURE
                  </span>
                </div>
              </div>

            </div>

            {/* Main Content Dashboard */}
            <div className="md:col-span-8 p-8 md:p-12 relative flex flex-col justify-between h-full min-h-[500px]">
              
              <div className="absolute top-8 right-8 text-right font-mono text-[10px] text-primary/30 leading-tight">
                OVERSEE_MATRIX_SYS <br/>
                V.29.11.0
              </div>

              <div>
                <h2 className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2 uppercase tracking-tight">Command Panel</h2>
                <div className="h-[1px] w-24 bg-primary mb-10 shadow-neon"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Card 1 */}
                  <AnimatedContainer delay={0.5} animation="slideInRight" className="h-full">
                    <div className="h-full p-6 bg-black border border-white/5 hover:border-primary/40 transition-colors group/card relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                      <AnimatedIcon delay={0.7} className="mb-4"><span className="material-symbols-outlined text-primary text-3xl">terminal</span></AnimatedIcon>
                      <h3 className="text-lg font-bold text-white mb-2 font-display">Node Connection</h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-light">Access to quantum simulators and integration terminals. Restricted interface for the local network.</p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-primary font-mono opacity-0 group-hover/card:opacity-100 transition-opacity transform translate-y-2 group-hover/card:translate-y-0">
                        <span>INITIATE</span> <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </div>
                    </div>
                  </AnimatedContainer>

                  {/* Card 2 */}
                  <AnimatedContainer delay={0.7} animation="slideInRight" className="h-full">
                    <div className="h-full p-6 bg-black border border-white/5 hover:border-primary/40 transition-colors group/card relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                      <AnimatedIcon delay={0.9} className="mb-4"><span className="material-symbols-outlined text-primary text-3xl">psychology</span></AnimatedIcon>
                      <h3 className="text-lg font-bold text-white mb-2 font-display">IAM Algorithms</h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-light">Supervision of active Deep Learning networks. Auto-tuning parameters and convolutional weights.</p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-primary font-mono opacity-0 group-hover/card:opacity-100 transition-opacity transform translate-y-2 group-hover/card:translate-y-0">
                        <span>MONITOR</span> <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </div>
                    </div>
                  </AnimatedContainer>
                </div>

              </div>

              {/* Console logs visual logic */}
              <AnimatedContainer delay={1.1} animation="fadeInUp" className="mt-12 w-full h-32 bg-black/80 border border-primary/20 p-4 font-mono text-[10px] text-primary/60 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-1 bg-primary/20 text-primary">SYS_LOG</div>
                <div className="space-y-1 opacity-70">
                  <p>{`>`} Initializing secure connection...</p>
                  <p>{`>`} Verifying identity packets for [{user.email}]...</p>
                  <p>{`>`} Access level {user.role.toUpperCase()} granted.</p>
                  <p>{`>`} Loading workspace partitions...</p>
                  <p className="text-white animate-pulse">{`>`} System Ready. Awaiting input _</p>
                </div>
              </AnimatedContainer>

            </div>
          </div>
        </AnimatedContainer>
      </main>
    </>
  );
}
