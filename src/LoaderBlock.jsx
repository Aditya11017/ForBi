// src/components/LoaderBlock.jsx
import "./LoaderBlock.css";

export default function LoaderBlock({ width, height, circle = false, style }) {
  return (
    <div
      className="loader-block"
      style={{
        width,
        height,
        borderRadius: circle ? "50%" : "10px",
        ...style,
      }}
    />
  );
}
