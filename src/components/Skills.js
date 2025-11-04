import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Skills.css';

function Skills() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'Python', level: 52 },
        { name: 'Java', level: 40 },
        { name: 'JavaScript', level: 56 }
      ]
    },
    {
      category: 'Web Development',
      skills: [
        { name: 'HTML', level: 70 },
        { name: 'CSS', level: 76 },
        { name: 'React', level: 59 },
        { name: 'Next.js', level: 30 },
        { name: 'Node.js', level: 58 }
      ]
    },
    {
      category: 'Database',
      skills: [
        { name: 'MySQL', level: 56 }
      ]
    },
    {
      category: 'Mobile Development',
      skills: [
        { name: 'Flutter', level: 56 },
        { name: 'Dart', level: 54 },
        { name: 'Android Studio', level: 45 }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <motion.div 
        className="skills-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Skills</h2>
        <div className="skills-container">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              className="skill-category"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.5, 
                delay: categoryIndex * 0.15,
                ease: "easeOut" 
              }}
            >
              <h3>{category.category}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1, 
                          delay: categoryIndex * 0.15 + skillIndex * 0.1,
                          ease: "easeOut" 
                        }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Skills;
