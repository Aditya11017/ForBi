// src/components/Loader.jsx
import LoaderBlock from "./LoaderBlock";
import "./Loader.css";

export default function Loader({ active }) {
  if (!active) return null;

  return (
    <div className="fbi-loader-overlay" aria-hidden>
      <div className="fbi-loader-wrap">
        {/* Sidebar */}
        <aside className="fbi-loader-sidebar">
          <div className="fbi-loader-logo">
            <LoaderBlock width="38px" height="38px" circle />
            <LoaderBlock width="120px" height="16px" />
          </div>

          <nav className="fbi-loader-nav">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="fbi-loader-navitem" key={i}>
                <LoaderBlock width="20px" height="20px" circle />
                <LoaderBlock width="70%" height="12px" />
              </div>
            ))}
          </nav>

          <div className="fbi-loader-cta">
            <LoaderBlock width="100%" height="42px" />
          </div>
        </aside>

        {/* Main */}
        <main className="fbi-loader-main">
          {/* Topbar */}
          <header className="fbi-loader-topbar">
            <div className="fbi-loader-search">
              <LoaderBlock width="22px" height="22px" circle />
              <LoaderBlock width="240px" height="14px" />
            </div>
            <div className="fbi-loader-user">
              <LoaderBlock width="28px" height="28px" circle />
              <LoaderBlock width="90px" height="14px" />
              <LoaderBlock width="36px" height="36px" circle />
            </div>
          </header>

          {/* KPI Cards */}
          <section className="fbi-loader-kpis">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="fbi-loader-card" key={i}>
                <LoaderBlock width="40%" height="12px" />
                <LoaderBlock width="60%" height="24px" style={{ marginTop: 10 }} />
                <div className="fbi-loader-spark">
                  <LoaderBlock width="100%" height="56px" />
                </div>
              </div>
            ))}
          </section>

          {/* Chart + Table */}
          <section className="fbi-loader-grid">
            <div className="fbi-loader-panel">
              <div className="fbi-loader-panel-head">
                <LoaderBlock width="40%" height="16px" />
                <LoaderBlock width="80px" height="28px" />
              </div>
              <LoaderBlock width="100%" height="220px" />
            </div>

            <div className="fbi-loader-panel">
              <div className="fbi-loader-panel-head">
                <LoaderBlock width="30%" height="16px" />
                <LoaderBlock width="120px" height="28px" />
              </div>

              <div className="fbi-loader-table-row head">
                <LoaderBlock width="20%" height="12px" />
                <LoaderBlock width="15%" height="12px" />
                <LoaderBlock width="20%" height="12px" />
                <LoaderBlock width="15%" height="12px" />
                <LoaderBlock width="15%" height="12px" />
                <LoaderBlock width="10%" height="12px" />
              </div>

              {Array.from({ length: 6 }).map((_, r) => (
                <div className="fbi-loader-table-row" key={r}>
                  <LoaderBlock width="20%" height="12px" />
                  <LoaderBlock width="15%" height="12px" />
                  <LoaderBlock width="20%" height="12px" />
                  <LoaderBlock width="15%" height="12px" />
                  <LoaderBlock width="15%" height="12px" />
                  <LoaderBlock width="10%" height="12px" />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
