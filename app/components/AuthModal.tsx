"use client";

import { useState, useTransition } from "react";
import { loginUser, registerUser } from "@/app/actions/auth";
import { motion, AnimatePresence } from "framer-motion";
import { TypingAnimation } from "./TypingAnimation";

export default function AuthModal({ 
  isOpen, 
  onClose,
  initialMode = "login"
}: { 
  isOpen: boolean; 
  onClose: () => void;
  initialMode?: "login" | "register";
}) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string, password?: string }>({});

  async function handleSubmit(formData: FormData) {
    setMessage(null);
    setFieldErrors({});
    
    startTransition(async () => {
      if (!isLogin) {
        const email = formData.get("email") as string;
        const confirmEmail = formData.get("confirmEmail") as string;
        const pass = formData.get("password") as string;
        const confirmPass = formData.get("confirmPassword") as string;

        let hasError = false;
        const errors: { email?: string, password?: string } = {};

        if (email !== confirmEmail) {
          errors.email = "Email and confirmation must match.";
          hasError = true;
        }

        if (pass !== confirmPass) {
          errors.password = "Password and confirmation must match.";
          hasError = true;
        }

        if (hasError) {
          setFieldErrors(errors);
          return;
        }
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        if (firstName && lastName) {
          formData.set("name", `${firstName} ${lastName}`.trim());
          formData.delete("firstName");
          formData.delete("lastName");
        }
      }

      const result = isLogin ? await loginUser(formData) : await registerUser(formData);
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else if (result.success) {
        if (!isLogin) {
          setMessage({ type: 'success', text: 'Registration successful. Check your email for a welcome message.' });
          setTimeout(() => {
            window.location.reload(); 
          }, 3000);
        } else {
          setMessage({ type: 'success', text: 'Welcome back...' });
          window.location.reload(); 
        }
      }
    });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-screen h-screen z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
        >
          {/* Main Container - Black Frame */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex w-full max-w-[1000px] min-h-[600px] bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl border border-[#222] my-auto"
          >
            
            {/* close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white transition-colors flex items-center justify-center p-2 rounded-full hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* --- LEFT SECTION --- */}
        <div className="hidden md:flex flex-col w-1/2 relative overflow-hidden bg-black">
          {/* Animated Gradient Background */}
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e1d] to-black z-0"></div>
          
          {/* Moving Orbs/Auroras */}
          <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
             <div className="absolute top-[0%] left-[-10%] w-[60%] h-[60%] bg-[#1a7444] rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite_alternate]"></div>
             <div className="absolute bottom-[10%] right-[-10%] w-[70%] h-[70%] bg-[#0f4f2c] rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite_alternate-reverse]"></div>
             <div className="absolute top-[30%] left-[20%] w-[50%] h-[50%] bg-[#145f35] rounded-full blur-[100px] animate-[bounce_10s_infinite_alternate]"></div>
          </div>

          {/* Noise overlay */}
          <div className="absolute inset-0 z-10 opacity-25 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>

          {/* Content */}
          <div className="relative z-20 flex flex-col h-full p-12 justify-center">
            <div className="flex-grow"></div>
            
            <div className="flex flex-col gap-3 mb-16">
              <h2 className="text-4xl font-semibold text-white tracking-tight leading-tight whitespace-pre-line">
                {isLogin ? "Welcome\nBack" : "Get Started\nwith Us"}
              </h2>
              <p className="text-[#9abfaa] text-sm font-light max-w-[280px]">
                {isLogin ? "Join your workspace and continue your progress." : "Complete these easy steps to register your account."}
              </p>
            </div>

            {/* Steps (Only show on register as per design) */}
            {!isLogin ? (
              <div className="flex gap-4 mb-4">
                {/* Step 1 - Active */}
                <div className="bg-white rounded-2xl p-5 flex-1 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)] h-40">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">1</div>
                  <span className="text-black text-sm font-medium leading-tight">Sign up your<br/>account</span>
                </div>
                {/* Step 2 - Inactive */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 flex-1 flex flex-col justify-between border border-white/5 h-40">
                  <div className="w-6 h-6 rounded-full bg-white/20 text-white/50 flex items-center justify-center text-[10px] font-bold">2</div>
                  <span className="text-white/60 text-sm font-medium leading-tight">Set up your<br/>workspace</span>
                </div>
                {/* Step 3 - Inactive */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 flex-1 flex flex-col justify-between border border-white/5 h-40">
                  <div className="w-6 h-6 rounded-full bg-white/20 text-white/50 flex items-center justify-center text-[10px] font-bold">3</div>
                  <span className="text-white/60 text-sm font-medium leading-tight">Set up your<br/>profile</span>
                </div>
              </div>
            ) : (
              <div className="h-40"></div>
            )}
          </div>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto bg-gradient-to-br from-[#0a2e1d]/40 to-black-surface border-l border-[#222]">
          {/* Noise overlay right panel */}
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>
          
          <div className="relative z-10 max-w-[360px] w-full mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-2">{isLogin ? "Log In Account" : "Sign Up Account"}</h3>
              <p className="text-[#888] text-xs">
                {isLogin ? "Enter your personal data to access your account." : "Enter your personal data to create your account."}
              </p>
            </div>

            {/* Social Auth Buttons */}
            {/* <div className="flex gap-4 mb-6">
              <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#222] hover:bg-[#111] transition-colors text-white text-[13px] font-medium">
                 <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                 </svg>
                 Google
              </button>
              <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#222] hover:bg-[#111] transition-colors text-white text-[13px] font-medium">
                 <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="white">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                 </svg>
                 Github
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-[1px] bg-[#222]"></div>
              <span className="text-[#666] text-[10px] lowercase">Or</span>
              <div className="flex-1 h-[1px] bg-[#222]"></div>
            </div> */}

            <form action={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-[11px] text-[#a3a3a3] block h-4">
                      <TypingAnimation text="First Name" />
                    </label>
                    <input 
                      type="text" 
                      name="firstName" 
                      required
                      placeholder="eg. John" 
                      className="w-full bg-[#151515] border border-transparent rounded-lg p-3 text-white text-xs focus:outline-none focus:border-[#444] transition-colors placeholder:text-[#555]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[11px] text-[#a3a3a3] block h-4">
                      <TypingAnimation text="Last Name" delay={0.2} />
                    </label>
                    <input 
                      type="text" 
                      name="lastName" 
                      required
                      placeholder="eg. Francisco" 
                      className="w-full bg-[#151515] border border-transparent rounded-lg p-3 text-white text-xs focus:outline-none focus:border-[#444] transition-colors placeholder:text-[#555]"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                 <label className="text-[11px] text-[#a3a3a3] block h-4">
                    <TypingAnimation text="Email" delay={isLogin ? 0 : 0.4} />
                 </label>
                 <input 
                    type="email" 
                    name="email" 
                    required
                    placeholder="eg. johnfrans@gmail.com" 
                    className="w-full bg-[#151515] border border-transparent rounded-lg p-3 text-white text-xs focus:outline-none focus:border-[#444] transition-colors placeholder:text-[#555]"
                 />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                   <label className="text-[11px] text-[#a3a3a3] block h-4">
                      <TypingAnimation text="Confirm Email" delay={0.6} />
                   </label>
                   <input 
                      type="email" 
                      name="confirmEmail" 
                      required
                      placeholder="Confirm your email" 
                      className={`w-full bg-[#151515] border ${fieldErrors.email ? 'border-red-500/50' : 'border-transparent'} rounded-lg p-3 text-white text-xs focus:outline-none focus:border-[#444] transition-colors placeholder:text-[#555]`}
                   />
                   {fieldErrors.email && (
                     <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                       <span className="material-symbols-outlined text-[12px]">error</span>
                       {fieldErrors.email}
                     </p>
                   )}
                </div>
              )}

              <div className="space-y-2">
                 <label className="text-[11px] text-[#a3a3a3] block h-4">
                    <TypingAnimation text="Password" delay={isLogin ? 0.2 : 0.8} />
                 </label>
                 <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      required
                      placeholder="Enter your password" 
                      className="w-full bg-[#151515] border border-transparent rounded-lg p-3 pr-10 text-white text-xs focus:outline-none focus:border-[#444] transition-colors placeholder:text-[#555]"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#999] transition-colors flex items-center justify-center p-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                 </div>
                 {!isLogin && <p className="text-[#555] text-[10px] mt-2">Must be at least 8 characters.</p>}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                   <label className="text-[11px] text-[#a3a3a3] block h-4">
                      <TypingAnimation text="Confirm Password" delay={1.0} />
                   </label>
                   <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        name="confirmPassword" 
                        required
                        placeholder="Confirm your password" 
                        className={`w-full bg-[#151515] border ${fieldErrors.password ? 'border-red-500/50' : 'border-transparent'} rounded-lg p-3 pr-10 text-white text-xs focus:outline-none focus:border-[#444] transition-colors placeholder:text-[#555]`}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#999] transition-colors flex items-center justify-center p-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {showConfirmPassword ? "visibility" : "visibility_off"}
                        </span>
                      </button>
                   </div>
                   {fieldErrors.password && (
                     <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                       <span className="material-symbols-outlined text-[12px]">error</span>
                       {fieldErrors.password}
                     </p>
                   )}
                </div>
              )}

              {message && (
                 <div className={`p-3 text-sm rounded-lg ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'} animate-in fade-in duration-200`}>
                   {message.text}
                 </div>
              )}

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full flex items-center justify-center py-3 rounded-lg font-medium text-xs text-black bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                >
                   {isPending ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
               <button 
                 onClick={() => {
                   setIsLogin(!isLogin);
                   setFieldErrors({});
                   setMessage(null);
                 }}
                 className="text-[#666] hover:text-white text-[11px] transition-colors"
                >
                 {isLogin ? (
                   <>Don't have an account? <span className="text-white font-medium">Sign up</span></>
                 ) : (
                   <>Already have an account? <span className="text-white font-medium">Log in</span></>
                 )}
               </button>
            </div>
            
          </div>
        </div>
      </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
