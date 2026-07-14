import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import ServiceViewModel from '../../viewmodels/ServiceViewModel';
import ServiceCard from '../components/ServiceCard';

const serviceViewModel = new ServiceViewModel();

const ServicesPage = observer(() => {
  useEffect(() => {
    serviceViewModel.loadServices();
  }, []);

  const categories = [...new Set(serviceViewModel.services.map(s => s.category))];

  return (
    <div className="services-page">
      <div className="page-header">
        <h1>Nos Services</h1>
        <p>Des solutions complètes pour tous vos besoins en construction</p>
      </div>

      {categories.map(category => (
        <div key={category} className="service-category-section">
          <h2 className="category-title">{category}</h2>
          <div className="services-grid">
            {serviceViewModel.services
              .filter(s => s.category === category)
              .map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default ServicesPage;