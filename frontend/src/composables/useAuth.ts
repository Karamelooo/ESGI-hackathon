import axios from 'axios';
import {useAuthStore} from '@/stores/authStore';
import axiosInstance from "@/utils/axiosInstance.ts";
import {showToast} from "@/utils/taost.ts";

export function useAuth() {
  const authStore = useAuthStore();

  const login = async (credentials = {email: '', password: ''}) => {
    try {
      const response = await axiosInstance.post('/login', credentials);
      const {token, user} = response.data;

      // Save token and user in the store
      authStore.setToken(token);
      authStore.setUser(user);

      // Set token in axios headers for future requests
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return {success: true};
    } catch (error: any) {
      showToast('Erreur lors de la connexion', 'error');
      console.error('Login error response:', error.response);
    }
  };

  const logout = () => {
    // Clear the store
    authStore.clearAuth();

    // Remove token from axios headers
    delete axios.defaults.headers.common['Authorization'];
  };

  return {
    login,
    logout,
  };
}
