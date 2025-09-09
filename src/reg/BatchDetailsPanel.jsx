// BatchDetailsPanel.jsx
import "./BatchDetails.css";

export default function BatchDetailsPanel({ batch }) {
  if (!batch) return null;

  return (
    <div className="batch-details-inline">
      <span className="id-tag"> {batch.batchId}</span>
      <span className="batch-name-tag"> {batch.batchName}</span>
      <span>{batch.batchStartDate} to {batch.batchEndDate}</span>
      
      <span> {batch.batchStartTime} - {batch.batchEndTime}</span>
      <span><strong>Duration:</strong> {batch.batchDuration}</span>
      <span><strong>Seats:</strong> {batch.totalSeats}</span>
      <span><strong>Participants:</strong> {batch.batchParticipants}</span>
      <span><strong>Status:</strong> {batch.batchStatus}</span>
    </div>
  );
}
