import React from 'react';

function Footer () {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-container">
        &copy; {currentYear} 
        {' '}
        <a 
        href="https://jamesmart77.github.io" 
        target="_blank" 
        rel="noopener noreferrer"
        >
          James Martineau
        </a>
    </footer>
  );
}

export default Footer;
