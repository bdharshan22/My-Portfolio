import { useEffect, useRef } from 'react';

interface SEOUpdaterProps {
    title: string;
    description: string;
}

const SEOUpdater: React.FC<SEOUpdaterProps> = ({ title, description }) => {
    const defaultTitle = useRef(document.title);
    const defaultDescription = useRef<string | null>(null);

    useEffect(() => {
        // Save defaults on mount
        defaultTitle.current = document.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        defaultDescription.current = metaDesc ? metaDesc.getAttribute('content') : '';

        // Update on mount/change
        document.title = title;

        let metaTag = document.querySelector('meta[name="description"]');
        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.setAttribute('name', 'description');
            document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', description);

        // Cleanup on unmount
        return () => {
            document.title = defaultTitle.current;
            if (defaultDescription.current && metaTag) {
                metaTag.setAttribute('content', defaultDescription.current);
            } else if (metaTag) {
                // If there was no description originally, we might want to clear it or leave it. 
                // Safest for SPA navigation is often restoring the 'app' description if captured, 
                // or just empty string if we want to clean up our specific project description.
                // Here we restore what we found.
                metaTag.setAttribute('content', defaultDescription.current || '');
            }
        };
    }, [title, description]);

    return null;
};

export default SEOUpdater;
