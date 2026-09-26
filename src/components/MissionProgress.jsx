export default function MissionProgress({ current, total }) {
  const percent = total ? Math.round(current / total * 100) : 0
  return <aside className="mission-progress glass" aria-label={`Mission ${percent}% complete`}>
    <div><span className="eyebrow">Mission progress</span><strong>{percent}%</strong></div>
    <div className="progress-track"><span style={{ width: `${percent}%` }}/></div>
    <small>Memories unlocked: {current} / {total}</small>
  </aside>
}
