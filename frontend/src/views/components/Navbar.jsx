import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projets' },
    { path: '/architects', label: 'Architectes' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🏗️</span>
          <span className="brand-text">BuildMaster</span>
        </Link>

        <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-btn">Devis Gratuit</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;