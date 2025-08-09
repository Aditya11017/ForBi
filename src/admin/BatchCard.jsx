import React from 'react';
import './batch.css';

export default function BatchCard({ data }) {
  return (
    <div className={`batch-list-box ${data.batchClass}`}>
      <div className="time">{data.batchStartTime} <span>{data.batchEndTime}</span></div>
      <div className="batch-duration"><span>◷</span>  {data.batchDuration}</div>
      <div className="batch-id"><span>Batch ID</span> <br/>{data.batchId}</div>
      <div className="batch-name">
        {data.batchName}
        <div className="batch-date">{data.batchStartDate} to {data.batchEndDate}</div>
      </div>
      <div className="batch-participants">
        {data.batchParticipants}
        /{data.totalSeats}</div>
        <div className="batch-price">
        ₹{data.price}
        </div>
        
      <div className="batch-actions">
        <button className={`batch-action-btn ${data.batchClass}-btn`}>View</button>
        <button className={`batch-action-btn ${data.batchClass}-btn`}>Edit</button>
        <button className={`batch-action-btn ${data.batchClass}-btn`}>Delete</button>
      </div>
    </div>
  );
}
