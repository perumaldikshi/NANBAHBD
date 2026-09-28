import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lightbulb, Check, Flower2, Heart } from 'lucide-react'
import PandaMascot from './PandaMascot'
import './puzzleCelebration.css'

export default function PuzzleCard({ puzzle, index, solved, onSolve }) {
  const [feedback, setFeedback] = useState('')
  const [hint, setHint] = useState(false)
  useEffect(() => {
    if (feedback !== 'correct') return undefined
    const timer = setTimeout(() => setFeedback(''), 2600)
    return () => clearTimeout(timer)
  }, [feedback])
  const choose = (choice) => {
    if (solved) return
    if (choice === puzzle.answer) { setFeedback('correct'); onSolve(index) }
    else setFeedback('wrong')
  }
  return <motion.article className={`puzzle-card glass ${solved ? 'solved' : ''}`} layout>
    <span className="puzzle-number">Memory file {String(index + 1).padStart(2,'0')}</span>
    <h2>{puzzle.question}</h2>
    <div className="answers">{puzzle.options.map((option, choice) => <button key={option} onClick={() => choose(choice)} disabled={solved}>{option}</button>)}</div>
    <div className="puzzle-actions"><button className="text-button" onClick={() => setHint(!hint)}><Lightbulb size={16}/> Hint</button></div>
    <AnimatePresence>{hint && <motion.p className="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{puzzle.hint}</motion.p>}</AnimatePresence>
    <AnimatePresence>{feedback === 'correct' && <motion.div className="panda-flower-celebration" initial={{ opacity: 0, x: 90, y: 20, scale: .7 }} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }} exit={{ opacity: 0, x: 45, scale: .85 }} transition={{ type: 'spring', stiffness: 190, damping: 17 }} aria-live="polite">
      <motion.div className="panda-flower-mascot" animate={{ rotate: [0, -4, 4, 0], y: [0, -5, 0] }} transition={{ duration: 1.1, repeat: 1 }}><PandaMascot variant="mini" label="Cute panda giving a flower" /></motion.div>
      <motion.div className="panda-flower" initial={{ scale: 0, rotate: -35 }} animate={{ scale: [0, 1.25, 1], rotate: [-35, 8, 0] }} transition={{ delay: .3, duration: .65 }}><Flower2 /><span>For you!</span></motion.div>
      <Heart className="panda-flower-heart heart-one" /><Heart className="panda-flower-heart heart-two" />
    </motion.div>}</AnimatePresence>
    {solved && <p className="success"><Check size={18}/> Memory unlocked <span>XP +100</span></p>}
    {feedback === 'wrong' && !solved && <p className="error">Not quite 😏 Try again.</p>}
  </motion.article>
}
