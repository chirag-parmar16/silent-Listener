
import { createContext, useContext, ReactNode } from 'react';

// Define a mock user type
type User = {
  id: string;
};

// Updated AuthContextType with the properties being accessed
type AuthContextType = {
  loading: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Since we're removing authentication, we'll provide mock implementations
  const mockSignIn = async () => {
    return { error: null };
  };

  const mockSignUp = async () => {
    return { error: null };
  };

  return (
    <AuthContext.Provider value={{ 
      loading: false,
      user: null, // No user since we're removing authentication
      signIn: mockSignIn,
      signUp: mockSignUp
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
