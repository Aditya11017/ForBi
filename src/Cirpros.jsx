export default function Cirpros({
  percent = 0,
  time = "00:00:00",
  size = 500,
  segments = 24
}) {
  const radius = size / 2 - 2; // push dashes outward for center space
  const dashLength = 12;       // shorten dashes for breathing room
  const strokeWidth = 4;
  const angleStep = 360 / segments;

  const getColor = () => {
    if (percent > 66) return "#2ecc71";
    if (percent > 33) return "#f1c40f";
    return "#e74c3c";
  };

  const color = getColor();

  const circles = Array.from({ length: segments }).map((_, i) => {
    const angle = (angleStep * i - 90) * (Math.PI / 180);
    const cx = size / 2 + radius * Math.cos(angle);
    const cy = size / 2 + radius * Math.sin(angle);

    const x2 = size / 2 + (radius - dashLength) * Math.cos(angle);
    const y2 = size / 2 + (radius - dashLength) * Math.sin(angle);

    const active = i < Math.floor((percent / 100) * segments);

    return (
      <line
        key={i}
        x1={x2}
        y1={y2}
        x2={cx}
        y2={cy}
        stroke={active ? color : "#3a3a3a"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={active ? "active-segment" : ""}
      />
    );
  });

  return (
    <div className="countdown-circle-wrapper">
    <svg width={size} height={size} className="circular-progress">
      <g>{circles}</g>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="15"
        fontWeight="600"
        fill="#ffffff"
      >
        {time}
      </text>
    </svg>
    </div>
  );
}
