// DatePicker.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./DatePicker.css"

/** ---------- utils ---------- */
const pad = (n, len = 2) => String(n).padStart(len, "0");
const toYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseYMD = (s) => {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d); // local midnight
};
const addDays = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};
const addMonths = (date, n) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
};
const daysInMonth = (y, mIdx) => new Date(y, mIdx + 1, 0).getDate();

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const weekNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]; // week starts Sunday

function isBeforeStr(a, b) { return !!(a && b) && a < b; }
function isAfterStr(a, b)  { return !!(a && b) && a > b; }

/** ---------- component ---------- */
export default function DatePicker({
  value,                // 'yyyy-mm-dd'
  onChange,             // (ymd) => void
  min,                  // 'yyyy-mm-dd'
  max,                  // 'yyyy-mm-dd'
  placeholder = "Select date",
  disabled = false,
  className = "",
  ariaLabel = "Choose date"
}) {
  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);

  const valueDate = useMemo(() => parseYMD(value), [value]);
  const minStr = min || null;
  const maxStr = max || null;

  const initialBase = valueDate || parseYMD(minStr) || today;
  const [viewYear, setViewYear] = useState(initialBase.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialBase.getMonth()); // 0..11
  const [open, setOpen] = useState(false);
  const [activeDate, setActiveDate] = useState(valueDate || today);

  const rootRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (valueDate) {
      setViewYear(valueDate.getFullYear());
      setViewMonth(valueDate.getMonth());
      setActiveDate(valueDate);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  // close on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (!open) return;
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // build 6x7 grid
  const grid = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startIdx = first.getDay(); // 0..6 (Sun..Sat)
    const dim = daysInMonth(viewYear, viewMonth);

    const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevYear  = viewMonth === 0 ? viewYear - 1 : viewYear;
    const dimPrev   = daysInMonth(prevYear, prevMonth);

    const cells = [];
    for (let i = 0; i < 42; i++) {
      let d, inMonth = true;
      if (i < startIdx) {
        const day = dimPrev - (startIdx - 1 - i);
        d = new Date(prevYear, prevMonth, day);
        inMonth = false;
      } else if (i >= startIdx + dim) {
        const day = i - (startIdx + dim) + 1;
        d = new Date(viewYear, viewMonth + 1, day);
        inMonth = false;
      } else {
        const day = i - startIdx + 1;
        d = new Date(viewYear, viewMonth, day);
      }

      const ymd = toYMD(d);
      const disabledCell =
        (minStr && isBeforeStr(ymd, minStr)) ||
        (maxStr && isAfterStr(ymd, maxStr));

      cells.push({
        ymd,
        date: d,
        inMonth,
        disabled: disabledCell,
        isToday: toYMD(today) === ymd,
        isSelected: value ? ymd === value : false
      });
    }
    return cells;
  }, [viewYear, viewMonth, minStr, maxStr, value, today]);

  const goPrevMonth = () => {
    const d = addMonths(new Date(viewYear, viewMonth, 1), -1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };
  const goNextMonth = () => {
    const d = addMonths(new Date(viewYear, viewMonth, 1), 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  function selectYmd(ymd) {
    if (!onChange) return;
    if (minStr && isBeforeStr(ymd, minStr)) return;
    if (maxStr && isAfterStr(ymd, maxStr)) return;
    onChange(ymd);
    setOpen(false);
  }

  function onTriggerKeyDown(e) {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((o) => !o);
      if (!open) setActiveDate(valueDate || today);
    }
  }

  function onGridKeyDown(e) {
    let next = activeDate || (valueDate || today);
    if (e.key === "ArrowLeft")  next = addDays(activeDate, -1);
    if (e.key === "ArrowRight") next = addDays(activeDate, 1);
    if (e.key === "ArrowUp")    next = addDays(activeDate, -7);
    if (e.key === "ArrowDown")  next = addDays(activeDate, 7);
    if (e.key === "PageUp")     next = addMonths(activeDate, -1);
    if (e.key === "PageDown")   next = addMonths(activeDate, 1);
    if (e.key === "Home")       next = new Date(viewYear, viewMonth, 1);
    if (e.key === "End")        next = new Date(viewYear, viewMonth, daysInMonth(viewYear, viewMonth));

    if (next !== activeDate) {
      setActiveDate(next);
      setViewYear(next.getFullYear());
      setViewMonth(next.getMonth());
      e.preventDefault();
    }

    if (e.key === "Enter") {
      selectYmd(toYMD(activeDate));
      e.preventDefault();
    }
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.focus();
    }
  }

  const display = valueDate ? `${pad(valueDate.getDate())}-${pad(valueDate.getMonth()+1)}-${valueDate.getFullYear()}` : "";

  return (
    <div className={`nb-date ${className}`} ref={rootRef}>
      <button
        type="button"
        ref={inputRef}
        className={`nb-date__input ${disabled ? "is-disabled" : ""}`}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        aria-label={ariaLabel}
        aria-expanded={open}
      >
        <span className={`nb-date__text ${display ? "" : "is-placeholder"}`}>
          {display || placeholder}
        </span>
        <svg className="nb-date__icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.6"/>
          <line x1="8" y1="3.5" x2="8" y2="7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <line x1="16" y1="3.5" x2="16" y2="7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div className="nb-cal" role="dialog" aria-modal="true" onKeyDown={onGridKeyDown}>
          <div className="nb-cal__header">
            <button type="button" className="nb-cal__nav" onClick={goPrevMonth} aria-label="Previous month">‹</button>

            <div className="nb-cal__selectors">
              <select
                className="nb-cal__mm"
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
              >
                {monthNames.map((m, i) => (
                  <option key={m} value={i}>{m}</option>
                ))}
              </select>
              <input
                className="nb-cal__yyyy"
                type="number"
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value || viewYear))}
              />
            </div>

            <button type="button" className="nb-cal__nav" onClick={goNextMonth} aria-label="Next month">›</button>
          </div>

          <div className="nb-cal__week">
            {weekNames.map((w) => <div key={w} className="nb-cal__wk">{w}</div>)}
          </div>

          <div className="nb-cal__grid" role="grid" tabIndex={0}>
            {grid.map((cell, idx) => {
              const cls = [
                "nb-cal__day",
                cell.inMonth ? "" : "is-out",
                cell.isToday ? "is-today" : "",
                cell.isSelected ? "is-selected" : "",
                cell.disabled ? "is-disabled" : "",
                (activeDate && toYMD(cell.date) === toYMD(activeDate)) ? "is-active" : ""
              ].filter(Boolean).join(" ");
              return (
                <button
                  type="button"
                  key={cell.ymd + idx}
                  className={cls}
                  disabled={cell.disabled}
                  onClick={() => selectYmd(cell.ymd)}
                >
                  {cell.date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="nb-cal__footer">
            <button
              type="button"
              className="nb-cal__pill"
              onClick={() => {
                const ymd = toYMD(today);
                if ((minStr && isBeforeStr(ymd, minStr)) || (maxStr && isAfterStr(ymd, maxStr))) return;
                onChange?.(ymd);
                setViewYear(today.getFullYear());
                setViewMonth(today.getMonth());
                setOpen(false);
              }}
            >
              Today
            </button>
            <button
              type="button"
              className="nb-cal__pill"
              onClick={() => {
                onChange?.("");
                setOpen(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
