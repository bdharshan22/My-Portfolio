import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const scrollToSection = async () => {
            // If there's a hash, let the browser/default behavior handle it or handle it explicitly
            if (hash) return;

            // Map paths to section IDs
            const pathToSection: Record<string, string> = {
                '/about': 'about',
                '/skills': 'skills',
                '/projects': 'projects',
                '/certifications': 'certifications',
                '/contact': 'contact'
            };

            const sectionId = pathToSection[pathname];

            if (sectionId) {
                // Poll for the element to exist (up to 2 seconds)
                // This is necessary because sections are lazy loaded via Suspense
                for (let i = 0; i < 20; i++) {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        return;
                    }
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            } else {
                // Default to top for other pages (like Home / or distinct pages)
                // BUT only if we didn't just try to scroll to a section and fail
                // We assume if pathToSection didn't match, we go to top.
                window.scrollTo(0, 0);
            }
        };

        scrollToSection();
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
