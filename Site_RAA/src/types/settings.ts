export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  department: string;
  active: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFormData {
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  department: string;
  password?: string;
  active: boolean;
}

export interface SystemConfig {
  maintenanceMode: boolean;
  debugMode: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordExpiryDays: number;
}