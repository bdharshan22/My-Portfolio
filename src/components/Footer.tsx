import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-8 w-full text-center bg-slate-50 dark:bg-slate-950">
            <p className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                &copy; {new Date().getFullYear()} Dharshan B. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
