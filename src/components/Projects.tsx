import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ExternalLink, Github, X, Send, Terminal, Cpu, Sparkles, Zap, MessageSquare, Wifi, Activity, MousePointerClick } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';
import type { ChatMessage } from '../types.ts';
import { generateProjectChatResponse } from '../geminiService';
import SEOUpdater from './SEOUpdater';
import Typewriter from './Typewriter';



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

const messageVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false); // New state for connection simulation
  const chatEndRef = useRef<HTMLDivElement>(null);

  const selectedProject = PROJECTS_DATA.find((p) => p.id === selectedId);

  // Dynamic suggestions based on project
  const getSuggestions = (project: typeof selectedProject) => {
    if (!project) return [];
    return [
      `How does ${project.title} handle data?`,
      `Why did you use ${project.techStack[0]}?`,
      "What was the hardest bug to fix?",
      "Explain the architecture."
    ];
  };

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

  // Initialize Chat with "Connection" sequence
  useEffect(() => {
    if (selectedProject) {
      setIsConnecting(true);
      setChatMessages([]);

      // Simulate connection steps
      setTimeout(() => {
        setIsConnecting(false);
        setChatMessages([{
          id: 'init',
          sender: 'ai',
          text: `Connection established to ${selectedProject.title} repository.\nNeural interface ready. Awaiting queries regarding codebase architecture and logic...`,
          timestamp: new Date()
        }]);
      }, 1500);
    }
  }, [selectedProject]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading, isConnecting]);

  const handleChatSubmit = async (e?: React.FormEvent, manualText?: string) => {
    e?.preventDefault();
    const textToSend = manualText || chatInput;

    if (!textToSend.trim() || !selectedProject) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const responseText = await generateProjectChatResponse(selectedProject.techStack, userMsg.text);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Error", error);
    } finally {
      setIsChatLoading(false);
    }
  };

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
            Explore my work. Click a card to enter the <span className="text-indigo-600 font-mono font-bold">Neural Dive</span> mode and chat with the codebase.
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
              <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
                <motion.img
                  layoutId={`image-${project.id}`}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out"
                  >
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-500/30 backdrop-blur-md">
                      <MessageSquare size={18} />
                      <span className="font-bold tracking-wider text-sm">TALK TO CODE</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-1.5 text-indigo-200 text-xs font-mono uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                  >
                    <MousePointerClick size={14} />
                    <span>Click to Initialize</span>
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
              className="w-full h-full md:max-w-7xl md:h-[90vh] bg-white dark:bg-slate-900 md:rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row border border-slate-200 dark:border-slate-700 ring-1 ring-slate-900/5"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
              >
                <X size={20} />
              </button>

              {/* LEFT COLUMN: Project Details (Scrollable) */}
              <div className="w-full md:w-[45%] h-full overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-transparent">
                <div className="relative w-full">
                  <motion.img
                    layoutId={`image-${selectedProject.id}`}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-auto max-h-[400px] object-cover"
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

                <div className="p-6 md:p-8 space-y-8">
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

              {/* RIGHT COLUMN: Chat Interface (Improved UX/UI) */}
              <div className="w-full md:w-[55%] h-full flex flex-col bg-slate-950 relative border-l border-slate-800 font-mono">
                {/* 1. Cyberpunk Header */}
                <div className="p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between z-20 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                        <Terminal size={18} className="text-indigo-400" />
                      </div>
                      {/* Connection Indicator */}
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnecting ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 border border-slate-950 ${isConnecting ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm tracking-wide">ARCHITECT_AI_INTERFACE</h3>
                      <div className="flex items-center gap-2 text-[10px] text-indigo-400/80 uppercase tracking-wider">
                        <Wifi size={10} />
                        {isConnecting ? 'ESTABLISHING UPLINK...' : 'SECURE CONNECTION ACTIVE'}
                      </div>
                    </div>
                  </div>

                  {/* Visual Status Bars */}
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[9px] text-slate-500 uppercase">Latency</div>
                      <div className="text-xs text-indigo-400">12ms</div>
                    </div>
                    <div className="h-6 w-px bg-slate-800" />
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`w-1 h-3 rounded-full ${i > 2 ? 'bg-indigo-500' : 'bg-indigo-900'}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Messages Area (Flex Grow with Pattern Background) */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-indigo-900/50 scrollbar-track-transparent relative">
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(17,24,39,0)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

                  {isConnecting ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                      <div className="relative w-16 h-16 mb-6">
                        <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full animate-ping" />
                        <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin" />
                        <Activity className="absolute inset-0 m-auto text-indigo-400 animate-pulse" />
                      </div>
                      <p className="text-indigo-400 text-sm font-mono tracking-widest uppercase mb-1">Authenticating...</p>
                      <p className="text-slate-600 text-xs">Accessing {selectedProject.title} codebase</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-center py-4">
                        <span className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em] border-b border-slate-800 pb-1">Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                      </div>

                      {chatMessages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          variants={messageVariants}
                          initial="hidden"
                          animate="visible"
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] sm:max-w-[75%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            {msg.sender === 'ai' && (
                              <div className="flex items-center gap-2 mb-1.5 ml-1">
                                <Cpu size={12} className="text-cyan-400" />
                                <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider">
                                  System_Response
                                </span>
                              </div>
                            )}
                            <div
                              className={`p-4 text-sm leading-relaxed shadow-lg backdrop-blur-sm whitespace-pre-wrap ${msg.sender === 'user'
                                ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm border border-indigo-500'
                                : 'bg-slate-900/90 text-slate-300 font-mono border border-slate-700/50 rounded-2xl rounded-tl-sm'
                                }`}
                            >
                              {msg.sender === 'ai' ? <Typewriter text={msg.text} speed={30} /> : msg.text}
                            </div>
                            <span className="text-[10px] text-slate-600 mt-1.5 px-1 font-mono">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </motion.div>
                      ))}

                      {isChatLoading && (
                        <div className="flex justify-start">
                          <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-sm flex items-center gap-3">
                            <span className="text-xs text-indigo-400 font-mono animate-pulse">ANALYZING_QUERY...</span>
                            <div className="flex gap-1 h-2 items-center">
                              <motion.div className="w-1 h-1 bg-indigo-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} />
                              <motion.div className="w-1 h-1 bg-indigo-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                              <motion.div className="w-1 h-1 bg-indigo-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </>
                  )}
                </div>

                {/* 3. Input Area & Quick Chips */}
                <div className="p-4 bg-slate-950 border-t border-slate-800 z-20">
                  {/* Quick Prompts (Fade in after connection) */}
                  <AnimatePresence>
                    {!isConnecting && !isChatLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-2 overflow-x-auto pb-3 mb-1 scrollbar-none mask-image-fade"
                      >
                        {getSuggestions(selectedProject).map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleChatSubmit(undefined, suggestion)}
                            className="whitespace-nowrap px-3 py-1.5 bg-slate-900 hover:bg-indigo-900/30 border border-slate-800 hover:border-indigo-500/50 rounded-full text-xs text-slate-400 hover:text-indigo-300 transition-colors font-mono flex items-center gap-1.5 shrink-0 group"
                          >
                            <Terminal size={10} className="group-hover:text-indigo-400 transition-colors" />
                            {suggestion}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleChatSubmit} className="relative group">
                    <div className="absolute inset-0 bg-indigo-500/5 rounded-xl blur-md group-focus-within:bg-indigo-500/10 transition-colors duration-500" />
                    <div className="relative flex items-center bg-slate-900 border border-slate-700/50 rounded-xl focus-within:border-indigo-500/50 transition-all duration-300 overflow-hidden shadow-inner">
                      <div className="pl-4 text-indigo-500/50">
                        <Zap size={18} />
                      </div>
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={isConnecting ? "Initializing..." : "Enter command to query codebase..."}
                        disabled={isConnecting}
                        className="w-full bg-transparent text-indigo-50 pl-3 pr-14 py-4 focus:outline-none font-mono text-sm placeholder:text-slate-600 disabled:opacity-50 disabled:cursor-wait"
                        autoComplete="off"
                      />
                      <button
                        type="submit"
                        disabled={!chatInput.trim() || isChatLoading || isConnecting}
                        className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-20 disabled:bg-transparent disabled:cursor-not-allowed"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </form>
                  <div className="flex justify-between items-center mt-2 px-1">
                    <p className="text-[9px] text-slate-600 font-mono uppercase tracking-wider">
                      Powered by Gemini-2.5-flash <span className="hidden sm:inline">| Latency: Optimal</span>
                    </p>
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[9px] text-green-500/80 font-mono uppercase">System Ready</span>
                    </div>
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