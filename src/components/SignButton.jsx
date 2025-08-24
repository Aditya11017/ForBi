import { useRef } from "react";
import "./SignButton.css";

export default function SignButton({ children, onClick, ...props }) {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    const button = btnRef.current;

    // Create ripple span
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    // Set ripple position
    const rect = button.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    // Append to button
    button.appendChild(ripple);

    // Clean up after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Call the custom onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={btnRef}
      className="sign-btn"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
