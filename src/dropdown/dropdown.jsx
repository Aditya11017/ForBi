import { useState, useRef, useEffect } from "react";
import "./dropdown.css";

export default function Dropdown({
  label,
  options,
  selected,
  onSelect,
  searchable = false // <-- 🔹 Add this to control search input visibility
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(0);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (listRef.current && isOpen) {
      const el = listRef.current.children[highlightedIndex];
      if (el) el.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, isOpen]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 < filteredOptions.length ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev - 1 >= 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions[highlightedIndex]) {
        onSelect(filteredOptions[highlightedIndex]);
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(0);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-legend">{label}</div>
      <button
        type="button"
        className="session-filter-dropdown"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        {selected}
        <span className="dropdown-arrow">▾</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu" onKeyDown={handleKeyDown}>
          {searchable && ( // <-- 🔹 Conditionally render search field
            <input
              type="text"
              className="dropdown-search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setHighlightedIndex(0);
              }}
              autoFocus
            />
          )}
          <ul ref={listRef}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option}
                  className={`dropdown-option ${
                    index === highlightedIndex ? "highlighted" : ""
                  }`}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                    setSearchTerm("");
                    setHighlightedIndex(0);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="dropdown-option">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
