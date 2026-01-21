import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SplashScreen from './components/SplashScreen';
import Certifications from './components/Certifications';


import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) return <SplashScreen onComplete={() => setLoading(false)} />;

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />

        <Contact />

      </div>
    </ThemeProvider>
  );
}

export default App;
