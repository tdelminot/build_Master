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
          this.projects = response.data.projects;
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
          this.selectedProject = response.data.project;
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
