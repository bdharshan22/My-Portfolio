import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import SplashScreen from './components/SplashScreen.tsx';
import SEO from './components/SEO.tsx';
import { ThemeProvider } from './context/ThemeProvider.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';

const About = lazy(() => import('./components/About.tsx'));
const Skills = lazy(() => import('./components/Skills.tsx'));
const Projects = lazy(() => import('./components/Projects.tsx'));
const Certifications = lazy(() => import('./components/Certifications.tsx'));
const Contact = lazy(() => import('./components/Contact.tsx'));
const Footer = lazy(() => import('./components/Footer.tsx'));
const ProjectDetails = lazy(() => import('./components/ProjectDetails.tsx'));

const Home = () => (
  <>
    <Hero />
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </Suspense>
  </>
);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <SEO />
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
        <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
          <Navbar />
          <main>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Home />} />
                <Route path="/skills" element={<Home />} />
                <Route path="/projects" element={<Home />} />
                <Route path="/certifications" element={<Home />} />
                <Route path="/contact" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetails />} />
              </Routes>
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
