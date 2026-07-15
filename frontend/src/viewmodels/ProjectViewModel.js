// frontend/src/viewmodels/ProjectViewModel.js
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ProjectViewModel {
  projects = [];
  selectedProject = null;
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadProjects() {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await axios.get(`${API_URL}/projects`);
      if (response.data.success) {
        runInAction(() => {
          // ✅ Nettoyer les données avant de les stocker
          this.projects = response.data.projects.map(project => ({
            id: project.id || '',
            title: project.title || '',
            description: project.description || '',
            category: project.category || '',
            location: project.location || '',
            beforeImage: project.beforeImage || project.before_image || '',
            afterImage: project.afterImage || project.after_image || '',
            architectId: project.architectId || '',
            architectName: project.architectName || '',
            year: project.year || null,
            status: project.status || '',
            createdAt: project.createdAt || '',
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

  async loadProject(id) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await axios.get(`${API_URL}/projects/${id}`);
      if (response.data.success) {
        runInAction(() => {
          const p = response.data.project;
          this.selectedProject = {
            id: p.id || '',
            title: p.title || '',
            description: p.description || '',
            category: p.category || '',
            location: p.location || '',
            beforeImage: p.beforeImage || p.before_image || '',
            afterImage: p.afterImage || p.after_image || '',
            architectId: p.architectId || '',
            architectName: p.architectName || '',
            year: p.year || null,
            status: p.status || '',
            createdAt: p.createdAt || '',
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

  getProjectsByCategory(category) {
    return this.projects.filter(p => p.category === category);
  }

  getProjectsByArchitect(architectId) {
    return this.projects.filter(p => p.architectId === architectId);
  }
}

export default ProjectViewModel;