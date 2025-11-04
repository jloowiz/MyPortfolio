import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Home.css';

function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  return (
    <section id="home" className="home-section" ref={ref}>
      <motion.div 
        className="home-content"
        style={{ y, opacity }}
      >
        <div className="name-container">
          <h1><span className="hello-text">Hello, I'm</span><br/>John Louis</h1>
        </div>
        <p className="tagline">I'm a 4th year Computer Science student at Holy Angel University.</p>
        <div className="cta-buttons">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
      </motion.div>
    </section>
  );
}

export default Home;
