import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import PasswordLock from '../components/PasswordLock'
import { useMissionProgress } from '../hooks/useMissionProgress'
export default function Lock() {
  const navigate = useNavigate(); const { progress, update } = useMissionProgress()
  return <PageTransition className="page lock-page"><header className="page-header"><p className="eyebrow">Mission 03</p><h1>Final memory locked</h1><p>One last layer between you and the truth.</p></header><PasswordLock unlocked={progress.unlocked} onUnlock={() => update({ unlocked: true })}/>{progress.unlocked && <button className="primary" onClick={() => navigate('/letter')}>Read the letter <ArrowRight/></button>}</PageTransition>
}
