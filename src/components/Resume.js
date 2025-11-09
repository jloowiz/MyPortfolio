import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Resume.css';

function Resume() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Holy Angel University',
      year: '2023 - Present',
      subtext: 'Relevant Coursework: Data Structures and Algorithms, Object-Oriented Programming, Database Systems, Mobile Application Development, Web Development, Artificial Intelligence, Machine Learning'
    },
    {
      degree: 'Senior High School - STEM Strand',
      institution: 'Don Bosco Technical Institute - Tarlac',
      year: '2019 - 2022',
      subtext: 'With High Honors'
    }
  ];

  const certifications = [
    { name: 'AWS Academy Graduate - Cloud Foundations', issued: '2025', subtext: 'AWS Academy / Amazon Web Services Training and Certification' },
    { name: 'Data Analytics Essentials', issued: '2025', subtext: 'Cisco Networking Academy' },
    { name: 'Introduction to Modern AI', issued: '2025', subtext: 'Cisco Networking Academy' },
    { name: 'CCNA: Introduction to Networks', issued: '2024', subtext: 'Cisco Networking Academy' },
    { name: 'Cyber Threat Management', issued: '2024', subtext: 'Cisco Networking Academy' }
  ];

  return (
    <section id="resume" className="resume-section" ref={ref}>
      <motion.div 
        className="resume-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Resume</h2>

        <div className="resume-sections">
          <motion.div 
            className="resume-block"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h3>Education</h3>
            <div className="education-list">
              {education.map((edu, index) => (
                <motion.div 
                  key={index} 
                  className="education-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: "easeOut" 
                  }}
                >
                  <div className="edu-header">
                    <h4>{edu.degree}</h4>
                    <span className="year">{edu.year}</span>
                  </div>
                  <p className="institution">{edu.institution}</p>
                  {edu.subtext && <p className="edu-subtext">{edu.subtext}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="resume-block"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <h3>Certifications</h3>
            <div className="certifications-list">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index} 
                  className="certification-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: "easeOut" 
                  }}
                >
                  <div className="cert-header">
                    <span className="cert-name">{cert.name}</span>
                    <span className="cert-date">{cert.issued}</span>
                  </div>
                  {cert.subtext && <p className="cert-subtext">{cert.subtext}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* View Resume Button */}
        <motion.a 
          href="https://drive.google.com/file/d/1m396XiihyXR5bT5xTbyPwFpX3O-xzaVy/view?usp=sharing" 
          target="_blank"
          rel="noopener noreferrer"
          className="download-resume-btn"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          View Full Resume
        </motion.a>
      </motion.div>
    </section>
  );
}

export default Resume;
