import React, { useState, useEffect } from 'react';
import './App.css';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/Particles';
import ThemeToggle from './components/ThemeToggle';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Apply theme class to body
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Theme toggle */}
      <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />

      {/* full-screen particles background with mouse interaction */}
      <Particles 
        particleCount={200}
        moveParticlesOnHover={true}
        particleHoverFactor={1}
        particleColors={isDarkMode ? ['#ffffff', '#ffffff'] : ['#000000', '#000000']}
      />

      {/* Scroll progress bar */}
      <motion.div 
        className="scroll-progress" 
        style={{ scaleX }}
      />

      {/* main content sits above */}
      <div className="app-content">
        <Navigation />
        <main>
          <Home />
          <About />
          <Projects />
          <Skills />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default App;
