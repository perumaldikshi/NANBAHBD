import { useLocation } from 'react-router-dom'
import PandaMascot, { PandaCompanion } from './PandaMascot'
import './pandaTheme.css'
import './pandaWorld.css'

const activityByPath = {
  '/': 'Welcome to Panda World!', '/mission': 'Panda is testing your memories', '/memories': 'Panda is exploring the archive', '/lock': 'Detective panda found a secret lock', '/letter': 'Panda is reading your friendship letter', '/last-thing': 'Panda found one last memory', '/final': 'Party panda is ready!', '/qr': 'Panda is preparing your access pass',
}

export default function PandaWorld() {
  const { pathname } = useLocation()
  return <>
    <div className="panda-world" aria-hidden="true">
      <div className="panda-paws" />
      <div className="panda-sky"><i /><i /><i /></div>
      <div className="panda-hills panda-hills-back" /><div className="panda-hills panda-hills-front" />
      <div className="world-bamboo world-bamboo-left" /><div className="world-bamboo world-bamboo-right" />
      <div className="panda-fireflies">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div>
      <div className="falling-leaves">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
      <div className="activity-panda activity-panda-eating"><span className="bamboo-snack" /><PandaMascot variant="world-eater" /></div>
      <div className="activity-panda activity-panda-sleeping"><span className="sleep-z">Z</span><PandaMascot variant="world-sleeper" /></div>
    </div>
    <div className="panda-activity-bubble" aria-hidden="true">{activityByPath[pathname] || 'Panda is exploring...'}</div>
    <PandaCompanion />
  </>
}
