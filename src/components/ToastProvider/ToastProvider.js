import React from 'react';

import useKeyDown from '../../../hooks/useKeyDown';

const ToastContext = React.createContext();

export function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const resetToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  const createToast = React.useCallback((variant, message) => {
    const newToast = {
      id: crypto.randomUUID(),
      variant,
      message,
    };

    setToasts((currentToasts) => [...currentToasts, newToast]);
  }, []);

  const dismissToast = React.useCallback((id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  useKeyDown('Escape', resetToasts);

  return (
    <ToastContext value={{ toasts, createToast, dismissToast, resetToasts }}>
      {children}
    </ToastContext>
  );
}

export default ToastProvider;
