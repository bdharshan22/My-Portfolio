import { createContext } from 'react';

export type Theme = 'light' | 'dark';
export type AccentColor = 'indigo' | 'blue' | 'emerald' | 'purple' | 'orange' | 'rose';

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    accentColor: AccentColor;
    setAccentColor: (color: AccentColor) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
