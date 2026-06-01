import create from 'zustand';
import ptAppAPI from '../api/ptAppAPI';

interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
}

interface AppState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, userData?: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  
  // User actions
  setUser: (user: User | null) => void;
  updateUser: (user: User) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const data = await ptAppAPI.login(email, password);
      set({ 
        user: data.user,
        isAuthenticated: true,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (email: string, password: string, name: string, userData?: any) => {
    set({ isLoading: true });
    try {
      const data = await ptAppAPI.register(email, password, name, userData);
      set({ 
        user: data.user,
        isAuthenticated: true,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await ptAppAPI.logout();
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await ptAppAPI.getMe();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  updateUser: (user: User) => {
    set({ user });
  },
}));
