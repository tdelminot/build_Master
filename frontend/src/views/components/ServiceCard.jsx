import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div 
      className="service-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="service-icon">{service.icon}</div>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <div className="service-category">{service.category}</div>
    </motion.div>
  );
};

export default ServiceCard;