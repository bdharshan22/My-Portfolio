import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SplashScreen from './components/SplashScreen';
import Certifications from './components/Certifications';

import AIChat from './components/AIChat';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) return <SplashScreen onComplete={() => setLoading(false)} />;

  return (

    <div className="min-h-screen transition-colors duration-300 bg-slate-50 text-slate-900">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />

      <Contact />
      <AIChat />
    </div>
  );
}

export default App;
