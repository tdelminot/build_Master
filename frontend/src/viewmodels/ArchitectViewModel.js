// frontend/src/viewmodels/ArchitectViewModel.js
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ArchitectViewModel {
  architects = [];
  selectedArchitect = null;
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadArchitects() {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await axios.get(`${API_URL}/architects`);
      if (response.data.success) {
        runInAction(() => {
          // ✅ Nettoyer les données
          this.architects = response.data.architects.map(architect => ({
            id: architect.id || '',
            name: architect.name || '',
            title: architect.title || '',
            experience: architect.experience || 0,
            specialty: architect.specialty || '',
            bio: architect.bio || '',
            photo: architect.photo || '',
            email: architect.email || '',
            phone: architect.phone || '',
            isActive: architect.isActive ?? true,
            createdAt: architect.createdAt || '',
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

  async loadArchitect(id) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await axios.get(`${API_URL}/architects/${id}`);
      if (response.data.success) {
        runInAction(() => {
          const a = response.data.architect;
          this.selectedArchitect = {
            id: a.id || '',
            name: a.name || '',
            title: a.title || '',
            experience: a.experience || 0,
            specialty: a.specialty || '',
            bio: a.bio || '',
            photo: a.photo || '',
            email: a.email || '',
            phone: a.phone || '',
            isActive: a.isActive ?? true,
            createdAt: a.createdAt || '',
          };
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
}

export default ArchitectViewModel;