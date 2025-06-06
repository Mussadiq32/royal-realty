
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';

type User = {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'agent';
  name?: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isAdmin: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => ({ error: null }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async (userEmail: string) => {
    // Check if the user's email is the admin email
    const isAdminUser = userEmail === 'info@royalgroupofrealestates.com';
    setIsAdmin(isAdminUser);
    return isAdminUser;
  };

  useEffect(() => {
    // Check for user on mount
    const getUser = async () => {
      setIsLoading(true);
      const { user, error } = await getCurrentUser();
      
      if (error) {
        console.error('Error getting user:', error);
      }
      
      if (user) {
        const userData = {
          id: user.id,
          email: user.email as string,
          role: (user.user_metadata?.role || 'user') as 'admin' | 'user' | 'agent',
          name: user.user_metadata?.name,
          phone: user.user_metadata?.phone,
        };
        
        setUser(userData);
        await checkAdminStatus(userData.email);
      }
      
      setIsLoading(false);
    };

    getUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const user = session.user;
          const userData = {
            id: user.id,
            email: user.email as string,
            role: (user.user_metadata?.role || 'user') as 'admin' | 'user' | 'agent',
            name: user.user_metadata?.name,
            phone: user.user_metadata?.phone,
          };
          
          setUser(userData);
          await checkAdminStatus(userData.email);
        } else if (['SIGNED_OUT', 'USER_DELETED'].includes(event)) {
          setUser(null);
          setIsAdmin(false);
        }
      }
    );

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error && data?.user) {
      const userData = {
        id: data.user.id,
        email: data.user.email as string,
        role: (data.user.user_metadata?.role || 'user') as 'admin' | 'user' | 'agent',
        name: data.user.user_metadata?.name,
        phone: data.user.user_metadata?.phone,
      };
      
      setUser(userData);
      await checkAdminStatus(userData.email);
    }
    
    return { error };
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          phone: userData.phone,
          role: 'user', // Default role for new users
        },
      },
    });
    
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    }
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
