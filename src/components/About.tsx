import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Coffee, Globe, Cpu } from 'lucide-react';
import { ABOUT_DATA } from '../constants.ts';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Visual/IDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative floating icons */}
            <FloatingIcon icon={<Globe size={24} />} className="absolute -top-8 -left-8 text-indigo-400 delay-0" />
            <FloatingIcon icon={<Cpu size={24} />} className="absolute top-1/2 -right-12 text-purple-400 delay-1000" />
            <FloatingIcon icon={<Coffee size={24} />} className="absolute -bottom-8 -left-4 text-cyan-400 delay-500" />

            {/* IDE Window */}
            <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              {/* Window Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-4 text-xs font-mono text-slate-400">developer.ts</div>
              </div>
              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="text-slate-300">
                  <span className="text-purple-400">const</span> <span className="text-yellow-400">developer</span> <span className="text-purple-400">=</span> {'{'}
                </div>
                <div className="pl-6 text-slate-300">
                  name: <span className="text-green-400">'Dharshan B'</span>,
                </div>
                <div className="pl-6 text-slate-300">
                  role: <span className="text-green-400">'Full Stack Engineer'</span>,
                </div>
                <div className="pl-6 text-slate-300">
                  traits: [<span className="text-green-400">'Creative'</span>, <span className="text-green-400">'Analytical'</span>, <span className="text-green-400">'Passionate'</span>],
                </div>
                <div className="pl-6 text-slate-300">
                  code: <span className="text-purple-400">async</span> () <span className="text-purple-400">=&gt;</span> {'{'}
                </div>
                <div className="pl-12 text-slate-300">
                  <span className="text-purple-400">while</span>(<span className="text-orange-400">alive</span>) {'{'}
                </div>
                <div className="pl-16 text-slate-300">
                  <span className="text-blue-400">build</span>(<span className="text-green-400">'awesome_things'</span>);
                </div>
                <div className="pl-16 text-slate-300">
                  <span className="text-blue-400">learn</span>(<span className="text-green-400">'every_day'</span>);
                </div>
                <div className="pl-12 text-slate-300">{'}'}</div>
                <div className="pl-6 text-slate-300">{'}'}</div>
                <div className="text-slate-300">{'}'}</div>
              </div>
            </div>

            {/* Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 blur-2xl -z-10 opacity-20 transform scale-105" />
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={20} className="text-indigo-500" />
              <span className="text-indigo-500 font-bold tracking-wider uppercase text-sm">About Me</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
              Building digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">solutions</span> that matter.
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {ABOUT_DATA.summary}
              <br /><br />
              I specialize in crafting high-performance applications that not only look great but perform flawlessly. My journey is driven by a constant curiosity and a desire to solve complex problems through clean, efficient code.
            </p>


          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Helper Components
const FloatingIcon = ({ icon, className }: { icon: React.ReactNode, className?: string }) => (
  <motion.div
    className={`p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 ${className}`}
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    {icon}
  </motion.div>
);



export default About;