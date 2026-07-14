import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const TestimonialCard = ({ testimonial }) => {
  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <FiStar 
        key={i} 
        className={i < testimonial.rating ? 'star-filled' : 'star-empty'} 
      />
    ));
  };

  return (
    <motion.div 
      className="testimonial-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="testimonial-stars">{renderStars()}</div>
      <p className="testimonial-content">"{testimonial.content}"</p>
      <div className="testimonial-client">
        <strong>{testimonial.clientName}</strong>
        {testimonial.clientCompany && (
          <span> - {testimonial.clientCompany}</span>
        )}
      </div>
    </motion.div>
  );
};

export default TestimonialCard;