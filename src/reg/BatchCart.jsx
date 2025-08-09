import ToolTip from "../ToolTip";
import trash from "./images/trash.svg";
import drop from "./images/bottm-arw.svg";

export default function BatchCart({ data, onRemove, onExpand }) {
  return (
    <div className="batch-card-checkout">
      <div className="batch-id-checkout">{data.batchId}</div>
      <div className="batch-details-checkout">
        <div className="batch-name-checkout">{data.batchName}</div>
        <div className="batch-dates-checkout">
          Start Date: {data.batchStartDate} | End Date: {data.batchEndDate}
        </div>
      </div>
      <div className="batch-icons">
        <ToolTip text={"View Details"}>
        <button className="btn btn-drop" onClick={onExpand}>
          <img
  src={drop}
  alt="expand"
  style={{
    transform: !onExpand ? "rotate(180deg)" : "none",
    transition: "transform 0.3s ease",
  }}
/>
        </button>
        </ToolTip>
        <ToolTip text={"Remove"}>
        <button onClick={() => onRemove(data.batchId)} className="btn trash-btn">
          <img src={trash} alt="remove" />
        </button>
        </ToolTip>
      </div>
    </div>
  );
}
