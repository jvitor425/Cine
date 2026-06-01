import type { UserType } from '../types/user.type';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface IAuthService {
  login(email: string, password: string): Promise<UserType>;
  register(data: RegisterData): Promise<UserType>;
  logout(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  getCurrentUser(): UserType | null;
}

export interface IAuthContext {
  user: UserType | null;
  loading: boolean;
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
  register(data: RegisterData): Promise<void>;
  logout(): Promise<void>;
  resetPassword(email: string): Promise<void>;
}
