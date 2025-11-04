import React, { useEffect, useRef, useState } from 'react';
import './Navigation.css';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleMenu = () => setIsMenuOpen(v => !v);
  const closeMenu = () => setIsMenuOpen(false);

  // Position the glass indicator to the active nav link
  const updateIndicator = (index = activeIndex) => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;
    
    // Get the nav-inner element which contains the menu
    const navInner = nav.querySelector('.nav-inner');
    if (!navInner) return;
    
    const links = navInner.querySelectorAll('.nav-link');
    const activeLink = links[index];
    if (!activeLink) return;
    
    // Get positions relative to the nav-inner container
    const navInnerRect = navInner.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    
    const left = linkRect.left - navInnerRect.left;
    const width = linkRect.width;
    
    indicator.style.transform = `translateX(${left}px) translateY(-50%)`;
    indicator.style.width = `${width}px`;
  };

  useEffect(() => {
    updateIndicator(activeIndex);
    const handleResize = () => updateIndicator(activeIndex);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    // Scrollspy using IntersectionObserver
    const sectionIds = navItems.map(i => i.href.replace('#', ''));
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    // Track which sections are currently visible
    const visibleSections = new Set();

    const options = { 
      root: null, 
      rootMargin: '-100px 0px -50% 0px', 
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] 
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      // Find the most visible section (first in the list of visible sections based on order)
      if (visibleSections.size > 0) {
        for (let i = 0; i < sectionIds.length; i++) {
          if (visibleSections.has(sectionIds[i])) {
            setActiveIndex(i);
            break;
          }
        }
      }
    }, options);

    sections.forEach(s => observer.observe(s));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="navigation">
      <div className="nav-container" ref={navRef}>
        <div className="nav-brand">
          <a href="#home">Your Name</a>
        </div>

        <button 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-inner ${isMenuOpen ? 'open' : ''}`}>
          <div className="nav-menu-glass" />
          <ul className={`nav-menu`}>
            {navItems.map((item, index) => (
              <li key={index} className={`nav-item ${activeIndex === index ? 'active' : ''}`}>
                <a 
                  href={item.href} 
                  className="nav-link"
                  onClick={() => { closeMenu(); setActiveIndex(index); setTimeout(() => updateIndicator(index), 50); }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
