import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './Projects.css';

function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const projects = [
    {
      id: 1,
      title: 'DriveVision',
      description: 'DriveVision is a Dockerized web application that allows users to simulate and evaluate fine-tuned object detection models YOLOv8 and SSD300 in the CARLA Simulator under various weather and lighting conditions. Users can choose the model, environment, and computation mode (CPU or GPU), then view a generated video showing detection results with bounding boxes, performance metrics, and inference speed.',
      fullDescription: 'DriveVision is an AI-powered web-based simulation platform developed as part of my thesis project. The system integrates CARLA Simulator with fine-tuned deep learning models to assess object detection performance in autonomous driving contexts. Users can choose between YOLOv8 and SSD300, test them under six environmental conditions (Clear Day, Foggy Day, Rainy Day, Clear Night, Foggy Night, Rainy Night), and select between CPU or GPU processing. After simulation, DriveVision automatically produces video outputs with labeled detections and generates detailed evaluation metrics, including Precision, Recall, F1-Score, IoU, mAP scores, and average inference speed (FPS). Fully Dockerized, the application ensures easy deployment, reproducibility, and scalability for research and experimentation.',
      technologies: ['Python', 'React', 'Node.js',],
      githubLink: 'https://github.com/jloowiz/DriveVision.git',
      liveLink: '',
      features: [
        'Simulates YOLOv8 and SSD300 models in CARLA',
        'Weather and lighting condition selection',
        'CPU and GPU simulation options',
        'Automatic video output with detections',
        'Performance metrics generation (Precision, Recall, mAP, FPS)',
        'Dockerized for easy deployment',
      ]
    },
    {
      id: 2,
      title: 'CineMust',
      description: 'Cinemust: A Campus Video Library, is a product line software that acts as a place to view, and search for the user\'s favorite memorial and eventful clips of campus life from Holy Angel University’s college departments and its staff, instructors, councils, and other respected parties.',
      fullDescription: 'Cinemust: A Campus Video Library, is a product line software that acts as a place to view, and search for the user\'s favorite memorial and eventful clips of campus life from Holy Angel University’s college departments and its staff, instructors, councils, and other respected parties. This application is a timeless form of media that advocates for the Angelite spirit and to embody a true Angelite’s core values with the practice through the means of a media and entertainment software.',
      technologies: ['Flutter', 'Dart', 'PHP',],
      githubLink: 'https://github.com/jloowiz/CineMust.git',
      liveLink: 'https://www.youtube.com/watch?v=YnUHhwb-Q-g',
      features: [
        'Shopping Cart & Checkout',
        'Stripe Payment Integration',
        'Admin Dashboard',
        'Product Management',
        'Order Tracking System'
      ]
    },
    {
      id: 3,
      title: 'JeepWay',
      description: 'A mobile-responsive portfolio website with modern animations and interactive elements to showcase creative work.',
      fullDescription: 'A stunning portfolio website that showcases creative work with style and sophistication. Built with modern web technologies, this project features smooth animations powered by GSAP, interactive elements that engage visitors, and a fully responsive design. The website includes sections for projects, skills, about, and contact information, all tied together with a cohesive design language and seamless navigation.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      githubLink: 'https://github.com/yourusername/project-three',
      liveLink: 'https://project-three.com',
      features: [
        'Modern Animations (GSAP)',
        'Fully Responsive Design',
        'Interactive UI Elements',
        'Optimized Performance',
        'Cross-browser Compatible'
      ]
    },
  ];

  const handleMouseMove = (e, projectId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCursorPos({ x, y });
    setHoveredProject(projectId);
    
    // Magnetic effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / 10;
    const deltaY = (y - centerY) / 10;
    
    card.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0) scale(1)';
    setHoveredProject(null);
  };

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setHoveredProject(null);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <motion.div 
        className="projects-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                ease: "easeOut" 
              }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCardClick(project)}
            >
              <div className="project-number">0{project.id}</div>
              <h3>{project.title}</h3>
              
              {hoveredProject === project.id && (
                <motion.div 
                  className="project-popup"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    left: `${cursorPos.x}px`,
                    top: `${cursorPos.y}px`,
                  }}
                >
                  <p className="popup-description">{project.description}</p>
                  <div className="popup-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="popup-tech">{tech}</span>
                    ))}
                  </div>
                  <div className="popup-hint">Click for more details</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Full Description Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="project-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>×</button>
              
              <div className="modal-header">
                <div className="modal-number">0{selectedProject.id}</div>
                <h2>{selectedProject.title}</h2>
              </div>

              <div className="modal-content">
                <div className="modal-section">
                  <h3>Overview</h3>
                  <p>{selectedProject.fullDescription}</p>
                </div>

                <div className="modal-section">
                  <h3>Key Features</h3>
                  <ul className="features-list">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h3>Technologies</h3>
                  <div className="modal-technologies">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="modal-tech">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-links">
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="modal-link">
                    View on GitHub
                  </a>
                  <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="modal-link modal-link-primary">
                    Watch Video Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
