import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Contact.css';

function Contact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const contactInfo = [
    {
      type: 'Email',
      value: 'johnlouisqmercado@gmail.com',
      link: 'johnlouisqmercado@gmail.com'
    },
    {
      type: 'Phone',
      value: '+63 977 777 9230',
      link: 'tel:+639777779230'
    },
    {
      type: 'Location',
      value: 'Capas, Philippines',
      link: null
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/john-louis-mercado',
      link: 'https://linkedin.com/in/john-louis-mercado-443a72381'
    }
  ];

  const socialLinks = [
    { name: 'Github', url: 'https://github.com/jloowiz' },
    { name: 'Instagram', url: 'https://instagram.com/jnlwiis' }
  ];

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <motion.div 
        className="contact-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Contact</h2>

        <div className="contact-info">
          {contactInfo.map((info, index) => (
            <motion.div 
              key={index} 
              className="contact-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
            >
              <span className="contact-type">{info.type}</span>
              {info.link ? (
                <a href={info.link} className="contact-value">{info.value}</a>
              ) : (
                <span className="contact-value">{info.value}</span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="social-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <h3>Follow me</h3>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <motion.a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.5 + index * 0.1,
                  ease: "easeOut" 
                }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;
