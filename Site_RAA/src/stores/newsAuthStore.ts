import { create } from 'zustand';

// Interface que define o estado de autenticação para o sistema de notícias
interface NewsAuthState {
  isAuthenticated: boolean; // Indica se o usuário está autenticado
  login: (username: string, password: string) => Promise<void>; // Função para fazer login
  logout: () => void; // Função para fazer logout
}

// Criação do estado de autenticação usando Zustand
export const useNewsAuthStore = create<NewsAuthState>((set) => ({
  // Inicializa o estado de autenticação como "false" (usuário não autenticado)
  isAuthenticated: false,

  // Função de login que verifica as credenciais do usuário
  login: async (username: string, password: string) => {
    // Verifica se as credenciais correspondem a um dos usuários autorizados
    if (
      (username === 'admin' && password === 'r44t12k24') || // Credenciais do administrador
      (username === 'comunicacao' && password === 'comunicraa@#2024') // Credenciais do usuário "comunicacao"
    ) {
      // Define o estado de autenticação como "true" (usuário autenticado)
      set({ isAuthenticated: true });
      // Armazena o status de autenticação no localStorage para persistência
      localStorage.setItem('news_auth', 'true');
    } else {
      // Lança um erro se as credenciais forem inválidas
      throw new Error('Credenciais inválidas');
    }
  },

  // Função de logout que redefine o estado de autenticação e remove o status do localStorage
  logout: () => {
    // Define o estado de autenticação como "false" (usuário desautenticado)
    set({ isAuthenticated: false });
    // Remove o status de autenticação do localStorage para que o usuário tenha que fazer login novamente
    localStorage.removeItem('news_auth');
  },
}));
