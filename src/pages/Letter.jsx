import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import TypewriterText from '../components/TypewriterText'
import LetterPandaPlayground from '../components/LetterPandaPlayground'
import { birthdayData } from '../data/birthdayData'
import { useMissionProgress } from '../hooks/useMissionProgress'
export default function Letter() {
  const [done, setDone] = useState(false); const { update } = useMissionProgress()
  const finishLetter = () => { setDone(true); update({ letter: true }) }
  return <PageTransition className="page letter-page"><header className="page-header"><p className="eyebrow">Mission complete</p><h1>A note for you.</h1></header><section className="letter glass"><TypewriterText lines={birthdayData.finalLetter} onComplete={finishLetter}/></section><LetterPandaPlayground/>{done && <Link className="primary" to="/last-thing" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>One last thing <ArrowRight/></Link>}</PageTransition>
}
