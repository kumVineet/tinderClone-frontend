import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
type GlobalContextType = {
  isLoading: boolean;
  startLoader: () => void;
  stopLoader: () => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLoader = () => {
    setIsLoading(true);
  };

  const stopLoader = () => {
    setIsLoading(false);
  };
  return (
    <GlobalContext.Provider value={{ isLoading, startLoader, stopLoader }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for using the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
