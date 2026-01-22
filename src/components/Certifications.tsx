import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Award, ExternalLink, BadgeCheck, Sparkles, ShieldCheck, Trophy } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../constants.ts';

const Certifications: React.FC = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const controls = useAnimation();

    useEffect(() => {
        // Auto-scroll the horizontal track from 0% to -50% continuously
        controls.start({
            x: ["0%", "-50%"],
            transition: { duration: 30, ease: "linear", repeat: Infinity }
        });
    }, [controls]);

    return (
        <section ref={targetRef} id="certifications" className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
            <div className="flex flex-col items-center justify-center container mx-auto">

                {/* Header Section */}
                <div className="max-w-4xl text-center mb-12 px-6 z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="h-px w-8 bg-indigo-500"></span>
                        <span className="text-indigo-500 font-mono text-sm uppercase tracking-widest">Validation</span>
                        <span className="h-px w-8 bg-indigo-500"></span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                        Certification and <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-indigo-600">Achievements</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Professional credentials that validate technical proficiency and commitment to continuous learning.
                    </p>
                </div>

                {/* Horizontal Card Track */}
                <motion.div initial={{ x: "0%" }} animate={controls} className="flex gap-8 px-6 sm:px-24 items-center w-full">
                    {CERTIFICATIONS_DATA.map((cert, index) => (
                        <CertificationCard key={cert.id} cert={cert} index={index} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    credentialUrl: string;
}

const CertificationCard = ({ cert, index }: { cert: Certification, index: number }) => {
    return (
        <div
            className="relative group w-[75vw] md:w-87.5 h-[45vh] md:h-80 shrink-0"
        >
            <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500"></div>

            <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col overflow-hidden">
                {/* Shiny Overlay */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors duration-300 text-indigo-500 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700">
                        {index % 2 === 0 ? <BadgeCheck size={24} /> : <ShieldCheck size={24} />}
                    </div>
                    {cert.credentialUrl && (
                        <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full"
                        >
                            <ExternalLink size={24} />
                        </a>
                    )}
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                        {cert.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 text-sm">
                        <Award size={16} className="text-cyan-500" />
                        {cert.issuer}
                    </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                        <Trophy size={14} /> {cert.date === 'Ongoing' ? 'Status' : 'Issued'}
                    </span>
                    <span className={`font-bold px-4 py-1.5 rounded-full text-sm ${cert.date === 'Ongoing'
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                        : cert.date === 'Completed'
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
                        }`}>
                        {cert.date}
                    </span>
                </div>

                {/* Hover Sparkle */}
                <motion.div
                    className="absolute -bottom-10 -right-10 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors duration-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <Sparkles size={180} />
                </motion.div>
            </div>
        </div>
    );
};

export default Certifications;
