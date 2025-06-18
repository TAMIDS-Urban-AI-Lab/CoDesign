import { createContext, useContext, useState } from 'react';

export type AugmentedRealityContextType = {
  clearObjects: (() => void) | null;
  setClearObjects: CallableFunction;
  isLoading: boolean;
  setIsLoading: CallableFunction;
  error: string | null;
  setError: CallableFunction;
};

const AugmentedRealityContext = createContext<
  AugmentedRealityContextType | undefined
>(undefined);

// Custom hook to access context
export const useAugmentedRealityContext = () => {
  const context = useContext(AugmentedRealityContext);
  if (!context) {
    throw new Error(
      'useAugmentedRealityContext must be used within an AugmentedRealityProvider component'
    );
  }
  return context;
};

export const AugmentedRealityProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [clearObjects, setClearObjects] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <AugmentedRealityContext.Provider
      value={{
        clearObjects,
        setClearObjects,
        isLoading,
        setIsLoading,
        error,
        setError
      }}
    >
      {children}
    </AugmentedRealityContext.Provider>
  );
};
