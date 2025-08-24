import { useState, useEffect } from 'react';
import "./scrollTop.css"

export default function ScrollTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when scrolled down a certain amount
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to the top of the page when the button is clicked
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        className="scroll-to-top-btn"
        onClick={handleScrollToTop}
        aria-label="Scroll to Top"
      >
        ↑ 
      </button>
    )
  );
}
