import { Link } from 'react-router-dom';

function Footer () {
  return (
    <footer className="footer-container">
      <div>
        {'Created by '}
        <a 
          href="https://jamesmart77.github.io" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          James Martineau
        </a>
      </div>
      <small>
        <Link className="privacy-link" to="/justScripture/privacyPolicy">Privacy Policy</Link>
      </small>
    </footer>
  );
}

export default Footer;
