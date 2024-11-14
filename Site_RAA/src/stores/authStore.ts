import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials } from '../types/auth';
import { authService } from '../services/authService';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: authService.isAuthenticated(),
      user: authService.getUser(),
      token: authService.getToken(),
      error: null,
      loading: false,

      login: async (credentials: LoginCredentials) => {
        try {
          set({ loading: true, error: null });
          const response = await authService.login(credentials);
          set({
            isAuthenticated: true,
            user: response.user,
            token: response.token,
            loading: false
          });
        } catch (error) {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            error: error instanceof Error ? error.message : 'Erro ao fazer login',
            loading: false
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          await authService.logout();
        } finally {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false
          });
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token
      })
    }
  )
);