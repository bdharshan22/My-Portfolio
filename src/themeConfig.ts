
export const THEMES = {
    indigo: {
        name: "Indigo",
        colors: {
            400: "#818cf8",
            600: "#4f46e5",
        },
    },
    purple: {
        name: "Purple",
        colors: {
            400: "#c084fc",
            600: "#9333ea",
        },
    },
    blue: {
        name: "Blue",
        colors: {
            400: "#60a5fa",
            600: "#2563eb",
        },
    },
};

export type ThemeColor = keyof typeof THEMES;

export const applyTheme = (color: ThemeColor) => {
    // Implementation to apply theme, e.g., setting CSS variables
    // const root = document.documentElement;
    // const theme = THEMES[color];
    // Example: root.style.setProperty('--primary-color', theme.colors[600]);
    localStorage.setItem('theme_color', color);
};
