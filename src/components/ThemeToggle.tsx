import { useState, useRef, useEffect } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Palette, Moon, Sun, Check, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme.tsx";
import type { AccentColor } from "../context/ThemeContext.tsx";

// Color definitions
const COLORS: { label: string; value: AccentColor; bg: string }[] = [
    { label: 'Indigo', value: 'indigo', bg: 'bg-indigo-500' },
    { label: 'Blue', value: 'blue', bg: 'bg-blue-500' },
    { label: 'Emerald', value: 'emerald', bg: 'bg-emerald-500' },
    { label: 'Purple', value: 'purple', bg: 'bg-purple-500' },
    { label: 'Orange', value: 'orange', bg: 'bg-orange-500' },
    { label: 'Rose', value: 'rose', bg: 'bg-rose-500' },
];

export function ThemeModeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    );
}

export function ThemeColorPicker() {
    const { accentColor, setAccentColor } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
                title="Change Accent Color"
            >
                <Palette size={18} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-48 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 origin-top-right"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                Primary Color
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-1">
                            {COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => setAccentColor(color.value)}
                                    className={`flex items-center gap-3 w-full p-1.5 rounded-lg transition-all hover:bg-slate-100 dark:hover:bg-slate-800 ${accentColor === color.value ? 'bg-slate-50 dark:bg-slate-800/50' : ''
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full ${color.bg} flex items-center justify-center shadow-sm ring-1 ring-slate-200 dark:ring-slate-700`}>
                                        {accentColor === color.value && <Check size={12} className="text-white" />}
                                    </div>
                                    <span className={`font-medium text-xs ${accentColor === color.value ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                                        }`}>
                                        {color.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
