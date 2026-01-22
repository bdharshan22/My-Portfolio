import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import { HERO_DATA } from '../constants.ts';
import resumePdf from '../assets/Resume.pdf';
import Typewriter from './Typewriter';

// Custom LeetCode Icon
const LeetCodeIcon = ({ size = 24 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.869 1.452 1.531 0 2.892-.513 3.873-1.495l2.606-2.633c.515-.515.496-1.366-.039-1.901-.535-.536-1.387-.553-1.901-.038zm-4.736-6.158l-3.278 3.326c-.197.197-.472.293-.746.293s-.549-.096-.746-.293l-3.297-3.326c-.197-.197-.293-.472-.293-.746s.096-.549.293-.746l3.297-3.326c.197-.197.472-.293.746-.293s.549.096.746.293l3.278 3.326c.197.197.293.472.293.746s-.096.549-.293.746z" />
  </svg>
);

// Custom HackerRank Icon
const HackerRankIcon = ({ size = 24 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.003 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.314 16.564h-1.859v-3.795h-4.909v3.795H7.691V7.436h1.858v3.58h4.909v-3.58h1.859v9.128z" />
  </svg>
);

const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Blobs */}
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-position-[bottom_1px_center] dark:bg-grid-slate-700/[0.05]"
          style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT COLUMN: Text Content */}
          <motion.div
            variants={containerVariants}
            initial={false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
          >



            <div className="space-y-6 relative z-20">
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold font-heading tracking-tight text-black dark:text-white leading-[1.1]"
              >
                Hi, I'm <br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
                  {HERO_DATA.name}
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-2xl md:text-3xl text-gray-700 dark:text-slate-300 font-light font-heading max-w-2xl"
              >
                <Typewriter text={HERO_DATA.title} speed={100} delay={1000} />
              </motion.p>
            </div>

            <p
              className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg text-lg"
            >
              {HERO_DATA.intro}
            </p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <a href="#projects" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold transition-all hover:scale-105 hover:shadow-primary-500/25 flex items-center gap-2 shadow-lg group">
                View Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-bold hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-105 flex items-center gap-2">
                Resume <Download size={18} />
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-6 pt-4"
            >
              <SocialLink icon={<Github size={24} />} href="https://github.com/bdharshan22" />
              <SocialLink icon={<Linkedin size={24} />} href="https://www.linkedin.com/in/dharshanb22" />
              <SocialLink icon={<LeetCodeIcon size={24} />} href="https://leetcode.com/u/bdharshan22/" />
              <SocialLink icon={<HackerRankIcon size={24} />} href="https://www.hackerrank.com/profile/bdharshan22" />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Animated Image */}
          <motion.div
            variants={imageVariants}
            initial={false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="block relative mt-12 lg:mt-0"
          >
            <motion.div
              animate={floatAnimation}
              className="relative w-full aspect-square max-w-xs mx-auto"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-primary-500 blur-[80px] opacity-20 animate-pulse rounded-full" />

              {/* Main Image Container */}
              <div className="relative z-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xl">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src="/images/avatar.webp"
                    width="200"
                    height="200"
                    fetchPriority="high"
                    alt="Dharshan B profile"
                    className="w-full h-full object-cover shadow-lg opacity-90"
                    onError={(e) => {
                      console.warn('Hero image failed to load:', (e.currentTarget as HTMLImageElement).src);
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                    onLoad={() => {
                      console.log('Hero image loaded successfully');
                    }}
                  />
                  {/* Tech Overlay Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,var(--theme-900)_2px)] bg-size-[100%_4px] opacity-10 pointer-events-none" />
                </div>




                <motion.div
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.9 }}
                  className="absolute -top-6 right-12 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-mono text-slate-600 dark:text-slate-300">System.Online</span>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-primary-500 rounded-full"
          />
        </div>
      </motion.div>
    </section >
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -3 }}
    whileTap={{ scale: 0.95 }}
    className="p-3 text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700"
  >
    {icon}
  </motion.a>
);

export default Hero;