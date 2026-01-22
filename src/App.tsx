import { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SplashScreen from './components/SplashScreen';
import { ThemeProvider } from './context/ThemeContext';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) return <SplashScreen onComplete={() => setLoading(false)} />;

  return (
    <ThemeProvider>
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
