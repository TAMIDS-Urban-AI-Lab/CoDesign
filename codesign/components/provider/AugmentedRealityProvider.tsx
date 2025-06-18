import { createContext, useContext, useState } from 'react';

export type AREventCallbacks = {
  handleMoveScene?: () => void;
};

export type AugmentedRealityContextType = {
  eventCallbacks: AREventCallbacks;
  setEventCallbacks: CallableFunction;
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
  const [eventCallbacks, setEventCallbacks] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <AugmentedRealityContext.Provider
      value={{
        eventCallbacks,
        setEventCallbacks,
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
