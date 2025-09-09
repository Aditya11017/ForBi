// src/components/StudentAssignmentDetail.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function StudentAssignmentDetail() {
  const { assignee, project } = useParams(); // from /student/:assignee/project/:project
  const API_BASE = "http://localhost:3001";  // or "" if you use a Vite proxy

  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const url = `${API_BASE}/api/assignments/student/${encodeURIComponent(
          assignee
        )}/project/${encodeURIComponent(project)}`;

        const res = await fetch(url, { cache: "no-store" });
        const text = await res.text();
        if (!res.ok) throw new Error(`API ${res.status}: ${text}`);

        const data = JSON.parse(text);
        if (!Array.isArray(data)) throw new Error("Detail: non-array JSON");
        setRows(data);
      } catch (e) {
        setError(String(e.message || e));
      } finally {
        setLoading(false);
      }
    })();
  }, [API_BASE, assignee, project]);

  // (optional) derived stats…
  const total = rows.length;
  const completed = rows.filter(r => (r.status || "").toLowerCase().startsWith("completed")).length;
  const progress = total ? Math.round((completed / total) * 100) : 0;
  const totalGrade = useMemo(() => {
    const nums = rows.map(r => parseFloat(r.grade)).filter(n => !Number.isNaN(n));
    return nums.reduce((a,b)=>a+b,0);
  }, [rows]);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 8 }}>
        <Link to="/" style={{ color: "#0A58CA" }}>← Back</Link>
      </div>

      <h2 style={{ color: "#fff" }}>
        {decodeURIComponent(assignee)} — {decodeURIComponent(project)}
      </h2>

      {loading && <p style={{ color: "#ddd" }}>Loading…</p>}
      {!loading && error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      {!loading && !error && rows.length === 0 && <p style={{ color: "#ddd" }}>No data.</p>}

      {!loading && !error && rows.length > 0 && (
        <table style={{ width:"100%", borderCollapse:"collapse", background:"#fff", color:"#111" }}>
          <thead style={{ background:"#f6f6f6" }}>
            <tr>
              <th style={{ textAlign:"left", padding:"10px 8px" }}>Part</th>
              <th style={{ textAlign:"left", padding:"10px 8px" }}>Due</th>
              <th style={{ textAlign:"left", padding:"10px 8px" }}>Status</th>
              <th style={{ textAlign:"left", padding:"10px 8px" }}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} style={{ borderTop:"1px solid #eee" }}>
                <td style={{ padding:"8px 8px" }}>{r.milestone_part}</td>
                <td style={{ padding:"8px 8px" }}>{r.due_date}</td>
                <td style={{ padding:"8px 8px" }}>{r.status}</td>
                <td style={{ padding:"8px 8px" }}>{r.grade}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ textAlign:"right", padding:"10px 8px", fontWeight:600 }}>Total Grade</td>
              <td style={{ padding:"10px 8px", fontWeight:600 }}>{totalGrade || "—"}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
