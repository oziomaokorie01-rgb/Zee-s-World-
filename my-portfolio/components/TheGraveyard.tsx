"use client";
import { motion } from "framer-motion";
import { Bug, Ghost, Terminal } from "lucide-react";

const bugs = [
  { 
      id: "01", 
          title: "Identity Crisis", 
              desc: "The mobile menu sometimes thinks it's a desktop menu. It's currently in therapy.",
                  status: "Investigating"
                    },
                      { 
                          id: "02", 
                              title: "The Center of the Universe", 
                                  desc: "CSS centering. I’ve tried everything short of an exorcism. It refuses to move.",
                                      status: "Accepted Fate"
                                        },
                                          { 
                                              id: "03", 
                                                  title: "Mobile Dev Madness", 
                                                      desc: "Typing code on a phone screen leads to 40% more sarcasm in the commits.",
                                                          status: "Working as Intended"
                                                            }
                                                            ];

                                                            export default function TheGraveyard() {
                                                              return (
                                                                  <section className="py-20 px-6 max-w-4xl mx-auto border-t border-white/5">
                                                                        <div className="flex items-center gap-3 mb-10 opacity-50 italic">
                                                                                <Terminal size={20} className="text-purple-400" />
                                                                                        <h2 className="text-xl font-bold tracking-tight uppercase text-white">The Graveyard / Tech Debt</h2>
                                                                                              </div>

                                                                                                    <div className="space-y-4">
                                                                                                            {bugs.map((bug) => (
                                                                                                                      <motion.div 
                                                                                                                                  key={bug.id}
                                                                                                                                              initial={{ opacity: 0 }}
                                                                                                                                                          whileInView={{ opacity: 1 }}
                                                                                                                                                                      className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-purple-500/20 transition-all"
                                                                                                                                                                                >
                                                                                                                                                                                            <div className="flex gap-4 items-start">
                                                                                                                                                                                                          <span className="text-xs font-mono text-purple-500 mt-1">#{bug.id}</span>
                                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                                        <h3 className="font-bold italic text-[#e0d7ff] group-hover:text-purple-300 transition-colors">
                                                                                                                                                                                                                                                          {bug.title}
                                                                                                                                                                                                                                                                          </h3>
                                                                                                                                                                                                                                                                                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{bug.desc}</p>
                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 w-fit">
                                                                                                                                                                                                                                                                                                                                                          <div className={`h-1.5 w-1.5 rounded-full ${bug.status === 'Working as Intended' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                                                                                                                                                                                                                                                                                                                                                                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{bug.status}</span>
                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                              </motion.div>
                                                                                                                                                                                                                                                                                                                                                                                                      ))}
                                                                                                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                                                                                                  <div className="mt-12 flex justify-center opacity-20">
                                                                                                                                                                                                                                                                                                                                                                                                                          <Ghost size={40} />
                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                    </section>
                                                                                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                                                                      