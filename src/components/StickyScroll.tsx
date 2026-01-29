import React, { useRef } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: {
        title: string;
        description: string | string[];
        techs?: { title: string; icon: React.ReactNode }[];
        projectImage?: string;
        liveURL?: string;
        githubURL?: string;
        backgroundColors?: string[];
    }[];
    contentClassName?: string;
}) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        // target: ref,
        container: ref,
        offset: ["start start", "end end"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        if (closestBreakpointIndex !== activeCard) {
            setActiveCard(closestBreakpointIndex);
        }
    });


    const backgroundColors = [
        "var(--slate-900)",
        "var(--black)",
        "var(--neutral-900)",
    ];

    const linearGradients = [
        "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
        "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
        "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
    ];

    return (
        <motion.div
            animate={{
                backgroundColor: backgroundColors[activeCard % backgroundColors.length],
            }}
            className="h-120 overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 scrollbar-hide w-full"
            ref={ref}
        >
            <div className="div relative flex items-start px-4">
                <div className="max-w-2xl">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="my-20">
                            <motion.h2
                                initial={false}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                className="text-2xl font-bold text-slate-100"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.div
                                initial={false}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                className="text-kg text-slate-300 max-w-sm mt-10"
                            >
                                {Array.isArray(item.description) ? (
                                    <ul className="list-disc pl-4 space-y-2">
                                        {item.description.map((desc, i) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>{item.description}</p>
                                )}

                                {item.techs && (
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {item.techs.map((tech, i) => (
                                            <span key={i} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 flex items-center gap-1">
                                                {tech.icon}
                                                {tech.title}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex gap-4 mt-6">
                                    {item.liveURL && item.liveURL !== '#' && (
                                        <a href={item.liveURL} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold">Live Demo &rarr;</a>
                                    )}
                                    {item.githubURL && item.githubURL !== '#' && (
                                        <a href={item.githubURL} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold">GitHub &rarr;</a>
                                    )}
                                </div>

                            </motion.div>
                        </div>
                    ))}
                    <div className="h-40" />
                </div>
            </div>
            <motion.div
                animate={{
                    background: linearGradients[activeCard % linearGradients.length],
                }}
                className={`hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden ${contentClassName}`}
            >
                {/* If there is an image, display it */}
                {content[activeCard].projectImage ? (
                    <img
                        src={content[activeCard].projectImage}
                        alt={content[activeCard].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl p-4 text-center">
                        {content[activeCard].title}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default StickyScroll;
