import { User, AuthResponse, LoginCredentials } from '../types/auth';

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  async login({ username, password }: LoginCredentials): Promise<AuthResponse> {
    // Simplified authentication - only admin user
    if (username === 'admin' && password === 'r44t12k24') {
      const user: User = {
        id: 'admin',
        username: 'admin',
        name: 'Administrador',
        role: 'admin'
      };

      const token = btoa(`${username}:${new Date().getTime()}`);
      
      this.setToken(token);
      this.setUser(user);

      return { user, token };
    }

    throw new Error('Credenciais inválidas');
  }

  async logout(): Promise<void> {
    this.removeToken();
    this.removeUser();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser();
  }
}

export const authService = new AuthService();