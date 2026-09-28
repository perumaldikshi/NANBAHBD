import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Check, Leaf, Search, Sparkles } from 'lucide-react'
import PandaMascot from './PandaMascot'
import './findThePanda.css'

const totalSpots = 50
const pandaSpots = new Set([2, 6, 11, 17, 23, 28, 34, 39, 44, 48])

export default function FindThePanda({ onComplete }) {
  const [opened, setOpened] = useState(new Set())
  const [found, setFound] = useState(new Set())
  const complete = found.size === pandaSpots.size

  useEffect(() => {
    if (!complete || !onComplete) return undefined
    const timer = setTimeout(onComplete, 900)
    return () => clearTimeout(timer)
  }, [complete, onComplete])

  const revealSpot = (index) => {
    if (opened.has(index)) return
    setOpened(new Set(opened).add(index))
    if (!pandaSpots.has(index)) return

    const nextFound = new Set(found).add(index)
    setFound(nextFound)
    confetti({ particleCount: nextFound.size === pandaSpots.size ? 140 : 35, spread: nextFound.size === pandaSpots.size ? 100 : 55, origin: { y: .65 }, colors: ['#8ee8c2', '#ffffff', '#e9bd65'], disableForReducedMotion: true })
  }

  return <section className={`panda-hunt ${complete ? 'is-complete' : ''}`}>
    <header><p className="eyebrow"><Search /> Mini mission</p><h2>Find the ten pandas.</h2><p>Ten pandas are hiding across 50 bamboo spots. Find them all to open the birthday intro.</p>
      <div className="panda-hunt-progress" aria-live="polite">{Array.from({ length: pandaSpots.size }, (_, index) => <span className={index < found.size ? 'found' : ''} key={index}>{index < found.size ? <Check /> : '?'}</span>)}<strong>{found.size} / {pandaSpots.size} found</strong></div>
    </header>
    <div className="panda-hunt-grid">{Array.from({ length: totalSpots }, (_, index) => {
      const isOpen = opened.has(index)
      const hasPanda = pandaSpots.has(index)
      return <motion.button type="button" className={`panda-spot ${isOpen ? 'is-open' : ''} ${isOpen && hasPanda ? 'has-panda' : ''}`} key={index} onClick={() => revealSpot(index)} whileTap={{ scale: .96 }} aria-label={isOpen ? (hasPanda ? 'Panda found' : 'Empty hiding spot') : `Check hiding spot ${index + 1}`}>
        <span className="panda-spot-number">{String(index + 1).padStart(2, '0')}</span>
        {isOpen ? (hasPanda ? <PandaMascot variant="mini" label="Hidden panda found" /> : <span className="empty-spot"><Leaf />Not here!</span>) : <span className="bamboo-cover"><Leaf /><Leaf /><Leaf /><i>Tap to search</i></span>}
      </motion.button>
    })}</div>
    {complete && <motion.div className="panda-hunt-success glass" initial={{ opacity: 0, y: 20, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }}><Sparkles /><div><strong>All pandas found!</strong><span>Secret panda squad unlocked.</span></div></motion.div>}
  </section>
}
