// src/toast/ToastContainer.jsx
import React from 'react';
import './Toast.css';   // your styles

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(({ id, message, type }) => (
        <div key={id} className={`toast toast-${type}`}>
          {message}
        </div>
      ))}
    </div>
  );
}
