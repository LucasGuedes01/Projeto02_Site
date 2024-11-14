import { create } from 'zustand';

// Define a interface para o estado de autenticação de carreiras
interface CareersAuthState {
  isAuthenticated: boolean; // Indica se o usuário está autenticado
  login: (username: string, password: string) => Promise<void>; // Função de login
  logout: () => void; // Função de logout
}

// Criação do estado de autenticação usando Zustand
export const useCareersAuthStore = create<CareersAuthState>((set) => ({
  // Inicializa o estado de autenticação como "false" (não autenticado)
  isAuthenticated: false,

  // Função de login que verifica as credenciais do usuário
  login: async (username: string, password: string) => {
    // Verifica se as credenciais correspondem a um dos usuários autorizados
    if (
      (username === 'admin' && password === 'r44t12k24') || // Credenciais do administrador
      (username === 'vagas' && password === 'vagas@#2024raa') // Credenciais do usuário "vagas"
    ) {
      // Define o estado como autenticado e armazena o status no localStorage
      set({ isAuthenticated: true });
      localStorage.setItem('careers_auth', 'true');
    } else {
      // Lança um erro se as credenciais forem inválidas
      throw new Error('Credenciais inválidas');
    }
  },

  // Função de logout que redefine o estado e remove o status do localStorage
  logout: () => {
    set({ isAuthenticated: false });
    localStorage.removeItem('careers_auth');
  },
}));
