import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { X, Menu, Home, User, Briefcase, Code, Mail, Award } from "lucide-react";


// Utility for class merging (simple version)
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

interface NavbarContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    icon: React.ReactNode;
  }[];
  className?: string;
  onItemClick?: () => void;
  visible?: boolean;
}

export const NavbarContainer = ({ children, className }: NavbarContainerProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      // Fixed at top, no movement
      className={cn(
        "fixed inset-x-0 z-50 w-full top-0 transition-all duration-300",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible }
          )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <div
      className={cn(
        "relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 transition-all duration-300 dark:text-white",
        visible
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800"
          : "bg-transparent",
        className
      )}
    >
      {/* Do not pass 'visible' to children to avoid DOM warnings */}
      {children}
    </div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick,
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden lg:flex flex-row items-center justify-center space-x-1",
        className
      )}
    >
      {items.map((item, idx) => (
        <a // Changed to 'a' tag for hashed links to work reliably without react-scroll setup
          key={`link-${idx}`}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 w-full h-full bg-slate-100 dark:bg-slate-800 rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-20 flex items-center gap-2">
            {/* Optional: Show icon on desktop too? User code only showed name. Keeping name only for clean look */}
            {item.name}
          </span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:hidden">{children}</div>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="flex items-center gap-2 px-2 py-1 font-bold text-xl tracking-tighter text-slate-900 dark:text-white group"
    >
      <div className="w-8 h-8 rounded-full overflow-hidden shadow-md border border-slate-200 dark:border-slate-700">
        <img src="/images/D-Logo.png" alt="Logo" className="w-full h-full object-cover" loading="lazy" />
      </div>
      <span className="hidden sm:inline">Portfolio</span>
    </a>
  );
};



const navItems = [
  { name: "Home", link: "#home", icon: <Home size={20} /> },
  { name: "About", link: "#about", icon: <User size={20} /> },
  { name: "Skills", link: "#skills", icon: <Code size={20} /> }, // Added Skills link
  { name: "Projects", link: "#projects", icon: <Briefcase size={20} /> },
  { name: "Certifications", link: "#certifications", icon: <Award size={20} /> },
  { name: "Contact", link: "#contact", icon: <Mail size={20} /> },
];

// ... existing code ...

import { ThemeModeToggle, ThemeColorPicker } from "./ThemeToggle.tsx";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <NavbarContainer>
        <NavBody>
          <NavbarLogo />

          <NavItems items={navItems} /> {/* Desktop Menu */}

          <div className="flex items-center gap-2">
            <ThemeModeToggle />
            <ThemeColorPicker />

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </NavBody>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 lg:hidden flex flex-col gap-2"
            >
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <span className="text-indigo-600 dark:text-indigo-400">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </NavbarContainer>

    </>
  );
};

export default Navbar;