import React from 'react'
import SegmentedControl from './SegmentedControl'
import TimelineBar      from './TimelineBar'
import SessionCard      from './SessionCard'
import { Link }         from 'react-router-dom'

export default function OptionBar({ weeksCount = 7, sessions, selectedTab, onTabChange }) {
  // progress and milestones map as before
  const progressMap = sessions.map(s => s.progress)
  const milestones  = sessions.map(s => ({
    label: s.title,
    week:  s.milestoneWeek,
    shape:'triangle'
  }))
  return (
    <div>
      <SegmentedControl
        options={sessions.map(s => s.title)}
        selectedIndex={selectedTab}
        onChange={onTabChange}
      />

      <TimelineBar
        label="WITH FORMULABI LABS"
        weeksCount={weeksCount}
        progress={progressMap[selectedTab]}
        milestones={milestones}
      />

      <div className="tab-panels">
        <SessionCard session={sessions[selectedTab]} showButtons={false}>
          <Link to={`/LiveSessions?focus=${sessions[selectedTab].sessionIDTag}`}>
            <button className="ex-enroll-btn">Enroll Now</button>
          </Link>
        </SessionCard>
      </div>
    </div>
  )
}
