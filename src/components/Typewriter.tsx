import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 20, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText('');

        const timeoutId = setTimeout(() => {
            // Split by words/spaces but keep delimiters to preserve formatting
            // Using regex to split by space but capturing the delimiter so we don't lose newlines effectively
            const chunks = text.split(/(\S+\s*)/).filter(Boolean);
            let currentIndex = 0;

            const intervalId = setInterval(() => {
                if (currentIndex < chunks.length) {
                    setDisplayedText((prev) => prev + chunks[currentIndex]);
                    currentIndex++;
                } else {
                    clearInterval(intervalId);
                }
            }, speed);

            return () => clearInterval(intervalId);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [text, speed, delay]);

    return <span>{displayedText}</span>;
};

export default Typewriter;
