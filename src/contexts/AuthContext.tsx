 import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
 import { authAPI } from '@/services/api';

 interface APIUser {
   id: string;
   name: string;
   email: string;
   role: string;
 }
 
 interface AuthContextType {
   user: APIUser | null;
   isLoading: boolean;
   login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
   register: (name: string, email: string, password: string, phone: string) => Promise<{ success: boolean; error?: string }>;
   logout: () => void;
   forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
   changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
 }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

 const TOKEN_KEY = 'userToken';
 const USER_KEY = 'userData';

export function AuthProvider({ children }: { children: ReactNode }) {
   const [user, setUser] = useState<APIUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
     const storedUser = localStorage.getItem(USER_KEY);
     const token = localStorage.getItem(TOKEN_KEY);
     
     if (storedUser && token) {
      try {
         const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
         // Optionally verify token
         authAPI.verifyToken().catch(() => {
           // Token invalid, clear auth
           localStorage.removeItem(TOKEN_KEY);
           localStorage.removeItem(USER_KEY);
           setUser(null);
         });
      } catch {
         localStorage.removeItem(USER_KEY);
         localStorage.removeItem(TOKEN_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
     try {
       const response = await authAPI.signin({ email, password });
       const userData: APIUser = {
         id: response.user.email, // API doesn't return id in login response
         name: response.user.name,
         email: response.user.email,
         role: response.user.role,
       };
       
       localStorage.setItem(TOKEN_KEY, response.token);
       localStorage.setItem(USER_KEY, JSON.stringify(userData));
       setUser(userData);
      return { success: true };
     } catch (error) {
       return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  };

  const register = async (
     name: string,
     email: string,
     password: string,
     phone: string
  ): Promise<{ success: boolean; error?: string }> => {
     try {
       const response = await authAPI.signup({
         name,
         email,
         password,
         rePassword: password,
         phone,
       });
       
       const userData: APIUser = {
         id: response.user.email,
         name: response.user.name,
         email: response.user.email,
         role: response.user.role,
       };
       
       localStorage.setItem(TOKEN_KEY, response.token);
       localStorage.setItem(USER_KEY, JSON.stringify(userData));
       setUser(userData);
       return { success: true };
     } catch (error) {
       return { success: false, error: error instanceof Error ? error.message : 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
     localStorage.removeItem(TOKEN_KEY);
     localStorage.removeItem(USER_KEY);
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
     try {
       await authAPI.forgotPassword(email);
      return { success: true };
     } catch (error) {
       // For security, don't reveal if email exists or not
       return { success: true };
    }
  };

  const changePassword = async (
     currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
     try {
       await authAPI.changePassword({
         currentPassword,
         password: newPassword,
         rePassword: newPassword,
       });
       return { success: true };
     } catch (error) {
       return { success: false, error: error instanceof Error ? error.message : 'Password change failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, forgotPassword, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
