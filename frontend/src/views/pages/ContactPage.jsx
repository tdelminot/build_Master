import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ContactPage = observer(() => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    architectId: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.architect) {
      setFormData(prev => ({
        ...prev,
        architectId: location.state.architect.id,
        message: `Bonjour ${location.state.architect.name},\n\nJe souhaite vous contacter pour discuter d'un projet de construction.`
      }));
      toast.info(`📐 Contact avec ${location.state.architect.name}`);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Envoyer à l'API
      const response = await axios.post(`${API_URL}/contact/architect`, formData);
      
      if (response.data.success) {
        toast.success(`✅ Votre message a été envoyé avec succès !`);
        toast.success(`📧 Un email de confirmation a été envoyé à ${formData.email}`);
        setFormData({ name: '', email: '', phone: '', message: '', architectId: '' });
      }
    } catch (error) {
      toast.error('❌ Erreur lors de l\'envoi du message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contactez-nous</h1>
        <p>Nous sommes à votre écoute pour tous vos projets</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Informations de contact</h2>
          <div className="contact-item">
            <FiMapPin />
            <div>
              <h4>Adresse</h4>
              <p>Antananarivo, Madagascar</p>
            </div>
          </div>
          <div className="contact-item">
            <FiPhone />
            <div>
              <h4>Téléphone</h4>
              <p>+261 34 12 345 67</p>
            </div>
          </div>
          <div className="contact-item">
            <FiMail />
            <div>
              <h4>Email</h4>
              <p>contact@buildmaster.mg</p>
            </div>
          </div>
          <div className="contact-item">
            <FiClock />
            <div>
              <h4>Horaires</h4>
              <p>Lun - Ven: 8h - 17h</p>
            </div>
          </div>
        </div>

        <motion.form 
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>Envoyer un message</h2>
          
          <div className="form-group">
            <label>Nom complet *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Votre nom"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="votre@email.com"
            />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+261 34 12 345 67"
            />
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              placeholder="Décrivez votre projet..."
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Envoi en cours...' : '📨 Envoyer le message'}
          </button>
          
          <p className="form-note">
            Un email de confirmation vous sera envoyé automatiquement.
          </p>
        </motion.form>
      </div>
    </div>
  );
});

export default ContactPage;