import { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SplashScreen from './components/SplashScreen';
import SEO from './components/SEO';
import { ThemeProvider } from './context/ThemeProvider';

const About = lazy(() => import('./components/About.tsx'));
const Skills = lazy(() => import('./components/Skills.tsx'));
const Projects = lazy(() => import('./components/Projects.tsx'));
const Certifications = lazy(() => import('./components/Certifications.tsx'));
const Contact = lazy(() => import('./components/Contact.tsx'));
const Footer = lazy(() => import('./components/Footer.tsx'));

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) return <SplashScreen onComplete={() => setLoading(false)} />;

  return (
    <ThemeProvider>
      <SEO />
      <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        <Navbar />
        <Hero />
        <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;
