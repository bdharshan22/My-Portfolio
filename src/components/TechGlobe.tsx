import React, { useEffect, useState } from 'react';
import { Cloud, renderSimpleIcon, fetchSimpleIcons, type SimpleIcon } from 'react-icon-cloud';

// Use a hardcoded list of slugs based on common tech or map from your constants
const slugs = [
    'typescript',
    'javascript',
    'dart',
    'openjdk',
    'react',
    'flutter',
    'android',
    'html5',
    'css3',
    'nodedotjs',
    'express',
    'nextdotjs',
    'prisma',
    'amazonwebservices',
    'postgresql',
    'firebase',
    'nginx',
    'vercel',
    'testinglibrary',
    'jest',
    'cypress',
    'docker',
    'git',
    'jira',
    'github',
    'gitlab',
    'androidstudio',
    'sonarqube',
    'figma',
    'tailwindcss',
    'framer',
    'redux',
    'mongodb',
    'python',
    // Added extensions
    'go',
    'rust',
    'cplusplus',
    'php',
    'kotlin',
    'swift',
    'vuedotjs',
    'angular',
    'svelte',
    'spring',
    'dotnet',
    'mysql',
    'sqlite',
    'redis',
    'kubernetes',
    'jenkins',
    'linux',
    'ubuntu',
    'graphql',
    'apollographql',
    'threedotjs',
    'sass',
    'bootstrap',
    'postman',
];

interface TechGlobeProps {
    onIconClick?: (icon: SimpleIcon) => void;
}

const TechGlobe: React.FC<TechGlobeProps> = ({ onIconClick }) => {
    const [icons, setIcons] = useState<any[] | null>(null);

    useEffect(() => {
        fetchSimpleIcons({ slugs }).then(({ simpleIcons }) => {
            const renderedIcons = Object.values(simpleIcons).map((icon: SimpleIcon) =>
                renderSimpleIcon({
                    icon,
                    minContrastRatio: 2, // Ensure visibility
                    bgHex: "#000000",    // Contrast calculation background
                    fallbackHex: "#fff",
                    size: 32,
                    aProps: {
                        href: undefined,
                        target: undefined,
                        rel: undefined,
                        onClick: (e: any) => {
                            e.preventDefault();
                            if (onIconClick) onIconClick(icon);
                        },
                        style: { cursor: 'pointer' }
                    },
                })
            );
            setIcons(renderedIcons);
        });
    }, [onIconClick]);

    if (!icons) {
        return (
            <div className="flex items-center justify-center h-64 w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center w-full h-full overflow-hidden">
            <Cloud
                options={{
                    clickToFront: 500,
                    depth: 1,
                    imageScale: 2,
                    initial: [0.1, -0.1],
                    outlineColour: '#0000',
                    reverse: true,
                    tooltip: 'native',
                    tooltipDelay: 0,
                    wheelZoom: false,
                }}
            >
                {icons}
            </Cloud>
        </div>
    );
};

export default TechGlobe;
