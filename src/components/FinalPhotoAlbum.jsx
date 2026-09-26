import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, Check, Gift, Sparkles, X } from 'lucide-react'
import PandaMascot from './PandaMascot'
import { birthdayData } from '../data/birthdayData'
import './finalPhotoAlbum.css'

export default function FinalPhotoAlbum() {
  const [stage, setStage] = useState('locked')
  const [score, setScore] = useState(0)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const memory = birthdayData.albumMemories[page]

  const collect = () => {
    const next = score + 1
    setScore(next)
    if (next === 5) window.setTimeout(() => setStage('album'), 650)
  }

  const nextPage = () => { setDirection(1); setPage((current) => Math.min(birthdayData.albumMemories.length - 1, current + 1)) }
  const previousPage = () => { setDirection(-1); setPage((current) => Math.max(0, current - 1)) }
  const openPage = (index) => { setDirection(index >= page ? 1 : -1); setPage(index) }

  return <section className="special-album-section">
    <header><p className="eyebrow"><Gift /> Special gift for Ezhil</p><h2>One more surprise is waiting.</h2><p>Win a tiny panda game to unlock a twenty-page friendship album.</p></header>
    {stage === 'locked' && <motion.button type="button" className="special-gift-button" onClick={() => setStage('game')} whileHover={{ y: -5 }} whileTap={{ scale: .97 }}><span><Gift /></span><div><small>Tap to unlock</small><strong>Open the special gift</strong></div><Sparkles /></motion.button>}

    <AnimatePresence>{stage === 'game' && <motion.div className="album-game-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="album-game-card" initial={{ scale: .88, y: 30 }} animate={{ scale: 1, y: 0 }}>
        <button type="button" className="album-close" onClick={() => { setStage('locked'); setScore(0) }} aria-label="Close album game"><X /></button>
        <PandaMascot variant="album-game" label="Panda guarding the special album" />
        <p className="eyebrow">Special gift challenge</p><h3>{score === 5 ? 'Album unlocked!' : 'Collect five memory leaves'}</h3><p>Help Panda Ezhil collect every glowing leaf.</p>
        <div className="album-leaf-game">{Array.from({ length: 5 }, (_, index) => <motion.button type="button" key={index} disabled={index !== score} className={index < score ? 'collected' : ''} onClick={collect} animate={index === score ? { y: [0, -10, 0], rotate: [0, 8, -8, 0] } : {}} transition={{ repeat: Infinity, duration: 1.3 }}>{index < score ? <Check /> : '🍃'}</motion.button>)}</div>
        <div className="album-game-progress"><motion.span animate={{ width: `${(score / 5) * 100}%` }} /></div><small>{score} / 5 leaves collected</small>
      </motion.div>
    </motion.div>}</AnimatePresence>

    <AnimatePresence>{stage === 'album' && <motion.div className="album-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="album-toolbar"><div><BookOpen /><span>Ezhil’s Friendship Album</span></div><button type="button" onClick={() => setStage('locked')} aria-label="Close photo album"><X /></button></div>
      <div className="album-book-shell">
        <button type="button" className="album-arrow album-arrow-left" onClick={previousPage} disabled={page === 0} aria-label="Previous album page"><ArrowLeft /></button>
        <div className="album-page-stack">
        <AnimatePresence mode="sync" initial={false} custom={direction}>
        <motion.article className={`album-page flip-${direction > 0 ? 'forward' : 'backward'}`} key={page} custom={direction} initial={{ opacity: 1, rotateY: 0 }} animate={{ opacity: 1, rotateY: 0, zIndex: 1 }} exit={{ opacity: [1, 1, .92], rotateY: direction > 0 ? -178 : 178, zIndex: 5, boxShadow: ['25px 30px 80px rgba(0,0,0,.65)', direction > 0 ? '-35px 25px 65px rgba(0,0,0,.7)' : '35px 25px 65px rgba(0,0,0,.7)', '0 12px 30px rgba(0,0,0,.25)'] }} transition={{ duration: 1.05, ease: [0.45, 0, 0.2, 1] }}>
          <div className="album-binding" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div>
          <div className="album-photo-frame"><img src={memory.image} alt={`${memory.title}: ${memory.caption}`} loading="lazy" /><span>🐾</span></div>
          <div className="album-page-copy"><span>{memory.date}</span><h3>{memory.title}</h3><p>{memory.caption}</p></div>
          <div className="album-page-number">PAGE {String(page + 1).padStart(2, '0')} / 20</div>
        </motion.article>
        </AnimatePresence>
        </div>
        <button type="button" className="album-arrow album-arrow-right" onClick={nextPage} disabled={page === birthdayData.albumMemories.length - 1} aria-label="Next album page"><ArrowRight /></button>
      </div>
      <div className="album-thumbnails">{birthdayData.albumMemories.map((item, index) => <button type="button" className={page === index ? 'active' : ''} key={item.title} onClick={() => openPage(index)} aria-label={`Open album page ${index + 1}`}>{index + 1}</button>)}</div>
    </motion.div>}</AnimatePresence>
  </section>
}
