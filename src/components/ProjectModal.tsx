import React, { useEffect } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Code2, Layers, CheckCircle2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ProjectModalProps {
    project: any;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-slate-900 w-full max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row border border-slate-700/50 ring-1 ring-white/10"
                        >
                            {/* Close Button Mobile */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/40 text-white rounded-full backdrop-blur-md md:hidden"
                            >
                                <X size={20} />
                            </button>

                            {/* LEFT COLUMN: Image + Actions */}
                            <div className="w-full md:w-[40%] bg-slate-950 p-6 flex flex-col gap-6 shrink-0 border-r border-slate-800">
                                {/* Image Container */}
                                <div className="rounded-xl overflow-hidden shadow-lg border border-slate-800 ring-1 ring-white/5 relative group">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
                                </div>

                                {/* Actions Area */}
                                <div className="flex flex-col gap-3">
                                    {project.liveUrl && project.liveUrl !== '#' && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 hover:scale-[1.02]"
                                        >
                                            <ExternalLink size={18} /> Visit Live Site
                                        </a>
                                    )}
                                    {project.githubUrl && project.githubUrl !== '#' && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-slate-700 hover:border-slate-600 hover:scale-[1.02]"
                                        >
                                            <Github size={18} /> View Source
                                        </a>
                                    )}
                                </div>

                                {/* Quick Metadata */}
                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Status</span>
                                        <span className="text-emerald-400 text-sm font-semibold flex items-center gap-1">
                                            <CheckCircle2 size={14} /> {project.status}
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Type</span>
                                        <span className="text-indigo-400 text-sm font-semibold flex items-center gap-1">
                                            <Layers size={14} /> {project.tags[0]}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Description & Tech */}
                            <div className="flex-1 bg-slate-900 overflow-y-auto custom-scrollbar relative">
                                {/* Desktop Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 z-50 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors hidden md:block"
                                >
                                    <X size={24} />
                                </button>

                                <div className="p-6 md:p-10 space-y-8">

                                    {/* Header */}
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag: string) => (
                                                <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-medium rounded-full border border-slate-700">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                            Project Overview
                                        </h3>
                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-slate-400 leading-relaxed text-base">
                                                {project.fullDescription || project.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                            <Code2 size={20} className="text-indigo-400" />
                                            Tech Stack
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack?.map((tech: string) => (
                                                <span key={tech} className="px-3 py-1.5 text-sm bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 rounded-lg hover:bg-indigo-500/20 transition-colors cursor-default">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                                        <ul className="space-y-3">
                                            {project.features?.map((feature: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-3 text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-800/50">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                    <span className="leading-relaxed text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ProjectModal;
