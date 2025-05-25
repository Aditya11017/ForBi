import { useState } from 'react';
import "./tooltip.css"
export default function ToolTip({ children, text }) {
const [visible,setVisible] = useState(false)
    return(
        <div className="tooltip-container"
        onMouseEnter={()=>setVisible(true)}
        onMouseLeave={()=>setVisible(false)}
        >
            {children}
            {visible && <div className="tooltip-box">{text}</div> }
        </div>
    )
}

