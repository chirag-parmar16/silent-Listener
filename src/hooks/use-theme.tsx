
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'silent-listener-theme',
  ...props
}: ThemeProviderProps) {
  const [theme] = useState<Theme>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove('light');
    root.classList.add('dark');
    
  }, []);

  const value = {
    theme,
    setTheme: () => {
      // No-op since we're only supporting dark theme
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
    
  return context;
};
