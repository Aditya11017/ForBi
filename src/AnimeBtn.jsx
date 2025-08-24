import React from 'react';
import './AnimeBtn.css';

export default function AnimeBtn({ children, onClick }) {
  return (
     <button className="an-btn" onClick={onClick}>
      <span className="an-btnSpan">{children}</span>
    </button>
  );
}
