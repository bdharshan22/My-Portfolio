import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 100, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsStarted(false);

        const timeoutId = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [text, delay]);

    useEffect(() => {
        if (!isStarted) return;

        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed, isStarted]);

    return <span>{displayedText}</span>;
};

export default Typewriter;
