import React, { useEffect, useRef, useState } from "react";
import "./timeline.css";

export default function TimelineCards({ label = "SESSION DATES", steps = [] }) {
  const timelineRef = useRef(null);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const blocks = document.querySelectorAll(".timeline-block");
    blocks.forEach((block) => observer.observe(block));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline-dates">
      <div className="timeline-label">{label}</div>
      <div className="timeline-track" ref={timelineRef}>
        {steps.map((step, index) => (
          <div
            key={index}
            className="timeline-block"
            onClick={() => setModalData(step)}
          >
            <div className="step-label">{step.label}</div>
            <div className="step-date">{step.date}</div>
          </div>
        ))}
      </div>

      {modalData && (
        <div className="modal-overlay" onClick={() => setModalData(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modalData.label}</h3>
            <p>{modalData.date}</p>
            <button onClick={() => setModalData(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
