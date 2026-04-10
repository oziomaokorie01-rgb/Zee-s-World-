"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
            <motion.div
                    initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                          >
                                                  <h1 className="text-6xl md:text-8xl font-bold mb-6 italic">
                                                            Zee's World
                                                                    </h1>
                                                                            <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                                                                                      A digital attic where I keep my 
                                                                                                <span className="text-purple-400"> full-stack experiments</span>, 
                                                                                                          <span className="text-blue-400"> Web3 rabbit holes</span>, and 
                                                                                                                    <span className="text-pink-400"> AI-generated fever dreams</span>.
                                                                                                                            </p>

                                                                                                                                    <div className="flex gap-6 justify-center">
                                                                                                                                              <button className="px-10 py-3 bg-white text-black rounded-full hover:scale-105 transition-transform font-bold">
                                                                                                                                                          Work
                                                                                                                                                                    </button>
                                                                                                                                                                              <button className="px-10 py-3 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors">
                                                                                                                                                                                          Substack
                                                                                                                                                                                                    </button>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                  </motion.div>
                                                                                                                                                                                                                      </section>
                                                                                                                                                                                                                        );
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        