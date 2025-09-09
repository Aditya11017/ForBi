import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import LiveSessionCard from "./LiveSessionCard";
import { BatchData } from "./BatchData";
import "./liveSession.css";
import { useBatch } from "./reg/batchContext";
import Dropdown from "./dropdown/dropdown";
import Session from "./session";

const FILTERS = ['All Batches', 'Active Batches', 'Upcoming Batches'];
const topics = ['All Topics', 'Microsoft Excel', 'Power BI', 'SQL', 'Seuretiry Comapilce', 'Python', 'Artificial Intelligence', 'Machine Learning', 'Data Science'];
const levels = ['All Levels', 'Core', 'Specialist'];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LiveSessions() {
    const { batches } = useBatch();
  const location = useLocation();
  const query = useQuery();
 // ✅ Get enrolled batches

  const totalBatches = batches.length;
  const totalAmount = batches.reduce((sum, batch) => sum + batch.price, 0).toFixed(2);
  const [selectedFilter, setSelectedFilter] = useState('All Batches');
  const [focusTag, setFocusTag] = useState(null);

  const sessionScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
const [selectedLevel, setSelectedLevel] = useState(levels[0]);


  useEffect(() => {
    const tag = query.get('focus');
    setFocusTag(tag);
  }, [location.search, query]);

  const statusFiltered = BatchData.filter((item) => {
    return selectedFilter === 'All Batches' ||
      item.batchStatus.toLowerCase() === selectedFilter.replace(' Batches', '').toLowerCase();
  });

  const focusedBatches = statusFiltered.filter(item => item.batchClass === focusTag);
  const otherBatches = statusFiltered.filter(item => item.batchClass !== focusTag);

  const scrollLeft = () => {
    sessionScrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    sessionScrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = sessionScrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
  };

  useEffect(() => {
    const container = sessionScrollRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  return (
    <div className="live-sessions-container">
      <div className="live-session-box">
        <div className="live-s-box">
          <h1>Live Sessions</h1>
          <p>Join our live sessions to enhance your learning experience with real-time interaction and expert guidance.</p>

          {/* ✅ Scrollable Tag Bar with Buttons */}
          <div className="session-scroll-wrapper">
            {canScrollLeft && (
              <button className="scroll-btn left" onClick={scrollLeft}>&lt;</button>
            )}
            <div className="session-info-bar" ref={sessionScrollRef}>
              <ul className="batch-tag-list">
                {FILTERS.map((filter) => (
                  <li
                    key={filter}
                    className={`batch-tag-list-item ${selectedFilter === filter ? 'active' : ''}`}
                    onClick={() => setSelectedFilter(filter)}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            </div>
            {canScrollRight && (
              <button className="scroll-btn right" onClick={scrollRight}>&gt;</button>
            )}
          </div>



          {/* Dropdown Filters */}
          <div className="session-dropdown">
    <Dropdown
    label="Topic"
    options={topics}
    selected={selectedTopic}
    onSelect={setSelectedTopic}
      searchable={true}
  />
  <Dropdown
    label="Level"
    options={levels}
    selected={selectedLevel}
    onSelect={setSelectedLevel}
      searchable={true}
  />
</div>
 <Link to="/Enrollment">
            <div className="cart-div">  
              <span className="info-lable">Enrollment Details</span>
              <h4 className="cart-info">Batches Enrolled : {totalBatches}</h4>
              <h4 className="cart-info">Amount : ₹ {parseFloat(totalAmount).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</h4>
            <span className="cart-btn">Procced to Enroll</span>
            </div>
            
          </Link>

          {/* Focused Batches */}
          {focusTag && focusedBatches.length > 0 && (
            <>
              <h2 className="fillter-title">{focusedBatches[0].batchName} Batches</h2>
              <div className="live-session-filter-card-box">
                {focusedBatches.map((item) => (
                  <LiveSessionCard key={item.key} data={item} />
                ))}
              </div>
            </>
          )}

          <h3 className="fillter-title">Available Batches</h3>
          <div className="live-session-card-box">
            {otherBatches.length > 0 ? (
              otherBatches.map((item) => (
                <LiveSessionCard key={item.key} data={item} />
              ))
            ) : (
              <p>No batches found.</p>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}
