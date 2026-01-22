import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, Mail } from "lucide-react";

// Custom StackOverflow Icon
const StackOverflowIcon = ({ size = 24 }: { size?: number }) => (
  <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.936v.014zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.617-.01.001zM15.751 0l-1.746 1.294 6.418 8.666 1.745-1.294L15.749 0h.002z" />
  </svg>
);

const SOCIAL_LINKS = [
  { href: "https://github.com/bdharshan22", label: "GitHub", icon: <Github size={24} /> },
  { href: "https://www.linkedin.com/in/dharshanb22", label: "LinkedIn", icon: <Linkedin size={24} /> },
  { href: "https://twitter.com", label: "Twitter", icon: <Twitter size={24} /> },
  { href: "https://stackoverflow.com/users/32160422/dharshan-b", label: "Stack Overflow", icon: <StackOverflowIcon size={24} /> },
  { href: "mailto:dharshancgm2005@gmail.com", label: "Email", icon: <Mail size={24} /> },
];

const Contact = () => {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const hasVisited = localStorage.getItem("portfolio_viewed");
        let url = "https://api.counterapi.dev/v1/bdharshan22-portfolio/views/";

        if (!hasVisited) {
          url += "up";
          localStorage.setItem("portfolio_viewed", "true");
        }

        const response = await fetch(url);
        const data = await response.json();
        if (data && data.count) {
          setViewCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching view count:", error);
      }
    };

    fetchViewCount();
  }, []);

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center min-h-screen w-full text-neutral-800 pt-16 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 dark:from-blue-900/20 dark:to-purple-900/20 pointer-events-none" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-y-2 text-center font-sans px-4 sm:px-6 lg:px-10 xl:px-16 mb-16">
        <div className="relative mb-8">
          {/* Logo Placeholder */}
          {/* Logo */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50 overflow-hidden bg-white dark:bg-slate-800">
            <img src="/images/logo 3.jpeg" alt="Logo" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="mt-4 text-2xl font-light tracking-wide text-slate-800 dark:text-white sm:text-4xl lg:text-5xl">
            BUILDING COOL STUFF,
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400"> TOGETHER</span>
          </h3>
          <h3 className="mt-3 text-nowrap text-2xl font-light text-slate-800 dark:text-white sm:text-4xl lg:text-5xl">
            LET&apos;S GET <span className="font-extrabold text-indigo-600 dark:text-indigo-400">STARTED!</span>
          </h3>
        </motion.div>

        <motion.button
          key="contact-btn-v5"
          onClick={() => window.open(
            "https://mail.google.com/mail/?view=cm&fs=1&to=dharshancgm2005@gmail.com",
            "_blank",
            "width=800,height=600,scrollbars=yes,resizable=yes"
          )}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="my-10 group relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-primary-500/30 bg-primary-500/10 backdrop-blur-md py-2 pr-2 pl-6 text-base font-medium transition-all hover:bg-primary-500/20"
        >
          <span className="z-10 text-slate-800 dark:text-white transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-300 font-semibold">
            Get In Touch
          </span>

          <span className="ml-4 flex items-center justify-center overflow-hidden rounded-full bg-primary-600 p-2 transition-colors duration-300 group-hover:bg-primary-700">
            <ArrowRight className="text-white transition-all duration-300 group-hover:translate-x-1" size={16} />
          </span>
        </motion.button>

        <p className="tracking-wide text-base font-semibold text-slate-700 dark:text-slate-300 lg:text-2xl">
          Open to full-time opportunities and freelance collaborations.
        </p>
        <p className="my-2 text-sm font-extralight tracking-wide text-balance text-slate-600 dark:text-slate-400 opacity-75 lg:text-xl">
          Passionate about building dynamic web apps
          <br />
          and delivering smooth, user-focused experiences.
        </p>
        <div className="mt-8 flex gap-10 justify-center text-xl md:text-3xl">
          {/* Social links */}
          {SOCIAL_LINKS.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors transform hover:scale-110 duration-300"
            >
              <span className="sr-only">{label}</span>
              {icon}
            </a>
          ))}
        </div>

        {/* View Count Display */}
        {viewCount !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-left"
          >
            <div className="bg-[#1e1e1e] dark:bg-[#0d1117] rounded-lg border border-slate-800 p-4 shadow-2xl min-w-[280px]">
              <div className="flex gap-2 mb-3 border-b border-slate-700/50 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-slate-400">
                  <span className="text-pink-500">const</span> <span className="text-blue-400">visits</span> = <span className="text-emerald-400">{viewCount.toLocaleString()}</span>;
                </div>
                <div className="text-slate-400">
                  <span className="text-slate-500">// Thanks for dropping by!</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300 mt-2">
                  <span className="text-emerald-500">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;