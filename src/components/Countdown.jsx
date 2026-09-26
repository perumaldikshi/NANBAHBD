import { AnimatePresence, motion } from 'framer-motion'
import { birthdayData } from '../data/birthdayData'
import { useCountdown } from '../hooks/useCountdown'

export default function Countdown() {
  const time = useCountdown(birthdayData.countdownDate)
  const message = time.state === 'before' ? 'Mission goes live in' : time.state === 'today' ? 'Today is the day 🎉' : 'The mission has been completed 🎉'
  return <section className="countdown glass" aria-label="Birthday countdown">
    <p className="eyebrow">{message}</p>
    <div className="countdown-grid">{['days','hours','minutes','seconds'].map((unit) => <div key={unit}>
      <AnimatePresence mode="popLayout"><motion.strong key={time[unit]} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>{String(time[unit]).padStart(2,'0')}</motion.strong></AnimatePresence>
      <span>{unit}</span>
    </div>)}</div>
  </section>
}
