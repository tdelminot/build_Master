import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const [showBefore, setShowBefore] = useState(true);

  const beforeImage = project.beforeImage 
    ? `http://localhost:5000${project.beforeImage}` 
    : 'https://via.placeholder.com/400x300?text=Avant';
  
  const afterImage = project.afterImage 
    ? `http://localhost:5000${project.afterImage}` 
    : 'https://via.placeholder.com/400x300?text=Après';

  const statusLabels = {
    'completed': 'Terminé',
    'ongoing': 'En cours',
    'planned': 'Planifié'
  };

  return (
    <motion.div 
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="project-image-container">
        <img 
          src={showBefore ? beforeImage : afterImage} 
          alt={project.title}
          className="project-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x300?text=Image';
          }}
        />
        <div className="project-image-overlay">
          <button 
            className="project-toggle-btn"
            onClick={() => setShowBefore(!showBefore)}
          >
            {showBefore ? 'Voir Après' : 'Voir Avant'}
          </button>
          <span className="project-status">{statusLabels[project.status] || project.status}</span>
        </div>
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.location}</p>
        <p className="project-description">{project.description}</p>
        <div className="project-meta">
          <span>Architecte: {project.architectName || 'Non spécifié'}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
