import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Gift, MapPin, Clock3, TicketCheck } from 'lucide-react'
import { birthdayData } from '../data/birthdayData'

export default function GiftReveal({ alreadyOpen, onOpen }) {
  const [open, setOpen] = useState(alreadyOpen)
  const reveal = () => {
    setOpen(true)
    onOpen()
    const end = Date.now() + 1300
    const fire = () => {
      confetti({ particleCount: 35, spread: 65, startVelocity: 38, origin: { x: Math.random(), y: 0.65 }, colors: ['#174f35', '#39775c', '#5fb48f', '#8ee8c2', '#dfffee'], disableForReducedMotion: true, scalar: 0.9 })
      if (Date.now() < end) requestAnimationFrame(fire)
    }
    fire()
  }

  return <div className={`gift-reveal ${open ? 'open' : ''}`}>
    <motion.div className="gift-icon" animate={open ? { rotate: [0, -8, 8, 0], scale: [1, 1.25, 1] } : { y: [0, -12, 0] }} transition={{ duration: open ? 0.6 : 2, repeat: open ? 0 : Infinity }}><Gift /></motion.div>
    {!open ? <><h2>One birthday surprise is waiting for Ezhil 🐼</h2><p>A final little celebration made especially for you.</p><button type="button" className="primary" onClick={reveal}>Open Ezhil’s birthday surprise</button></> : <motion.div className="reveal-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <p className="celebration">🐼 Happy Birthday {birthdayData.name} 🐼</p>
      <h2>This day belongs to you, Ezhil!</h2>
      <p>May your year be filled with happiness, laughter, success, and unforgettable memories.</p>
      <p>Keep smiling. Keep being wonderfully you.</p>
      <div className="gift-details glass"><h3>Ezhil’s birthday message</h3><p><Gift />{birthdayData.gift.message}</p><p><MapPin />{birthdayData.gift.location}</p><p><Clock3 />{birthdayData.gift.time}</p><p><TicketCheck /><strong>{birthdayData.gift.code}</strong></p></div>
    </motion.div>}
  </div>
}
