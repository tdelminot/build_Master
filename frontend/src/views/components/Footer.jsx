import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🏗️ BuildMaster</h3>
          <p>Agence de construction et architecture basée à Madagascar. Nous réalisons vos projets de A à Z.</p>
          <div className="footer-social">
            <a href="#"><FiFacebook /></a>
            <a href="#"><FiInstagram /></a>
            <a href="#"><FiYoutube /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Liens rapides</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projets</Link></li>
            <li><Link to="/architects">Architectes</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services">Architecture Design</Link></li>
            <li><Link to="/services">Construction Générale</Link></li>
            <li><Link to="/services">Rénovation</Link></li>
            <li><Link to="/services">Infrastructure d'Entreprise</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><FiMapPin /> Antananarivo, Madagascar</li>
            <li><FiPhone /> +261 34 12 345 67</li>
            <li><FiMail /> contact@buildmaster.mg</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 BuildMaster. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;