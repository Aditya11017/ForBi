// Batch.jsx
import { useState } from 'react';
import './batch.css';
import SideBarAd from './sideBarAd';
import { batch } from './batch';
import BatchCard from './BatchCard';

const FILTERS = ['All Batches', 'Active Batches', 'Completed Batches', 'Upcoming Batches', 'Cancelled Batches'];

export default function Batch() {
  const [selectedFilter, setSelectedFilter] = useState('All Batches');

  // Filtering logic
  const filteredBatches = batch.filter((item) => {
    if (selectedFilter === 'All Batches') return true;
    return item.batchStatus.toLowerCase() === selectedFilter.replace(' Batches', '').toLowerCase();
  });

  return (
    <div className="batch-container">
      <div className="batch-grid">
        <SideBarAd />

        <div className="batch-panel">
          <button className="new-btn"> + New Batch</button>

          <ul className="batch-tag-list">
            {FILTERS.map((filter) => (
              <li
                key={filter}
                className={`batch-tag-item ${selectedFilter === filter ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </li>
            ))}
          </ul>

          <h2>Batch Management</h2>

          <div className="batch-list-panel">
            {filteredBatches.length > 0 ? (
              filteredBatches.map((item) => <BatchCard key={item.key} data={item} />)
            ) : (
              <p>No batches found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
