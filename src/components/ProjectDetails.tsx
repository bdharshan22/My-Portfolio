import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../constants';
import { Github, ExternalLink, ArrowLeft, Code2, Layers, CheckCircle2 } from 'lucide-react';
import SEO from './SEO';

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

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors">
                        <ArrowLeft size={20} /> Back to Projects
                    </Link>

                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        {/* Hero Image */}
                        <div className="relative h-64 md:h-96 w-full">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                            <div className="absolute bottom-6 left-6 md:left-10 right-6">
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">{project.title}</h1>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-medium flex items-center gap-2">
                                        <Layers size={16} /> {project.tags[0]}
                                    </span>
                                    <span className="px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-100 rounded-full text-sm font-medium flex items-center gap-2">
                                        <CheckCircle2 size={16} /> {project.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-10">
                            {/* Left Content */}
                            <div className="lg:col-span-2 space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Project Overview</h2>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                        {project.fullDescription || project.description}
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Key Features</h2>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {project.features?.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                                <span className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shrink-0 shadow-sm" />
                                                <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                    <div className="flex flex-col gap-4">
                                        {project.liveUrl && project.liveUrl !== '#' && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                                            >
                                                <ExternalLink size={18} /> Visit Live Site
                                            </a>
                                        )}
                                        {project.githubUrl && project.githubUrl !== '#' && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-3.5 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-slate-200 dark:border-slate-600 shadow-sm"
                                            >
                                                <Github size={18} /> Source Code
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Code2 size={20} className="text-indigo-500" /> Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack?.map((tech) => (
                                            <span key={tech} className="px-3 py-1.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetails;
