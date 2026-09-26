import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, HeartHandshake, Laugh, ShieldCheck, Sparkles } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import MissionProgress from '../components/MissionProgress'
import PuzzleCard from '../components/PuzzleCard'
import { birthdayData } from '../data/birthdayData'
import { useMissionProgress } from '../hooks/useMissionProgress'
import { fadeUp } from '../animations'
import './friendship.css'

const reasonIcons = [HeartHandshake, Sparkles, ShieldCheck, Laugh]

export default function Mission() {
  const navigate = useNavigate()
  const { progress, update } = useMissionProgress()
  const solved = progress.puzzles || []
  const solve = (index) => {
    if (!solved.includes(index)) update({ puzzles: [...solved, index] })
  }
  const complete = solved.length === birthdayData.puzzles.length

  return (
    <PageTransition className="page">
      <header className="page-header">
        <p className="eyebrow">Friendship mission 01</p>
        <h1>Our kind of friendship</h1>
        <p>Not perfect. Not normal. But always real.</p>
      </header>
      <MissionProgress current={solved.length} total={birthdayData.puzzles.length} />

      <section className="intro-copy glass">
        {birthdayData.intro.map((line) => <p key={line}>{line}</p>)}
        <strong>Ready?</strong>
      </section>

      <section className="friendship-stats" aria-label="Friendship statistics">
        {birthdayData.friendshipStats.map((stat) => <article className="friendship-stat glass" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></article>)}
      </section>

      <section className="why-section">
        <div className="why-heading"><p className="eyebrow">Why you matter</p><h2>Things that make this friendship special.</h2></div>
        <div className="reason-grid">
          {birthdayData.friendshipReasons.map((reason, index) => {
            const Icon = reasonIcons[index % reasonIcons.length]
            return <article className="reason-card glass" key={reason.title}><Icon /><h3>{reason.title}</h3><p>{reason.text}</p></article>
          })}
        </div>
      </section>

      <section className="friendship-promise glass">
        <HeartHandshake />
        <p className="eyebrow">The friendship promise</p>
        <blockquote>{birthdayData.friendshipPromise}</blockquote>
        <span>Best Friend Access: Lifetime • No cancellation • No replacement</span>
      </section>

      <div className="memory-test-heading"><p className="eyebrow">The memory test</p><h2>How well do you remember us?</h2></div>
      <section className="puzzle-list">{birthdayData.puzzles.map((puzzle, index) => <PuzzleCard key={`${puzzle.question}-${index}`} puzzle={puzzle} index={index} solved={solved.includes(index)} onSolve={solve} />)}</section>

      {complete && <motion.section className="completion glass" variants={fadeUp} initial="hidden" animate="visible"><CheckCircle2 /><p>All memories verified</p><button type="button" className="primary" onClick={() => { update({ archive: true }); navigate('/memories') }}>Open our memory archive <ArrowRight /></button></motion.section>}
    </PageTransition>
  )
}
