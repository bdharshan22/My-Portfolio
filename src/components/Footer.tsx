import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="py-8 w-full text-center bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <div className="flex justify-center gap-8 mb-6 font-medium text-slate-600 dark:text-slate-400">
                <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
                <Link to="/projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Projects</Link>
                <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>
            </div>
            <p className="text-slate-500 dark:text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} Dharshan B. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
