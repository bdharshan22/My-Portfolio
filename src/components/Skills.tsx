import React from 'react';

import { SKILLS_DATA } from '../constants';
import {
  Layout, FileCode, Palette, Server, Database, Container, GitBranch, BrainCircuit, Terminal,
  Layers, Sparkles, Cpu, Share2, Zap, Cloud, PenTool, TestTube, Coffee, Code, Binary, Code2, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout />,
  FileCode: <FileCode />,
  Palette: <Palette />,
  Server: <Server />,
  Database: <Database />,
  Container: <Container />,
  GitBranch: <GitBranch />,
  BrainCircuit: <BrainCircuit />,
  Layers: <Layers />,
  Sparkles: <Sparkles />,
  Cpu: <Cpu />,
  Share2: <Share2 />,
  Zap: <Zap />,
  Cloud: <Cloud />,
  PenTool: <PenTool />,
  TestTube: <TestTube />,
  Coffee: <Coffee />,
  Code: <Code />,
  Binary: <Binary />,
  Terminal: <Terminal />,
  Code2: <Code2 />,
  Globe: <Globe />,
};

const Skills: React.FC = () => {
  const categoryOrder = ['Languages', 'Frontend', 'Backend', 'Database', 'Tools'];
  const dataCategories = Array.from(new Set(SKILLS_DATA.map(s => s.category)));

  const categories = dataCategories.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  return (
    <section id="skills" className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Technical Skills</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          The technologies and tools I use to build scalable, high-performance applications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
              ease: "easeOut"
            }}
            className="group relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

            <h3 className="relative text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200/50 dark:border-slate-700/50 pb-4 flex items-center gap-2">
              <span className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                {/* Icons based on category logic could be improved here, but simplifying for now */}
                {category === 'Frontend' && <Layout size={18} />}
                {category === 'Backend' && <Server size={18} />}
                {category === 'Database' && <Database size={18} />}
                {category === 'Tools' && <Globe size={18} />}
                {category === 'Languages' && <Code size={18} />}
              </span>
              {category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {SKILLS_DATA.filter(s => s.category === category).map((skill) => (
                <div
                  key={skill.name}
                  className="relative flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:border-indigo-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-300 cursor-default group/skill"
                >
                  <span className="text-slate-500 dark:text-slate-400 group-hover/skill:text-indigo-500 dark:group-hover/skill:text-indigo-400 transition-colors">
                    {iconMap[skill.iconName] || <Terminal size={16} />}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover/skill:text-slate-900 dark:group-hover/skill:text-white transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;