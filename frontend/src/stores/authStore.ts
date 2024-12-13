import {defineStore} from 'pinia';
import type {User} from "@/composables/useUser.ts";
import {useAuth} from "@/composables/useAuth.ts";
import {useRouter} from "vue-router";

const router = useRouter();
export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    user: JSON.parse(localStorage.getItem('user') as string) as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setUser(user: User) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearAuth() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    login(email: string, password: string) {
      useAuth().login({email, password}).then(() => {
        router.push('/');
      });
    },
  },
});
