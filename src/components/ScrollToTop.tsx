import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const scrollToSection = () => {
            if (hash) return;

            const pathToSection: Record<string, string> = {
                '/about': 'about',
                '/skills': 'skills',
                '/projects': 'projects',
                '/certifications': 'certifications',
                '/contact': 'contact'
            };

            const sectionId = pathToSection[pathname];

            if (!sectionId) {
                window.scrollTo(0, 0);
                return;
            }

            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            // Fallback: MutationObserver if lazily loaded
            const observer = new MutationObserver((_, obs) => {
                const el = document.getElementById(sectionId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    obs.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });

            // Cleanup observer after 2 seconds if not found
            const timeoutId = setTimeout(() => {
                observer.disconnect();
            }, 2000);

            return () => {
                observer.disconnect();
                clearTimeout(timeoutId);
            };
        };

        const cleanup = scrollToSection();
        return () => {
            if (typeof cleanup === 'function') cleanup();
        };
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
