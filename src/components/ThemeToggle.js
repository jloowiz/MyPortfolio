import React from 'react';
import './ThemeToggle.css';

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button 
      className="theme-toggle" 
      onClick={onToggle}
      aria-label="Toggle dark/light mode"
    >
      <div className={`toggle-track ${isDark ? 'dark' : 'light'}`}>
        <div className="toggle-thumb">
          {isDark ? '⏾' : '☼'}
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle;
