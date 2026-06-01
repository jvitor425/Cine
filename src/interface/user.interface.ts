import type { UserType } from '../types/user.type';

export interface CreateUserData {
  id: string;
  name: string;
  email: string;
}

export interface IUserService {
  createUser(data: CreateUserData): Promise<UserType>;
  getUser(id: string): Promise<UserType | null>;
  getUserByEmail(email: string): Promise<UserType | null>;
  updateUser(id: string, data: Partial<Omit<UserType, 'id' | 'createdAt'>>): Promise<UserType>;
  deleteUser(id: string): Promise<void>;
}
