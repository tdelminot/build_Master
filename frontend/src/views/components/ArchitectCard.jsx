import React from 'react';
import { motion } from 'framer-motion';

const ArchitectCard = ({ architect, index, onContact }) => {
  const imageUrl = architect.photo 
    ? `http://localhost:5000${architect.photo}` 
    : 'https://via.placeholder.com/300x300?text=Architecte';

  return (
    <motion.div 
      className="architect-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="architect-image">
        <img 
          src={imageUrl} 
          alt={architect.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x300?text=Architecte';
          }}
        />
      </div>
      <div className="architect-info">
        <h3>{architect.name}</h3>
        <p className="architect-title">{architect.title}</p>
        <p className="architect-experience">{architect.experience} ans d'expérience</p>
        <p className="architect-specialty">Spécialité: {architect.specialty}</p>
        <p className="architect-bio">{architect.bio}</p>
        <button 
          className="architect-contact-btn"
          onClick={() => onContact(architect)}
        >
          Contacter
        </button>
      </div>
    </motion.div>
  );
};

export default ArchitectCard;
