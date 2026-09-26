import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lightbulb, Check } from 'lucide-react'

export default function PuzzleCard({ puzzle, index, solved, onSolve }) {
  const [feedback, setFeedback] = useState('')
  const [hint, setHint] = useState(false)
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
    {solved && <p className="success"><Check size={18}/> Memory unlocked <span>XP +100</span></p>}
    {feedback === 'wrong' && !solved && <p className="error">Not quite 😏 Try again.</p>}
  </motion.article>
}
