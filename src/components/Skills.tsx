import React, { useState } from 'react';
import { Cpu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TechGlobe from './TechGlobe';
// We need the type definition. Since it's from a library, we can import it or just use 'any' if lazy, but let's try to be type safe if possible, 
// or just rely on the shape we know. 
// However, TechGlobe exports are limited. Let's just assume 'any' or replicate interface for now to avoid extensive imports if not exported.
// Actually TechGlobe imports SimpleIcon from react-icon-cloud. Let's do the same.
import { type SimpleIcon } from 'react-icon-cloud';

const Skills: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<SimpleIcon | null>(null);

  return (
    <section id="skills" className="py-10 bg-slate-50 dark:bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Ambient Background Glows */}
      <div className="absolute top-[20%] right-[-10%] w-125 h-125 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-150 h-150 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Header - blurred when overlay is active */}
        <motion.div
          animate={{ filter: selectedTech ? 'blur(10px)' : 'blur(0px)', opacity: selectedTech ? 0 : 1 }}
          className="text-center mb-12 transition-all duration-500"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Cpu size={12} /> Tech Ecosystem
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Sphere</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              The diverse constellation of technologies I leverage to build digital experiences. Interact with the globe to explore.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-[90vw] aspect-square flex items-center justify-center"
        >
          {/* Globe Container - pushed back when selected */}
          <motion.div
            animate={{ scale: selectedTech ? 0.5 : 1, opacity: selectedTech ? 0.2 : 1, filter: selectedTech ? 'blur(8px)' : 'blur(0px)' }}
            className="w-full h-full relative z-20 transition-all duration-500 ease-out"
          >
            <TechGlobe onIconClick={(icon) => setSelectedTech(icon)} />
          </motion.div>

          {/* Decorative Rings - Hide when focused */}
          <motion.div animate={{ opacity: selectedTech ? 0 : 1 }} transition={{ duration: 0.5 }}>
            <div className="absolute inset-28 border border-indigo-500/10 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-44 border border-purple-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-60 border border-cyan-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
          </motion.div>

          {/* Detail Overlay with Separated Icon */}
          <AnimatePresence>
            {selectedTech && (
              <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
              >
                <div className="relative flex flex-col items-center justify-center p-8 pointer-events-auto">

                  {/* The "Separated" Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180, y: 100 }}
                    animate={{ scale: 1, rotate: 0, y: 0 }}
                    exit={{ scale: 0, rotate: 180, opacity: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                    className="w-32 h-32 mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill={`#${selectedTech.hex}`}
                      className="w-full h-full drop-shadow-2xl"
                      style={{ filter: `drop-shadow(0 0 20px #${selectedTech.hex}80)` }}
                    >
                      <path d={selectedTech.path} />
                    </svg>
                  </motion.div>

                  {/* Name and Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight" style={{ color: `#${selectedTech.hex}` }}>
                      {selectedTech.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium tracking-widest uppercase text-sm">
                      Technology Stack
                    </p>
                  </motion.div>

                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedTech(null)}
                    className="mt-12 p-3 rounded-full bg-white/10 hover:bg-white/20 dark:bg-slate-800/50 dark:hover:bg-slate-800/80 backdrop-blur-md border border-white/10 transition-colors text-slate-600 dark:text-slate-300"
                  >
                    <X size={24} />
                  </motion.button>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Backdrop overlay to close on click outside */}
      {selectedTech && (
        <div
          className="absolute inset-0 z-0 cursor-pointer backdrop-blur-[2px]"
          onClick={() => setSelectedTech(null)}
        />
      )}
    </section>
  );
};

export default Skills;
