// frontend/src/viewmodels/ServiceViewModel.js
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ServiceViewModel {
  services = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadServices() {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await axios.get(`${API_URL}/services`);
      if (response.data.success) {
        runInAction(() => {
          // ✅ Nettoyer les données
          this.services = response.data.services.map(service => ({
            id: service.id || '',
            name: service.name || '',
            description: service.description || '',
            icon: service.icon || '',
            category: service.category || '',
            createdAt: service.createdAt || '',
          }));
        });
      }
    } catch (error) {
      runInAction(() => {
        this.error = error.response?.data?.error || error.message;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  getServicesByCategory(category) {
    return this.services.filter(s => s.category === category);
  }
}

export default ServiceViewModel;