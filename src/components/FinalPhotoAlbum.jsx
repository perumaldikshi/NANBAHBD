import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, Gift, Sparkles, X } from 'lucide-react'
import { birthdayData } from '../data/birthdayData'
import './finalPhotoAlbum.css'

export default function FinalPhotoAlbum() {
  const [stage, setStage] = useState('locked')
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const touchStart = useRef(null)
  const memory = birthdayData.albumMemories[page]
  const totalPages = birthdayData.albumMemories.length

  useEffect(() => {
    if (stage !== 'album') return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event) => {
      if (event.key === 'ArrowLeft') previousPage()
      if (event.key === 'ArrowRight') nextPage()
      if (event.key === 'Escape') setStage('locked')
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [stage])

  const nextPage = () => { setDirection(1); setPage((current) => Math.min(totalPages - 1, current + 1)) }
  const previousPage = () => { setDirection(-1); setPage((current) => Math.max(0, current - 1)) }
  const openPage = (index) => { setDirection(index >= page ? 1 : -1); setPage(index) }

  return <section className="special-album-section">
    <header><p className="eyebrow"><Gift /> Special gift for Ezhil</p><h2>Our friendship album.</h2><p>Open all fifteen pages of memories collected especially for you.</p></header>
    {stage === 'locked' && <motion.button type="button" className="special-gift-button" onClick={() => setStage('album')} whileHover={{ y: -5 }} whileTap={{ scale: .97 }}><span><BookOpen /></span><div><small>15 memory pages</small><strong>Open the friendship album</strong></div><Sparkles /></motion.button>}

    <AnimatePresence>{stage === 'album' && createPortal(<motion.div className="album-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="album-toolbar"><div><BookOpen /><span>Ezhil’s Friendship Album</span></div><button type="button" onClick={() => setStage('locked')} aria-label="Close photo album"><X /></button></div>
      <div className="album-book-shell" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; touchStart.current = null; if (Math.abs(distance) < 45) return; if (distance < 0) nextPage(); else previousPage() }}>
        <button type="button" className="album-arrow album-arrow-left" onClick={previousPage} disabled={page === 0} aria-label="Previous album page"><ArrowLeft /></button>
        <div className="album-page-stack">
        <AnimatePresence mode="sync" initial={false} custom={direction}>
        <motion.article className={`album-page flip-${direction > 0 ? 'forward' : 'backward'}`} key={page} custom={direction} initial={{ opacity: 1, rotateY: 0 }} animate={{ opacity: 1, rotateY: 0, zIndex: 1 }} exit={{ opacity: [1, 1, .92], rotateY: direction > 0 ? -178 : 178, zIndex: 5, boxShadow: ['25px 30px 80px rgba(0,0,0,.65)', direction > 0 ? '-35px 25px 65px rgba(0,0,0,.7)' : '35px 25px 65px rgba(0,0,0,.7)', '0 12px 30px rgba(0,0,0,.25)'] }} transition={{ duration: 1.05, ease: [0.45, 0, 0.2, 1] }}>
          <div className="album-binding" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div>
          <div className="album-photo-frame"><img src={memory.image} alt={`${memory.title}: ${memory.caption}`} loading="lazy" /><span>🐾</span></div>
          <div className="album-page-copy"><span>{memory.date}</span><h3>{memory.title}</h3><p>{memory.caption}</p></div>
          <div className="album-page-number">PAGE {String(page + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</div>
        </motion.article>
        </AnimatePresence>
        </div>
        <button type="button" className="album-arrow album-arrow-right" onClick={nextPage} disabled={page === totalPages - 1} aria-label="Next album page"><ArrowRight /></button>
      </div>
      <div className="album-thumbnails">{birthdayData.albumMemories.map((item, index) => <button type="button" className={page === index ? 'active' : ''} key={item.title} onClick={() => openPage(index)} aria-label={`Open album page ${index + 1}`}>{index + 1}</button>)}</div>
    </motion.div>, document.body)}</AnimatePresence>
  </section>
}
