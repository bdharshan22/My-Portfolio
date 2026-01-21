import React from "react";

export const AuroraText = ({ children, className, colors = ["#ce2094", "#7324daf8", "#e2258d"] }: { children: React.ReactNode, className?: string, colors?: string[], speed?: number }) => {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-lg opacity-50 animate-pulse"></span>
            <span
                className="relative bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400"
                style={{ backgroundImage: `linear-gradient(to right, ${colors.join(', ')})` }}
            >
                {children}
            </span>
        </span>
    );
};

export default AuroraText;
