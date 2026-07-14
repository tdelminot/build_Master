import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ContactViewModel {
  isLoading = false;
  error = null;
  success = false;

  constructor() {
    makeAutoObservable(this);
  }

  async contactArchitect(contactData) {
    this.isLoading = true;
    this.error = null;
    this.success = false;
    try {
      const response = await axios.post(`${API_URL}/contact/architect`, contactData);
      if (response.data.success) {
        runInAction(() => {
          this.success = true;
        });
        toast.success('Message envoyé avec succès !');
        return true;
      }
      return false;
    } catch (error) {
      runInAction(() => {
        this.error = error.response?.data?.error || error.message;
      });
      toast.error(this.error);
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  reset() {
    this.success = false;
    this.error = null;
  }
}

export default ContactViewModel;