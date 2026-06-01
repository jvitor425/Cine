import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase.config';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import type { IAuthContext, RegisterData } from '../interfaces/auth.interface';
import type { UserType } from '../types/user.type';

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await userService.getUser(firebaseUser.uid);
          setUser(
            profile ?? {
              id: firebaseUser.uid,
              name:
                firebaseUser.displayName ||
                firebaseUser.email?.split('@')[0] ||
                'Usuário',
              email: firebaseUser.email!,
              createdAt:
                firebaseUser.metadata.creationTime || new Date().toISOString(),
            }
          );
        } catch {
          setUser({
            id: firebaseUser.uid,
            name:
              firebaseUser.displayName ||
              firebaseUser.email?.split('@')[0] ||
              'Usuário',
            email: firebaseUser.email!,
            createdAt:
              firebaseUser.metadata.creationTime || new Date().toISOString(),
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    await authService.login(email, password);
  };

  const register = async (data: RegisterData): Promise<void> => {
    await authService.register(data);
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
  };

  const resetPassword = async (email: string): Promise<void> => {
    await authService.resetPassword(email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}

