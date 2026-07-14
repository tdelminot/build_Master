import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import ServiceViewModel from '../../viewmodels/ServiceViewModel';
import ArchitectViewModel from '../../viewmodels/ArchitectViewModel';
import ServiceCard from '../components/ServiceCard';
import ArchitectCard from '../components/ArchitectCard';
import TestimonialCard from '../components/TestimonialCard';
import { FiArrowRight } from 'react-icons/fi';

const serviceViewModel = new ServiceViewModel();
const architectViewModel = new ArchitectViewModel();

const HomePage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    serviceViewModel.loadServices();
    architectViewModel.loadArchitects();
  }, []);

  const handleContact = (architect) => {
    navigate('/contact', { state: { architect } });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Construisez votre <span className="highlight">avenir</span> avec nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            BuildMaster - Votre partenaire de confiance pour tous vos projets 
            de construction et d'architecture à Madagascar
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hero-buttons"
          >
            <button onClick={() => navigate('/services')} className="btn-primary">
              Nos Services
            </button>
            <button onClick={() => navigate('/contact')} className="btn-secondary">
              Devis Gratuit
            </button>
          </motion.div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">150+</span>
            <span className="stat-label">Projets réalisés</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <span className="stat-label">Satisfaction client</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Architectes experts</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2>Nos Services</h2>
          <p>Des solutions complètes pour tous vos projets</p>
        </div>
        <div className="services-grid">
          {serviceViewModel.services.slice(0, 4).map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        <button onClick={() => navigate('/services')} className="view-all-btn">
          Voir tous les services <FiArrowRight />
        </button>
      </section>

      {/* Projects Preview */}
      <section className="projects-preview">
        <div className="section-header">
          <h2>Nos Réalisations</h2>
          <p>Découvrez nos projets récents</p>
        </div>
        <div className="projects-grid">
          {/* Project cards ici */}
        </div>
        <button onClick={() => navigate('/projects')} className="view-all-btn">
          Voir tous les projets <FiArrowRight />
        </button>
      </section>

      {/* Architects Section */}
      <section className="architects-section">
        <div className="section-header">
          <h2>Nos Architectes</h2>
          <p>Des experts passionnés à votre service</p>
        </div>
        <div className="architects-grid">
          {architectViewModel.architects.slice(0, 3).map((architect, index) => (
            <ArchitectCard 
              key={architect.id} 
              architect={architect} 
              index={index}
              onContact={handleContact}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>Ce que disent nos clients</h2>
          <p>La confiance de nos clients est notre meilleure récompense</p>
        </div>
        <div className="testimonials-grid">
          {/* Testimonial cards ici */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Prêt à réaliser votre projet ?</h2>
          <p>Contactez-nous pour un devis gratuit et personnalisé</p>
          <button onClick={() => navigate('/contact')} className="btn-primary">
            Demander un devis
          </button>
        </div>
      </section>
    </div>
  );
});

export default HomePage;