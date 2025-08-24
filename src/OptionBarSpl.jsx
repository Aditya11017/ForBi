import React, { useState, useRef, useLayoutEffect } from 'react';
import Carousel from './Carousel';
import SplCarousel from './SplCarousel';
import './OptionBarSpl.css';

export default function OptionBarSpl() {
  const [activeTab, setActiveTab] = useState('components');
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    
  }, [activeTab]);

  return (
    <div className="carousel-wrapper">
      {/* Toggle Tabs */}
      <div className="toggle-tab-bar">
        <button
          className={`toggle-tab ${activeTab === 'components' ? 'active' : ''}`}
          onClick={() => setActiveTab('components')}
        >
          🧩 Core
        </button>
        <button
          className={`toggle-tab ${activeTab === 'prompt' ? 'active' : ''}`}
          onClick={() => setActiveTab('prompt')}
        >
          ✨ Specialist 
          {/* <span className="badge">PRO</span> */}
        </button>
      </div>

      {/* Animated Wrapper with Auto Height */}
      <div
        className="tab-content-wrapper"
      >
        <div className="tab-transition-container">
          <div
            className={`tab-content ${activeTab === 'components' ? 'active' : ''}`}
            ref={activeTab === 'components' ? contentRef : null}
          >
            <h2>To Get your Fudamentle to advance</h2>
            <Carousel />
          </div>
          <div
            className={`tab-content ${activeTab === 'prompt' ? 'active' : ''}`}
            ref={activeTab === 'prompt' ? contentRef : null}
          >
            <h2>To have special training for professionals with advanced self paced learining</h2>
            <SplCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
