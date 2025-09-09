import "./livesessioncard.css";
import liveiocn from "./assets/images/live-icon.svg";
import seat from "./assets/images/seat.svg";
import dur from "./assets/images/duration.svg";
import time from "./assets/images/batch-time.svg";
import clander from "./assets/images/Clander.svg";
import { useToast } from "./toast/useToast";
import { useBatch } from "./reg/batchContext.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LiveSessionCard({ data }) {
  const { addBatch, batches } = useBatch();
  const toast = useToast();
   const navigate = useNavigate(); // 👈 add this
  const [isBatchAdded, setIsBatchAdded] = useState(false);

  useEffect(() => {
    const alreadyAdded = batches.some(batch => batch.key === data.key);
    setIsBatchAdded(alreadyAdded);
  }, [batches, data.key]);
  const isFull = data.batchParticipants == 0;

  const handleRegister = () => {
    const enrolled = data.batchParticipants;
    if (enrolled == 0 || data.batchParticipants == 0 ) {
      toast({ message: 'No Seats Available', type: 'error' });
      return;
    }

   if (!isBatchAdded) {
      addBatch(data);
      toast({ message: 'Batch added successfully', type: 'success' });
    } else {
      // 👇 Navigate when already added
      navigate("/Enrollment");
    }
  };


  return (
    <div className="live-batch-box">
      <div className="batch-card">
        <div className="batch-card-info">
          <div className="batch-top">
            <img src={data.logo || "/default-logo.png"} alt="logo" className="batch-logo" />
            <span className="live-tag"><img src={liveiocn} alt="" /> Live</span>
          </div>

          <h2 className="batch-title">
            <span className="batch-id">{data.batchId}</span>
            <span>{data.batchName}</span>
          </h2>

          <div className="batch-time">
            <img src={time} alt="" />
            <span>{data.batchStartTime} | {data.batchEndTime}</span>
          </div>

          <div className="batch-date">
            <img src={clander} alt="" />
            <span>{data.batchStartDate} to {data.batchEndDate}</span>
          </div>

          <div className="batch-meta">
            <div className="duration">
              <img src={dur} alt="" /><span>{data.batchDuration}</span>
            </div>
            <div className="batch-seat">
              <img src={seat} alt="" />
              <span>{data.batchParticipants} seats</span>
            </div>
          </div>

          <div className="batch-price-box">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 2
            }).format(data.price).replace('₹', '₹ ')}
            
            <span className="discount-label">
              {Math.round(((data.mrp - data.price) / data.mrp) * 100)}% off
            </span>

            <del className="mrp-label">
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2
              }).format(data.mrp).replace('₹', '₹ ')}
            </del>
          </div>

          <button
            onClick={handleRegister}
            className={`${isFull ? 'session-btn-reg-deactivated' : 'session-btn-reg'} ${isBatchAdded ? 'btn-added' : ''}`}
            disabled={isFull}
          >
            {isFull
              ? 'Enrollment Close'
              : isBatchAdded
              ? 'Proceed to Enroll'
              : 'Enroll Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
