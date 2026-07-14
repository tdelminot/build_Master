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
          this.architects = response.data.architects;
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
          this.selectedArchitect = response.data.architect;
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