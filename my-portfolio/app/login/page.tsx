"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 relative">
            {/* Background Glow */}
                  <div className="absolute inset-0 bg-radial-gradient from-purple-900/20 to-transparent z-0 pointer-events-none" />

                        <Link href="/" className="absolute top-10 left-10 text-white flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity italic">
                                <ArrowLeft size={18} /> Back to the World
                                      </Link>

                                            <motion.div 
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                                    className="w-full max-w-md p-1 bg-gradient-to-b from-purple-500/20 to-transparent rounded-3xl backdrop-blur-xl border border-white/10 z-10"
                                                                          >
                                                                                  <div className="bg-[#0f071a]/90 rounded-[22px] p-8 text-center">
                                                                                            <h1 className="text-3xl font-bold italic text-white mb-2">Access Vault</h1>
                                                                                                      <p className="text-purple-300/60 text-sm mb-8 italic uppercase tracking-widest">Admin Authorization Required</p>
                                                                                                                
                                                                                                                          <form className="space-y-4">
                                                                                                                                      <input 
                                                                                                                                                    type="password" 
                                                                                                                                                                  placeholder="Enter Access Key..." 
                                                                                                                                                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors italic"
                                                                                                                                                                                            />
                                                                                                                                                                                                        <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-purple-100 transition-colors">
                                                                                                                                                                                                                      Authorize
                                                                                                                                                                                                                                  </button>
                                                                                                                                                                                                                                            </form>

                                                                                                                                                                                                                                                      <p className="mt-8 text-[10px] text-gray-500 italic uppercase">
                                                                                                                                                                                                                                                                  Encrypted session for Senseii_ciel
                                                                                                                                                                                                                                                                            </p>
                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                          </motion.div>
                                                                                                                                                                                                                                                                                              </main>
                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                