"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as lucideReact from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "The Vault", href: "#projects" },
    { name: "The Stack", href: "#skills" },
    { name: "Substack", href: "https://zeesworld01.substack.com" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/10 border-b border-white/5">
      
      <Link href="/" className="text-2xl font-bold italic text-white tracking-tighter">
      src= "https://peach-elderly-meadowlark-381.mypinata.cloud/ipfs/bafybeiapgfhhx2p57c3h2362uu5iihg7ypz3a7tsy5iimzsur2nmukbrha/the-site-is-zee-s-world-it-s-my-portfolio-i-was-th%20(1).png" alt="Zee's World logo"
     className = "w-full h-full object-contain" </Link>

     
      <div className="hidden md:flex gap-8 items-center font-medium italic">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="text-[#e0d7ff] hover:text-purple-400 transition-colors">
            {link.name}
          </a>
        ))}
        <Link href="/login" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white">
          <lucideReact.Lock size={18} />
        </Link>
      </div>

      {/* Mobile Toggle - z-50 ensures the "X" stays on top of the menu */}
      <button 
        className="md:hidden text-white focus:outline-none z-50 relative" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <lucideReact.X size={28} /> : <lucideReact.Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen w-full bg-[#0f071a]/98 backdrop-blur-2xl p-8 flex flex-col justify-between md:hidden"
          >
            <div className="flex flex-col gap-8 mt-16">
              {/* Site Status */}
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-400 italic">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Status: In the Lab
              </div>

              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="text-5xl font-bold italic text-[#e0d7ff] hover:text-purple-400 transition-all active:scale-95"
                >
                  {link.name}
                </a>
              ))}

              <a 
                href="https://discord.com/users/1305099867126759516" 
                className="flex items-center justify-center gap-2 w-full py-4 bg-purple-600 text-white rounded-2xl font-bold italic hover:bg-purple-500 active:bg-purple-700 transition-colors mt-4 shadow-lg shadow-purple-500/20"
              >
                <lucideReact.MessageSquare size={20} /> Let's Build
              </a>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="h-px bg-white/10 w-full" />
              
              {/* Social Links & Admin */}
              <div className="flex justify-between items-center">
                <div className="flex gap-6 text-white/60">
                  <a href="https://x.com/Senseii_ciel" target="_blank" rel="noopener noreferrer"><lucideReact.Share2 size={22} /></a>
                  <a href="https://github.com/ozzy-sensei" target="_blank" rel="noopener noreferrer"><lucideReact.Code size={22} /></a>
                </div>
                
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-xs italic text-gray-400"
                >
                  <lucideReact.Lock size={14} /> Admin
                </Link>
              </div>
              <p className="text-[10px] text-gray-600 italic uppercase text-center tracking-widest">Architected by Senseii_ciel</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  