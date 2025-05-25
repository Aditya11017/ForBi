// components/OptionBar.jsx
import React, { useState } from 'react'
import SegmentedControl from './SegmentedControl'
import TimelineBar      from './TimelineBar'
import SessionCard      from './SessionCard'
import { Link }         from 'react-router-dom'

export default function OptionBar({ weeksCount = 7, sessions }) {
  const [tab, setTab] = useState(0)

  // build progress & milestones from your data
  const progressMap = sessions.map(s => s.progress)
  const milestones  = sessions.map(s => ({
    label: s.title,
    week:  s.milestoneWeek,
    shape:'triangle'
  }))

  return (
    <div>
      {/* === your existing SegmentedControl classes stay */}
      <SegmentedControl
        options={sessions.map(s => s.title)}
        selectedIndex={tab}
        onChange={setTab}
      />

      {/* === timeline (unchanged) === */}
      <TimelineBar
        label="WITH FORMULABI LABS"
        weeksCount={weeksCount}
        progress={progressMap[tab]}
        milestones={milestones}
      />

      {/* === the SessionCard wrapper (CSS classes inside SessionCard are untouched) === */}
      <div className="tab-panels">
        <SessionCard session={sessions[tab]} showButtons={false}>
          <Link to={sessions[tab].symLink}>
            <button className="ex-enroll-btn">Enroll Now</button>
          </Link>
        </SessionCard>
      </div>
    </div>
  )
}
