import React from 'react';
import './SegmentedControl.css';
import Core from './assets/images/Core.svg'
import Adv from './assets/images/Adv.svg'
import Pro from './assets/images/Pro.svg' 
import Full from './assets/images/Full.svg'


export default function SegmentedControl({
  options = [],           // e.g. ['Components','AI Prompt']
  selectedIndex = 0,      // which tab is active
  onChange = () => {},    // callback(index)
}) {
  // compute width & position of the indicator
  const widthPercent = 100 / options.length;
  const leftPercent  = widthPercent * selectedIndex;

  // define icons array to match options
  const icons = [Core, Adv, Pro, Full];

  return (
    <div className="segmented-control">
      {/* sliding background */}
      
      <div
        className="segmented-control__indicator"
        style={{
          width:  `${widthPercent}%`,
          left:   `${leftPercent}%`
        }}
      />
      {/* each button */}
      {options.map((label, idx) => (
        <button
          key={idx}
          className={
            idx === selectedIndex
              ? 'segmented-control__option segmented-control__option--active'
              : 'segmented-control__option'
          }
          onClick={() => onChange(idx)}
        >      
        <img
            src={icons[idx]}
            alt={label}
            className="seg-img"  
          />
          <br />
          {label}
        </button>
      ))}
    </div>
  );
}
