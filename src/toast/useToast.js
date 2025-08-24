// src/toast/useToast.js
import { createContext, useContext } from 'react';

// 1) Create context (holds the addToast fn)
export const ToastContext = createContext();

// 2) Hook for components to fire toasts
export function useToast() {
  const addToast = useContext(ToastContext);
  if (!addToast) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return addToast;
}
