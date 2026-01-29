import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../constants.ts';
import { Github, ExternalLink, ArrowLeft, Code2, Layers, CheckCircle2 } from 'lucide-react';
import SEO from './SEO.tsx';

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

const ProjectDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    // Find project based on slug
    const project = PROJECTS_DATA.find(p => slugify(p.title) === slug);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
                    <Link to="/" className="text-indigo-600 hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={project.title}
                description={project.description}
                url={`/projects/${slug}`}
                image={project.image}
                type="software"
                keywords={[...project.tags, "Software", "Web Application", "React"]}
                applicationCategory="WebApplication"
            />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20 px-4 md:px-6">
                <div className="container mx-auto max-w-6xl">
                    <Link to="/projects" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-slate-900 w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-800 ring-1 ring-white/10 flex flex-col md:flex-row min-h-[70vh]"
                    >
                        {/* LEFT COLUMN: Image + Actions (Sticky on Desktop) */}
                        <div className="w-full md:w-[40%] bg-slate-950 p-6 md:p-8 flex flex-col gap-8 shrink-0 border-b md:border-b-0 md:border-r border-slate-800">
                            {/* Image Container */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800 ring-1 ring-white/5 relative group aspect-video md:aspect-auto">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                            </div>

                            {/* Actions Area */}
                            <div className="flex flex-col gap-4">
                                {project.liveUrl && project.liveUrl !== '#' && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <ExternalLink size={20} /> Visit Live Site
                                    </a>
                                )}
                                {project.githubUrl && project.githubUrl !== '#' && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border border-slate-700 hover:border-slate-600 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <Github size={20} /> View Source
                                    </a>
                                )}
                            </div>

                            {/* Quick Metadata */}
                            <div className="grid grid-cols-2 gap-4 mt-auto">
                                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest block mb-1">Status</span>
                                    <span className="text-emerald-400 text-sm font-bold flex items-center gap-2">
                                        <CheckCircle2 size={16} /> {project.status}
                                    </span>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest block mb-1">Type</span>
                                    <span className="text-indigo-400 text-sm font-bold flex items-center gap-2">
                                        <Layers size={16} /> {project.tags[0]}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Description & Tech */}
                        <div className="flex-1 bg-slate-900 p-8 md:p-12 space-y-12">
                            {/* Header */}
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                                    {project.title}
                                </h1>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag: string) => (
                                        <span key={tag} className="px-4 py-1.5 bg-slate-800/80 text-slate-300 text-xs font-bold rounded-full border border-slate-700 uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                    <div className="w-8 h-[2px] bg-indigo-500 rounded-full" />
                                    Project Overview
                                </h3>
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    {project.fullDescription || project.description}
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                    <Code2 size={24} className="text-indigo-500" />
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.techStack?.map((tech: string) => (
                                        <span key={tech} className="px-4 py-2 text-sm font-medium bg-indigo-500/5 text-indigo-300 border border-indigo-500/10 rounded-xl hover:bg-indigo-500/10 transition-colors cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white">Core Features</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.features?.map((feature: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-4 text-slate-300 bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30 hover:border-slate-700/60 transition-colors group">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform" />
                                            <span className="leading-relaxed font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Cross-Linking Section */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* More Projects Link */}
                        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col items-start justify-center hover:border-indigo-500/50 transition-colors group">
                            <h3 className="text-2xl font-bold text-white mb-2">Explore More</h3>
                            <p className="text-slate-400 mb-6">Check out my other projects and experiments.</p>
                            <Link to="/projects" className="inline-flex items-center gap-2 text-indigo-400 font-bold group-hover:gap-3 transition-all">
                                View All Projects <ArrowLeft className="rotate-180" size={20} />
                            </Link>
                        </div>

                        {/* Back to Home Link */}
                        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col items-start justify-center hover:border-emerald-500/50 transition-colors group">
                            <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                            <p className="text-slate-400 mb-6">Interested in working together? Let's talk.</p>
                            <Link to="/contact" className="inline-flex items-center gap-2 text-emerald-400 font-bold group-hover:gap-3 transition-all">
                                Contact Me <ArrowLeft className="rotate-180" size={20} />
                            </Link>
                        </div>
                    </div>

                </div >
            </div >
        </>
    );
};

export default ProjectDetails;
