import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import ArchitectViewModel from '../../viewmodels/ArchitectViewModel';
import ArchitectCard from '../components/ArchitectCard';

const architectViewModel = new ArchitectViewModel();

const ArchitectsPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    architectViewModel.loadArchitects();
  }, []);

  const handleContact = (architect) => {
    navigate('/contact', { state: { architect } });
  };

  return (
    <div className="architects-page">
      <div className="page-header">
        <h1>Nos Architectes</h1>
        <p>Des experts passionnés à votre service</p>
      </div>

      <div className="architects-grid">
        {architectViewModel.architects.map((architect, index) => (
          <ArchitectCard 
            key={architect.id} 
            architect={architect} 
            index={index}
            onContact={handleContact}
          />
        ))}
      </div>
    </div>
  );
});

export default ArchitectsPage;