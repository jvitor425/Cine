import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase.config';
import { userService } from './user.service';
import type { IAuthService, RegisterData } from '../interfaces/auth.interface';
import type { UserType } from '../types/user.type';

function mapFirebaseUser(firebaseUser: FirebaseUser): UserType {
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuário',
    email: firebaseUser.email!,
    createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(), 
  };
}

function mapAuthError(code: string): string {
  const errors: Record<string, string> = {
    'auth/user-not-found': 'Usuário não encontrado',
    'auth/wrong-password': 'Senha incorreta',
    'auth/invalid-credential': 'Credenciais inválidas',
    'auth/email-already-in-use': 'E-mail já cadastrado',
    'auth/weak-password': 'Senha muito fraca (mínimo 6 caracteres)',
    'auth/invalid-email': 'E-mail inválido',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',
    'auth/network-request-failed': 'Falha de conexão. Verifique sua internet',
    'auth/user-disabled': 'Usuário desabilitado',
  };
  return errors[code] || 'Ocorreu um erro inesperado';
}

class AuthService implements IAuthService {
  async login(email: string, password: string): Promise<UserType> {
    try {
      const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return mapFirebaseUser(user);
    } catch (error: any) {
      throw new Error(mapAuthError(error.code));
    }
  }

  async register(data: RegisterData): Promise<UserType> {
    const { name, email, password } = data;
    try {
      const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await updateProfile(user, { displayName: name });
      
      
      const userData: UserType = {
        id: user.uid,
        name,
        email: user.email!,
        createdAt: user.metadata.creationTime || new Date().toISOString(), 
      };
      await userService.createUser({ id: user.uid, name, email: user.email! });
      return userData;
    } catch (error: any) {
      throw new Error(mapAuthError(error.code));
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(firebaseAuth);
    } catch {
      throw new Error('Erro ao fazer logout');
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
    } catch (error: any) {
      throw new Error(mapAuthError(error.code));
    }
  }

  getCurrentUser(): UserType | null {
    const firebaseUser = firebaseAuth.currentUser;
    if (!firebaseUser) return null;
    return mapFirebaseUser(firebaseUser);
  }
}

export const authService = new AuthService();
