import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      signIn: async (email: string, password: string) => {
        // TODO: Implement actual authentication
        // This is a mock implementation
        if (email && password) {
          set({
            user: {
              id: '1',
              name: 'John Doe',
              email: email,
            },
            isAuthenticated: true,
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      signUp: async (name: string, email: string, password: string) => {
        // TODO: Implement actual registration
        // This is a mock implementation
        if (name && email && password) {
          set({
            user: {
              id: '1',
              name: name,
              email: email,
            },
            isAuthenticated: true,
          });
        } else {
          throw new Error('Invalid input');
        }
      },
      signOut: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);