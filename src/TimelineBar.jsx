import React, { useEffect, useState } from 'react'
import './timeline.css'

export default function TimelineBar({
  label = 'WITH FORMULABI LABS',
  milestones = [],
  progress = 0,
  weeksCount = 7
}) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const [stripCount, setStripCount] = useState(30)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const update = () => {
      const w = window.innerWidth
      setStripCount(w < 500 ? 25 : w < 1024 ? 30 : 50)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    let cur = 0
    const iv = setInterval(() => {
      cur += 1
      if (cur >= progress) {
        clearInterval(iv)
        setAnimatedProgress(progress)
      } else {
        setAnimatedProgress(cur)
      }
    }, 10)
    return () => clearInterval(iv)
  }, [progress])

  const getPct = (ms) =>
    ms.week != null ? (ms.week / (weeksCount + 1)) * 100 : 0

  // assume first milestone is Kick-off
  const kickoff = milestones[0]

  return (
    <div className="timeline-container">
      <div className="timeline-label">{label} BECOME BEGINNER TO PROFICIENT IN 7 WEEKS</div>

      <div className="timeline-bar">
        {/* Kick-off box at start */}
        {kickoff && (
          <div className="kickoff-box">
            Kick Off
          </div>
        )}

        {/* Thin, evenly-spaced strips */}
        <div className="timeline-bar-strips">
          {Array.from({ length: stripCount }).map((_, i) => {
            const pct = ((i + 1) / stripCount) * 100
            const filled = pct <= animatedProgress
            return (
              <div
                key={i}
                className={`timeline-strip ${filled ? 'strip-filled' : ''}`}
                style={{ animationDelay: `${i * 30}ms` }}
              />
            )
          })}
        </div>

        {/* Week ticks */}
        <div className="timeline-ruler">
          {Array.from({ length: weeksCount }).map((_, i) => (
            <div
              key={i}
              className="tick-mark"
              style={{ left: `${((i + 1) / (weeksCount + 1)) * 98}%` }}
            >
              <div className="tick-line" />
              <div className="tick-label">{`Week ${i + 1}`}</div>
            </div>
          ))}
        </div>

        {/* Triangle milestone */}
        <div className="timeline-ruler-dots">
          {milestones.map((ms, i) => {
            const pct = getPct(ms)
            const filled = pct <= animatedProgress
            return (
              <div
                key={i}
                className={`milestone-triangle ${filled ? 'filled' : ''}`}
                style={{ left: `${pct}%` }}
              >
                <div className="tooltip">
                  {ms.label}<br/>Week {ms.week}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
