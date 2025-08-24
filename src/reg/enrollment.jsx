import "./regs.css";
import { useBatch } from "./batchContext";
import BatchCart from "./BatchCart";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import BatchDetailsPanel from "./BatchDetailsPanel";;

export default function Enrollment() {
  const { batches, removeBatch } = useBatch();
  const [activeBatchId, setActiveBatchId] = useState(null);
  const regesBoxRef = useRef(null);

  // ✅ Manage expanded batch
  const [activeBatch, setActiveBatch] = useState(null);

  const scrollRegesBox = (direction) => {
    const container = regesBoxRef.current;
    if (!container) return;

    const scrollAmount = 700;
    container.scrollBy({
      top: direction === "up" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="registration-box">
      <div className="registration-container">
        {/* LEFT: Scrollable Batch Cart List */}
        <div className="reges-box" ref={regesBoxRef}>
           <h2>Session Enrollment Details</h2>
          <button className="scroll-down-btn down" onClick={() => scrollRegesBox("down")}>▼</button>
          <br />
          {batches.length > 0 ? (
            batches.map((batch) => (
              <div key={batch.batchId}>
                <BatchCart
                  data={batch}
                  onRemove={removeBatch}
                  onExpand={() =>
                    setActiveBatchId(
                      activeBatchId === batch.batchId ? null : batch.batchId
                    )
                  }
                />
                {activeBatchId === batch.batchId && (
                  <BatchDetailsPanel batch={batch} />
                )}
              </div>
            ))
          ) : (
            <p>No batches selected yet.</p>
          )}
          <div className="add-more">
            <Link to="/LiveSessions">ADD Other Training Programs</Link>
          </div>
          <br />
          <button className="scroll-up-btn up" onClick={() => scrollRegesBox("up")}>▲</button>
        </div>

        {/* RIGHT: Fixed Summary */}
        <div className="price-info">
          <h3>Payment Summary</h3>
          <p className="total-head">Total amount</p>
          <span className="total-badge">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 2,
            })
              .format(batches.reduce((total, batch) => total + batch.price, 0))
              .replace("₹", "₹ ")}
          </span>
          {batches.length > 0 ? (
            <div className="subtotol">
              <div>
                Total Price
                <span className="total-amt">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                  })
                    .format(
                      batches.reduce((total, batch) => total + parseFloat(batch.mrp), 0)
                    )
                    .replace("₹", "₹ ")}
                </span>
              </div>
              <p>
                Discount Applied{" "}
                <span className="discount-badge">
                  {Math.round(
                    batches.reduce(
                      (sum, batch) =>
                        sum + ((batch.mrp - batch.price) / batch.mrp) * 100,
                      0
                    ) / batches.length
                  )}
                  %
                </span>
              </p>
              <p>
                You have saved
                <span className="saving">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                  })
                    .format(
                      batches.reduce(
                        (total, batch) => total + (batch.mrp - batch.price),
                        0
                      )
                    )
                    .replace("₹", "₹ ")}
                </span>
              </p>
              <p className="total-price">
                Total{" "}
                <span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                  })
                    .format(batches.reduce((total, batch) => total + batch.price, 0))
                    .replace("₹", "₹ ")}
                </span>
              </p>
              <button className="checkout-btn">Proceed to Checkout</button>
              <span className="terms">
                By proceeding, you agree to our{" "}
                <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy">Privacy Policy</a>.
              </span>
            </div>
          ) : (
            <p className="info-tag">No batches selected yet.</p>
          )}
        </div>
      </div>

      {/* ✅ Floating Drawer */}
      {activeBatch && (
        <BatchDetailsDrawer
          batch={activeBatch}
          onClose={() => setActiveBatch(null)}
        />
      )}
    </div>
  );
}
