import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Award, ExternalLink, BadgeCheck, Sparkles, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../constants.ts';

const Certifications: React.FC = () => {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="certifications" className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl delay-700" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-indigo-500"></span>
            <span className="text-indigo-500 font-mono text-sm uppercase tracking-widest">Validation</span>
            <span className="h-px w-8 bg-indigo-500"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
            Certified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">Expertise</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Professional credentials that validate technical proficiency and commitment to continuous learning.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CertificationCard = ({ cert, index }: { cert: any, index: number }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 50 } }
      }}
      whileHover={{ y: -10 }}
      className="relative group h-full"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500"></div>

      <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col overflow-hidden">
        {/* Shiny Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="flex justify-between items-start mb-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors duration-300 text-indigo-500 dark:text-indigo-400">
            {index % 2 === 0 ? <BadgeCheck size={32} /> : <ShieldCheck size={32} />}
          </div>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {cert.name}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
            <Award size={16} className="text-cyan-500" />
            {cert.issuer}
          </p>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm">
          <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Issued</span>
          <span className="font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {cert.date}
          </span>
        </div>

        {/* Hover Sparkle */}
        <motion.div
          className="absolute -bottom-4 -right-4 text-indigo-500/10 dark:text-indigo-500/5 group-hover:text-indigo-500/20 transition-colors duration-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={120} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Certifications;