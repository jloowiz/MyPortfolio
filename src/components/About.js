import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltImage from './TiltImage';
import './About.css';

function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" className="about-section" ref={ref}>
      <motion.div 
        className="about-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>About Me</h2>
        <div className="about-details">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <p>
              Hi! I’m a 4th-year Computer Science student at Holy Angel University, and a passionate developer. I have hands-on experience in modern web technologies, mobile app development, database management, and machine learning.
            </p>
            <p>
              Since I started my journey in tech, I’ve been continuously learning and growing. I enjoy working on challenging projects 
              that push me to expand my skills and deliver exceptional results.
            </p>
            <p>
              When I’m not coding, you can find me gaming, binge-watching movies or series, listening to music, or running. I also love photography, which helps me maintain a healthy balance between professional growth and personal creativity.
            </p>
          </motion.div>
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <TiltImage 
              src="/images/profilepic.jpg" 
              alt="Louis profile" 
              className="about-photo" 
            />
          </motion.div>
        </div>
        <div className="about-highlights">
          {[
            { title: 'Experience', value: '[x] Years' },
            { title: 'Projects Completed', value: '3' }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="highlight-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4 + index * 0.1,
                ease: "easeOut" 
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default About;
