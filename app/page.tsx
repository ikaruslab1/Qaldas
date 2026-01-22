import Hero from "./ui/hero"


export default function Home() {
  return (
    <>

    <div className={'fixed inset-0 z-0 pointer-events-none opacity-[0.4] bg-matrix bg-matrix'}></div>

    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden block">
        <div className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent animate-flow left-[10%] h-[40vh] top-[-40vh]" style={{ animationDuration: '7s', animationDelay: '0s' }}></div>
        <div className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent animate-flow left-[25%] h-[60vh] top-[-60vh]" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
        <div className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent animate-flow left-[50%] h-[40vh] top-[-40vh]" style={{ animationDuration: '8s', animationDelay: '1s', opacity: 0.3 }}></div>
        <div className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent animate-flow left-[85%] h-[30vh] top-[-30vh]" style={{ animationDuration: '6s', animationDelay: '4s' }}></div>
        
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px] mix-blend-screen"></div>
    </div>

    <nav className="fixed w-full z-50 transition-all duration-300 bg-black-main/80 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-24">
                <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-10 rounded-none border border-primary flex items-center justify-center text-primary font-bold text-xl relative overflow-hidden shadow-neon group-hover:bg-primary group-hover:text-black transition-all duration-300">
                        <span className="z-10 relative">Q</span>
                        <div className="absolute inset-0 bg-primary/20 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </div>
                    <span className="font-display font-bold text-2xl tracking-widest text-white uppercase">Qaldas</span>
                </div>
                <div className="hidden md:flex space-x-10 items-center">
                    <a className="text-sm font-medium text-gray-400 hover:text-primary transition-colors tracking-wide uppercase" href="#">About</a>
                    <a className="text-sm font-medium text-gray-400 hover:text-primary transition-colors tracking-wide uppercase" href="#">Research</a>
                    <a className="text-sm font-medium text-gray-400 hover:text-primary transition-colors tracking-wide uppercase" href="#">Education</a>
                    <a className="text-sm font-medium text-gray-400 hover:text-primary transition-colors tracking-wide uppercase" href="#">Solutions</a>
                    <div className="flex items-center border border-primary/30 rounded-none px-3 py-1 text-xs font-semibold bg-black-surface">
                        <span className="px-2 text-primary cursor-pointer text-shadow-neon">EN</span>
                        <span className="text-gray-600">|</span>
                        <span className="px-2 text-gray-500 hover:text-primary cursor-pointer transition-colors">ES</span>
                    </div>
                    <a className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-black-main font-bold text-sm transition-all duration-300 shadow-neon hover:shadow-neon-hover tracking-wider uppercase" href="#">
                        Contact
                    </a>
                </div>
                <div className="-mr-2 flex items-center md:hidden">
                    <button className="inline-flex items-center justify-center p-2 text-primary hover:text-white focus:outline-none" type="button">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <main className="relative z-10 pt-32 pb-20 overflow-hidden">

      
      <Hero>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative min-h-[80vh] flex flex-col justify-center py-24">

            <div className="lg:w-full relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 border-l-2 border-primary bg-gradient-to-r from-primary/10 to-transparent text-primary text-xs font-mono mb-8 tracking-widest animate-glitch">
                    <span className="w-1.5 h-1.5 bg-primary shadow-[0_0_10px_#00ff41] animate-pulse"></span>
                    <span>NODE CONNECTED: <span className="text-white">LIVE_STREAM</span></span>
                </div>
                <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8 text-white tracking-tight drop-shadow-2xl">
                    Solving Community-Centered Challenges with Innovation from <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">Quantum, Classical, & AI</span>
                    
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed mb-12 font-light border-l-2 border-primary/50 pl-6 bg-gradient-to-r from-primary/5 to-transparent py-2">
                    We are bridging the gap between theoretical physics and applied engineering. Solving humanity's most complex challenges through <span className="text-primary font-medium">quantum computing</span> and <span className="text-primary font-medium">AI innovation</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                    
                    <a className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-lg text-black-main transition-all duration-300 bg-primary clip-corner hover:bg-white hover:shadow-[0_0_30px_rgba(0,255,65,0.6)]" href="#">
                        <span className="absolute inset-0 w-full h-full border border-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span className="relative flex items-center gap-3 uppercase tracking-widest">
                            Initialize Research
                            <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">terminal</span>
                        </span>
                        <span className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-black-main"></span>
                        <span className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-black-main"></span>
                    </a>
                    <a className="group inline-flex items-center justify-center px-8 py-5 border border-primary/30 text-white font-mono text-sm hover:border-primary hover:bg-primary/5 transition-all duration-300 clip-corner uppercase tracking-widest backdrop-blur-sm" href="#">
                        <span className="mr-3 text-primary group-hover:animate-pulse">&gt;&gt;&gt;</span>
                        Explore Architecture
                    </a>
                </div>
                
                <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8 max-w-lg">
                    <div>
                        <div className="text-3xl font-display font-bold text-white mb-1">50<span className="text-primary text-lg">+</span></div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Qubits Active</div>
                    </div>
                    <div>
                        <div className="text-3xl font-display font-bold text-white mb-1">24<span className="text-primary text-lg">/7</span></div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Sys Uptime</div>
                    </div>
                    <div>
                        <div className="text-3xl font-display font-bold text-white mb-1">Lat<span className="text-primary text-lg">Am</span></div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Region Focus</div>
                    </div>
                </div>
            </div>
        </section>  
      </Hero>


        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 space-y-12">
                    <div>
                        <h2 className="font-display text-4xl font-bold text-white mb-8 flex items-center gap-4">
                            <span className="w-12 h-[2px] bg-primary shadow-neon block"></span>
                            <span className="text-shadow-neon">Who We Are</span>
                        </h2>
                        <div className="prose prose-lg prose-invert text-gray-400 max-w-none font-light">
                            <p className="mb-6">
                                At <strong className="text-primary font-normal">Qaldas</strong>, we operate at the intersection of theoretical physics and practical engineering. We are driven by real-world challenges—combining deep expertise in quantum computing, post-quantum cryptography, and full-stack development.
                            </p>
                            <p className="mb-6">
                                We empower individuals, institutions, and businesses with cutting-edge technologies tailored to the Latin American context, while maintaining full readiness to serve international clients.
                            </p>
                            <p>
                                Inspired by regional leaders like QMexico, Qaldas shares the mission of democratizing access to emerging technologies, cultivating scientific literacy, and fostering a tech ecosystem that thrives with innovation and inclusion.
                            </p>
                        </div>
                    </div>
                    
                    <div className="p-8 bg-black-surface border border-primary/20 relative overflow-hidden group hover:border-primary/50 transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                        <h3 className="font-display text-2xl font-bold text-primary mb-4 uppercase tracking-wide flex items-center gap-3">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                            Our Vision
                        </h3>
                        <p className="text-gray-400 leading-relaxed z-10 relative">
                            To become a leading force in shaping the future of technology in Latin America by making quantum computing, AI, and advanced cryptography accessible. We envision a region where communities and industries collaborate to solve real challenges using tools ranging from classical high-performance computing to quantum systems.
                        </p>
                    </div>
                </div>
                
                <div className="lg:col-span-5">
                    <div className="sticky top-32 p-1 bg-gradient-to-b from-primary/30 to-transparent rounded-none">
                        <div className="bg-black-surface p-8 border border-primary/10 relative overflow-hidden h-full">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                            <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-3xl">flag</span>
                                <span className="text-shadow-neon">Our Mission</span>
                            </h3>
                            <div className="space-y-6">
                                <p className="text-gray-300 leading-relaxed font-light">
                                    Technology must solve meaningful problems. We harness the power of <span className="text-primary">quantum and classical computing</span> to deliver real-world solutions through research, education, and innovation.
                                </p>
                                <ul className="space-y-4 mt-6">
                                    <li className="flex gap-4 items-start">
                                        <span className="material-symbols-outlined text-primary text-sm mt-1">terminal</span>
                                        <span className="text-sm text-gray-400">Democratize access to emerging tech.</span>
                                    </li>
                                    <li className="flex gap-4 items-start">
                                        <span className="material-symbols-outlined text-primary text-sm mt-1">security</span>
                                        <span className="text-sm text-gray-400">Strengthen digital security through cryptography.</span>
                                    </li>
                                    <li className="flex gap-4 items-start">
                                        <span className="material-symbols-outlined text-primary text-sm mt-1">public</span>
                                        <span className="text-sm text-gray-400">Empower inclusive growth across Latin America.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 font-mono">
                                <span>OP-MODE: ACTIVE</span>
                                <span>VER: 2.4.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
            <h2 className="font-display text-4xl font-bold text-white mb-16 text-center">
                Strategic <span className="text-primary text-shadow-neon">Pillars</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group relative p-6 bg-black-surface border border-surface-border hover:border-primary transition-all duration-300 hover:shadow-neon hover:-translate-y-2">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-14 h-14 bg-black border border-primary/30 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                        <span className="material-symbols-outlined text-2xl">science</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">Research</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        Exploring frontiers in quantum computing, AI, and cryptography.
                    </p>
                    <div className="w-full h-[1px] bg-primary/20 group-hover:bg-primary/50 transition-colors"></div>
                </div>
                <div className="group relative p-6 bg-black-surface border border-surface-border hover:border-primary transition-all duration-300 hover:shadow-neon hover:-translate-y-2">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-14 h-14 bg-black border border-primary/30 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                        <span className="material-symbols-outlined text-2xl">school</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">Education</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        Accessible learning, workshops, and mentoring for local talent.
                    </p>
                    <div className="w-full h-[1px] bg-primary/20 group-hover:bg-primary/50 transition-colors"></div>
                </div>
                <div className="group relative p-6 bg-black-surface border border-surface-border hover:border-primary transition-all duration-300 hover:shadow-neon hover:-translate-y-2">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-14 h-14 bg-black border border-primary/30 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                        <span className="material-symbols-outlined text-2xl">memory</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">Hardware</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        Integrating classical and quantum systems for complex challenges.
                    </p>
                    <div className="w-full h-[1px] bg-primary/20 group-hover:bg-primary/50 transition-colors"></div>
                </div>
                <div className="group relative p-6 bg-black-surface border border-surface-border hover:border-primary transition-all duration-300 hover:shadow-neon hover:-translate-y-2">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-14 h-14 bg-black border border-primary/30 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                        <span className="material-symbols-outlined text-2xl">insights</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">Consulting</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        Strategic advice and proof-of-concept development for organizations.
                    </p>
                    <div className="w-full h-[1px] bg-primary/20 group-hover:bg-primary/50 transition-colors"></div>
                </div>
            </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-20">
            <div className="relative pl-8 border-l border-primary/30">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-primary shadow-neon"></div>
                <h3 className="font-display text-2xl font-bold text-white mb-8">Research Areas <span className="text-primary text-sm font-mono ml-4">// ACTIVE PROTOCOLS</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-black-surface border border-white/5 hover:border-primary/50 transition-colors">
                        <h4 className="font-bold text-primary mb-3">Quantum Algorithms</h4>
                        <p className="text-sm text-gray-400">Optimization and simulation methodologies tailored for NISQ devices.</p>
                    </div>
                    <div className="p-6 bg-black-surface border border-white/5 hover:border-primary/50 transition-colors">
                        <h4 className="font-bold text-primary mb-3">Crypto Protocols</h4>
                        <p className="text-sm text-gray-400">Post-quantum cryptography standards and implementation security.</p>
                    </div>
                    <div className="p-6 bg-black-surface border border-white/5 hover:border-primary/50 transition-colors">
                        <h4 className="font-bold text-primary mb-3">Applied Software</h4>
                        <p className="text-sm text-gray-400">Hybrid classical-quantum software stacks for industrial applications.</p>
                    </div>
                </div>
            </div>

            <div className="relative pl-8 border-l border-primary/30">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-primary shadow-neon"></div>
                <h3 className="font-display text-2xl font-bold text-white mb-8">Continuing Education <span className="text-primary text-sm font-mono ml-4">// KNOWLEDGE TRANSFER</span></h3>
                <div className="flex flex-wrap gap-4 text-sm font-mono uppercase tracking-wider">
                    <span className="px-4 py-3 bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors cursor-crosshair">Courses &amp; Workshops</span>
                    <span className="px-4 py-3 bg-black-surface text-gray-400 border border-white/10 hover:border-primary/30 transition-colors cursor-crosshair">Online Delivery</span>
                    <span className="px-4 py-3 bg-black-surface text-gray-400 border border-white/10 hover:border-primary/30 transition-colors cursor-crosshair">Community Engagement</span>
                </div>
            </div>

            <div className="relative pl-8 border-l border-primary/30">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-primary shadow-neon"></div>
                <h3 className="font-display text-2xl font-bold text-white mb-8">Consulting Services <span className="text-primary text-sm font-mono ml-4">// ENTERPRISE SOLUTIONS</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 border border-white/10 bg-transparent hover:bg-white/5 transition-all">
                        <h4 className="text-lg font-semibold text-white mb-2">Readiness Audits</h4>
                        <p className="text-sm text-gray-500">Assess capabilities and define a roadmap toward quantum-enabled value.</p>
                    </div>
                    <div className="p-6 border border-white/10 bg-transparent hover:bg-white/5 transition-all">
                        <h4 className="text-lg font-semibold text-white mb-2">Feasibility &amp; Adoption</h4>
                        <p className="text-sm text-gray-500">Identify use cases, design pilots, and measure impact.</p>
                    </div>
                    <div className="p-6 border border-white/10 bg-transparent hover:bg-white/5 transition-all">
                        <h4 className="text-lg font-semibold text-white mb-2">Implementation Support</h4>
                        <p className="text-sm text-gray-500">Secure integration with governance, compliance, and training.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer className="border-t border-white/10 bg-black-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-400 uppercase tracking-widest">
                    <a className="hover:text-primary transition-colors" href="#">About</a>
                    <a className="hover:text-primary transition-colors" href="#">Research</a>
                    <a className="hover:text-primary transition-colors" href="#">Education</a>
                    <a className="hover:text-primary transition-colors" href="#">Solutions</a>
                </div>
                <div className="flex items-center gap-6">
                    <div className="w-8 h-8 rounded-none border border-primary flex items-center justify-center text-primary font-bold text-sm">Q</div>
                    <div className="h-4 w-[1px] bg-gray-700"></div>
                    <div className="flex gap-4 text-xs text-gray-500 font-mono">
                        <a className="hover:text-primary" href="#">PRIVACY</a>
                        <a className="hover:text-primary" href="#">TERMS</a>
                    </div>
                </div>
                <div className="flex gap-3">
                    <span className="px-2 py-1 bg-black border border-white/10 text-[10px] font-bold tracking-wider text-primary uppercase">México</span>
                    <span className="px-2 py-1 bg-black border border-white/10 text-[10px] font-bold tracking-wider text-gray-500 uppercase">Colombia</span>
                    <span className="px-2 py-1 bg-black border border-white/10 text-[10px] font-bold tracking-wider text-gray-500 uppercase">USA</span>
                </div>
            </div>
            <div className="mt-12 text-center text-xs text-gray-600 font-mono">
                // © 2023 QALDAS. SYSTEM SECURE.
            </div>
        </div>
    </footer>
    </>
  );
}
