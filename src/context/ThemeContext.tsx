import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
export type AccentColor = 'indigo' | 'blue' | 'emerald' | 'purple' | 'orange' | 'rose';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    accentColor: AccentColor;
    setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Theme State
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        }
        return 'light';
    });

    // Accent Color State
    const [accentColor, setAccentColor] = useState<AccentColor>(() => {
        if (typeof window !== 'undefined') {
            const savedAccent = localStorage.getItem('accentColor');
            // Basic validation
            if (['indigo', 'blue', 'emerald', 'purple', 'orange', 'rose'].includes(savedAccent as string)) {
                return savedAccent as AccentColor;
            }
        }
        return 'indigo'; // Default
    });

    // Apply Theme
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Apply Accent Color
    useEffect(() => {
        const root = window.document.documentElement;
        // Reset fallback
        if (accentColor === 'indigo') {
            root.removeAttribute('data-accent');
        } else {
            root.setAttribute('data-accent', accentColor);
        }
        localStorage.setItem('accentColor', accentColor);
    }, [accentColor]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, accentColor, setAccentColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
