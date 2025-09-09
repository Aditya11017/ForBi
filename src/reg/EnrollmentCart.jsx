import { useState } from "react";
import BatchCart from "./BatchCart";
import BatchDetailsDrawer from "./BatchDetailsDrawer";

export default function EnrollmentCart({ batches, onRemove }) {
  const [activeBatch, setActiveBatch] = useState(null);

  return (
    <div className="enrollment-cart">
      <p className="sub-heading">Session Check Out</p>
      <p className="batch-title">Batches</p>

      {batches.length > 0 ? (
        batches.map((batch) => (
          <BatchCart
  key={batch.batchId}
  data={batch}
  onRemove={() => onRemove(batch.batchId)}
  onExpand={() => setActiveBatch(batch)} // ✅ this triggers the drawer
/>
        ))
      ) : (
        <p>No batches selected.</p>
      )}

      <div className="add-more">
        <a href="/">ADD Other Training Programs</a>
      </div>

      {/* Floating drawer component */}
{activeBatch && (
  <BatchDetailsDrawer batch={activeBatch} onClose={() => setActiveBatch(null)} />
)}
    </div>
  );
}
