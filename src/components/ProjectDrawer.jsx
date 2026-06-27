import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorldStore } from '../store/useWorldStore';
import { projects } from '../data/projectsData';

const districtContent = {
  workshop: {
    character: "Zee the Builder",
    avatar: "💻",
    title: "The Smart Contract Workshop",
    description: "Catch Zee compiling smart contracts, tweaking Web3 dApps, and managing scripts from a terminal.",
    projects: ["Solana Prediction Market MVP", "USSD Agent-Coordinator", "Telegram Social Deduction Game Bot"]
  },
  greenhouse: {
    character: "Zee the Alchemist",
    avatar: "🌿", 
    title: "The Design Greenhouse",
    description: "Here, Zee is experimenting with visual assets, crafting digital fashion, and generating retro 90s anime art.",
    projects: ["Airdrop Arcade Branding", "Digital Fashion Concepts", "Zee's World Interface Assets"]
  },
  lab: {
    character: "Zee the Researcher",
    avatar: "🧪",
    title: "The Machine Learning Lab",
    description: "Zee is deep in data streams here, running training models and exploring experimental protocols.",
    projects: ["AI Prompt Architecture", "Data Pipeline Automations"]
  },
  court: {
    character: "Zee the Captain",
    avatar: "🏀",
    title: "The Basketball Court",
    description: "Where Zee runs stamina drills, tracks calisthenics consistency, and works on physical execution optimization.",
    projects: ["Stamina & Cardio Milestones", "Calisthenics Target Tracker"]
  },
  void: {
    character: "Zee the Nomad",
    avatar: "🌌",
    title: "The Web3 Void Gateway",
    description: "Floating in pure data. Zee is looking out over the blockchain network matrix and building 'in public'.",
    projects: ["Solana Ecosystem Onboarding", "Somnia Orchestra Mini Hackathon"]
  }
};

export default function ProjectDrawer() {
  const { activeProjectId, closeProject, activeDistrict, setActiveDistrict } = useWorldStore();
  const currentProject = projects.find(p => p.id === activeProjectId);
  const data = districtContent[activeDistrict];

  return (
    <AnimatePresence>
      {(currentProject || (activeDistrict && data)) && (
        <>
          {/* Backdrop lock */}
          {currentProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={closeProject}
              className="absolute inset-0 z-40 bg-black/80 backdrop-blur-xs"
            />
          )}

          {/* Slide-Up Content Core Panel - Project View */}
          {currentProject && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-neutral-900 border-t border-purple-900/60 p-6 shadow-2xl"
            >
              <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-purple-900/50 cursor-pointer" onClick={closeProject} />

              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl p-2.5 bg-neutral-950 rounded-xl border border-purple-950 flex items-center justify-center shadow-inner">
                  {currentProject.logo}
                </div>
                <div>
                  <h2 className="text-2xl font-normal text-purple-100 italic">{currentProject.title}</h2>
                  <span className="inline-block px-2 py-0.5 mt-1 text-[10px] font-mono rounded bg-purple-950 text-purple-300 border border-purple-800/40 uppercase tracking-wider">
                    File Entry // {currentProject.status}
                  </span>
                </div>
              </div>

              <p className="text-purple-200 leading-relaxed text-base italic mb-4">
                {currentProject.shortDesc}
              </p>
              
              <p className="text-neutral-400 text-sm leading-relaxed border-l-2 border-purple-900/40 pl-3 py-1 mb-5 font-serif">
                {currentProject.longDesc}
              </p>

              {/* Compiled Tech Matrix */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-purple-400/60 tracking-wider mb-2">Compiled Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.techStack?.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-xs font-mono rounded bg-neutral-950 border border-purple-950 text-purple-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a href={currentProject.github} target="_blank" rel="noreferrer" className="flex items-center justify-center py-3 px-4 rounded border border-purple-900/50 text-sm font-normal text-purple-300 bg-neutral-950 hover:bg-purple-950/50 active:scale-98 transition-all">
                  Source Repository
                </a>
                <a href={currentProject.liveLink} target="_blank" rel="noreferrer" className="flex items-center justify-center py-3 px-4 rounded bg-purple-700 text-sm font-bold text-white shadow-lg shadow-purple-900/30 hover:bg-purple-600 active:scale-98 transition-all">
                  Launch Deployment
                </a>
              </div>
            </motion.div>
          )}

          {/* Side Panel - District View */}
          {activeDistrict && data && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#0b061a]/95 backdrop-blur-xl border-l border-purple-500/10 p-6 z-40 overflow-y-auto text-white flex flex-col gap-6"
            >
              {/* Back navigation option at the top of the drawer container */}
              <div className="mt-4">
                <button
                  onClick={() => setActiveDistrict(null)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/50 border border-purple-500/20 text-purple-300 hover:text-white font-mono text-xs tracking-wider transition-all cursor-pointer active:scale-[0.98]"
                >
                  ← RETURN TO ORBIT HUB
                </button>
              </div>

              {/* Header Module: Character Tour Guide */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-950/20 border border-purple-500/10">
                <div className="text-4xl bg-purple-900/40 p-2.5 rounded-xl border border-purple-400/20 shadow-inner">
                  {data.avatar}
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">Tour Guide</span>
                  <h3 className="text-lg font-bold tracking-wide text-white">{data.character}</h3>
                </div>
              </div>

              {/* District Details */}
              <div>
                <h2 className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300">
                  {data.title}
                </h2>
                <p className="mt-2 text-sm text-purple-200/70 leading-relaxed font-medium">
                  {data.description}
                </p>
              </div>

              <hr className="border-purple-500/10" />

              {/* Active Build Repos / Project Cards List */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">Active Deployments</h4>
                {data.projects.map((project, i) => (
                  <div 
                    key={i}
                    className="p-3.5 rounded-xl bg-black/40 border border-neutral-800/60 hover:border-purple-500/30 active:scale-[0.99] transition-all group cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium tracking-wide text-neutral-200 group-hover:text-white">
                        {project}
                      </span>
                      <span className="text-purple-400 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        VIEW →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
