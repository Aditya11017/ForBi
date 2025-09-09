// src/toast/ToastProvider.jsx
import React, { useState, useCallback } from 'react';
import { ToastContext } from './useToast';
import ToastContainer from './ToastContainer';

let idCounter = 0;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // fire a toast
  const addToast = useCallback(({ message, type = 'info', duration = 3000 }) => {
    const id = ++idCounter;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}
