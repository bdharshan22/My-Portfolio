import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const techKeywords = ["REACT", "TYPESCRIPT", "NODE.JS", "NEXT.JS", "TAILWIND", "SYSTEM"];

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cycle words
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % techKeywords.length);
    }, 200);
    return () => clearInterval(wordInterval);
  }, []);

  // Loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          setTimeout(onComplete, 800); // Slight delay before exit
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 2; // Random increment
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 overflow-hidden text-white">
          {/* Background Grid Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Glitch/Tech Text */}
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500">
                {techKeywords[currentWordIndex]}
              </h1>
              <div className="absolute -inset-1 bg-indigo-500/20 blur-xl opacity-50 animate-pulse" />
            </div>

            {/* Loading Bar */}
            <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="absolute h-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-xs font-mono text-slate-500 tracking-[0.2em]">
              INITIALIZING // {progress}%
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;