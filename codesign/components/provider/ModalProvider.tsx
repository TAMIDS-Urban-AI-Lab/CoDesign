import { createContext, useState, useContext } from 'react';

type ModalContextType = {
  isVisible: (name: string) => boolean;
  openModal: (name: string) => void;
  closeModal: (name: string) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (name: string) => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return {
    isVisible: context.isVisible(name),
    openModal: () => context.openModal(name),
    closeModal: () => context.closeModal(name)
  };
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalStore, updateModalStore] = useState<Record<string, boolean>>({});

  const isVisible = (name: string) => {
    return modalStore[name] || false;
  };
  const openModal = (name: string) =>
    updateModalStore({ ...modalStore, [name]: true });
  const closeModal = (name: string) =>
    updateModalStore({ ...modalStore, [name]: false });

  return (
    <ModalContext.Provider value={{ isVisible, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
