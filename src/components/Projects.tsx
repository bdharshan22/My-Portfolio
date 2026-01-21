import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ExternalLink, Github, X, Cpu, Sparkles, Terminal, MousePointerClick } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';
import SEOUpdater from './SEOUpdater';



// --- Helper: Status Colors ---
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Live': return 'bg-emerald-500';
    case 'Beta': return 'bg-purple-500';
    case 'In Progress': return 'bg-amber-500';
    case 'Concept': return 'bg-cyan-500';
    default: return 'bg-slate-500';
  }
};

// --- Animation Variants ---
const cardEntryVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 120,
      damping: 12
    }
  })
};



const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = PROJECTS_DATA.find((p) => p.id === selectedId);

  // Scroll Lock
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedId]);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Featured <span className="text-indigo-600">Projects</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Explore my work. Click a card to view detailed project information.
          </motion.p>
        </motion.div>

        {/* --- GRID VIEW --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {PROJECTS_DATA.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              custom={index}
              variants={cardEntryVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => setSelectedId(project.id)}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden cursor-pointer shadow-md border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 group relative transform-gpu"
            >
              <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                <motion.img
                  layoutId={`image-${project.id}`}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
                  <motion.div
                    className="flex items-center gap-1.5 text-indigo-200 text-xs font-mono uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                  >
                    <MousePointerClick size={14} />
                    <span>Click for Details</span>
                  </motion.div>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-2 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10 flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(project.status)} animate-pulse`} />
                    <span className="text-[10px] text-white font-mono uppercase">{project.status}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 relative z-10 bg-white dark:bg-slate-900">
                <div className="flex justify-between items-start mb-2">
                  <motion.h3
                    layoutId={`title-${project.id}`}
                    className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                  >
                    {project.title}
                  </motion.h3>
                  <ArrowUpRightIcon />
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md font-mono border border-slate-200 dark:border-slate-700 group-hover:border-indigo-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs px-2 py-1 text-slate-500">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- MODAL OVERLAY --- */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 overflow-hidden">
            <SEOUpdater
              title={`${selectedProject.title} | Project Details`}
              description={selectedProject.description}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
            />

            <motion.div
              layoutId={`card-${selectedId}`}
              className="w-full h-full md:max-w-5xl md:h-[90vh] bg-white dark:bg-slate-900 md:rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col border border-slate-200 dark:border-slate-700 ring-1 ring-slate-900/5"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
              >
                <X size={20} />
              </button>

              {/* Project Details (Scrollable) */}
              <div className="w-full h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-transparent">
                <div className="relative w-full">
                  <motion.img
                    layoutId={`image-${selectedProject.id}`}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-auto max-h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex items-end p-8">
                    <div>
                      <motion.h2
                        layoutId={`title-${selectedProject.id}`}
                        className="text-3xl md:text-4xl font-bold text-white shadow-black drop-shadow-md mb-2"
                      >
                        {selectedProject.title}
                      </motion.h2>
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-3 py-1 bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 rounded-full text-xs font-mono text-indigo-200">
                          v1.0.4-stable
                        </span>
                        <span className={`inline-block px-3 py-1 backdrop-blur-md border border-white/10 rounded-full text-xs font-mono text-white ${getStatusColor(selectedProject.status)} bg-opacity-80`}>
                          {selectedProject.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">
                      <Cpu size={16} /> Technical Overview
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">
                      <Sparkles size={16} /> Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">
                      <Terminal size={16} /> Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-mono text-slate-700 dark:text-slate-300 shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <a href={selectedProject.liveUrl} className="flex-1 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-indigo-500/25">
                      Launch Demo <ExternalLink size={18} />
                    </a>
                    <a href={selectedProject.githubUrl} className="flex-1 py-3.5 px-6 bg-slate-100 dark:bg-slate-800 border-2 border-transparent hover:border-indigo-500 text-slate-900 dark:text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                      Review Code <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ArrowUpRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

export default Projects;