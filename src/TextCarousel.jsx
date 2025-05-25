import { useState, useEffect } from 'react';
import './App.css'; // Ensure you import the CSS for styling


const TextCarousel = () => {
  const slides = [
     "🧑🏼‍🏫 Custom Training For CA's Firms ",
    "📑 Flexible Curriculum",
    "📲Live Training Program",
    "📨 Contact us for more info."
    
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel">
      {slides.map((text, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active ' : ''}`}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default TextCarousel;
