import React from "react";
import "./numberstep.css"


export default function NumberStepper({
  value,
  onChange,
  min = 1,
  max,
  step = 1,
  size = "md", // ✅ NEW prop: sm | md | lg
  className = "",
  ariaLabel = "number stepper",
  disabled = false,
}) {
  const toNum = (v) => {
    const n = parseInt(v, 10);
    return Number.isNaN(n) ? 0 : n;
  };

  const clamp = (n) => {
    const lo = typeof min === "number" ? min : 0;
    const hi = typeof max === "number" ? max : Infinity;
    return Math.min(hi, Math.max(lo, n));
  };

  const current = clamp(toNum(value));

  const dec = () => {
    if (disabled) return;
    onChange(clamp(current - step));
  };

  const inc = () => {
    if (disabled) return;
    onChange(clamp(current + step));
  };

  const atMin = current <= min;
  const atMax = typeof max === "number" && current >= max;

  return (
    <div
      className={`counter-box stepper-${size} ${className}`}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="counter-btn minus"
        onClick={dec}
        disabled={disabled || atMin}
        aria-label="decrease"
      >
        –
      </button>

      <span className="counter-value" role="status" aria-live="polite">
        {current}
      </span>

      <button
        type="button"
        className="counter-btn plus"
        onClick={inc}
        disabled={disabled || atMax}
        aria-label="increase"
      >
        +
      </button>
    </div>
  );
}
