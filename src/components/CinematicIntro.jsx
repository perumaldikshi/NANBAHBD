import { motion } from 'framer-motion'
import { ArrowRight, PartyPopper, QrCode, Sparkles } from 'lucide-react'
import { birthdayData } from '../data/birthdayData'
import PandaMascot from './PandaMascot'
import './cinematicIntro.css'
import './pandaCinema.css'

export default function CinematicIntro({ ready, onEnter, onQr }) {
  return (
    <section className={`cinema-intro ${ready ? 'is-ready' : ''}`} aria-label="Birthday mission cinematic introduction">
      <div className="cinema-grain" aria-hidden="true" />
      <div className="panda-moon" aria-hidden="true">🐼</div>
      <div className="panda-paw-trail" aria-hidden="true"><span>●</span><span>●</span><span>●</span><span>●</span></div>
      <div className="cinema-spotlight cinema-spotlight-left" aria-hidden="true" />
      <div className="cinema-spotlight cinema-spotlight-right" aria-hidden="true" />
      <div className="cinema-curtain cinema-curtain-left" aria-hidden="true" />
      <div className="cinema-curtain cinema-curtain-right" aria-hidden="true" />
      <div className="birthday-confetti" aria-hidden="true">
        {Array.from({ length: 22 }, (_, index) => <i key={index} />)}
      </div>
      <div className="balloon balloon-violet" aria-hidden="true"><span /></div>
      <div className="balloon balloon-gold" aria-hidden="true"><span /></div>
      <div className="balloon balloon-blue" aria-hidden="true"><span /></div>
      <div className="bamboo bamboo-left" aria-hidden="true" />
      <div className="bamboo bamboo-right" aria-hidden="true" />

      <motion.div
        className="cinema-stage"
        initial={{ opacity: 0, scale: 0.86, rotateX: 12 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="stage-panda-ear stage-panda-ear-left" aria-hidden="true" />
        <div className="stage-panda-ear stage-panda-ear-right" aria-hidden="true" />
        <div className="marquee-bulbs marquee-bulbs-top" aria-hidden="true" />
        <div className="marquee-bulbs marquee-bulbs-bottom" aria-hidden="true" />

        <motion.div
          className="panda-intro-mascot"
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          <PandaMascot variant="loader" label="Cute birthday panda loading the surprise" />
        </motion.div>

        <motion.p className="cinema-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          🐾 Panda birthday cinema • 29.09.2026 🐾
        </motion.p>

        <motion.div
          className="cinema-title-wrap"
          initial={{ opacity: 0, z: -180, rotateX: 18 }}
          animate={{ opacity: 1, z: 0, rotateX: 0 }}
          transition={{ delay: 0.65, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="cinema-presents"><PartyPopper aria-hidden="true" /> The cutest panda premiere</span>
          <h1 data-title={birthdayData.name}>{birthdayData.name}</h1>
          <p>A friendship celebration, approved by pandas</p>
        </motion.div>

        <div className="cinema-status" aria-live="polite">
          <span className="cinema-status-dot" />
          {ready ? 'Panda surprise ready' : 'Panda is packing your surprise...'}
        </div>

        <motion.div className="cinema-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 18 }} transition={{ duration: 0.55 }}>
          <button type="button" className="cinema-enter" onClick={onEnter} disabled={!ready}>
            <Sparkles aria-hidden="true" />
            Start the celebration
            <ArrowRight aria-hidden="true" />
          </button>
          <button type="button" className="cinema-qr" onClick={onQr} disabled={!ready}>
            <QrCode aria-hidden="true" /> QR code
          </button>
        </motion.div>

        <p className="cinema-credit">Bamboo • Memories • Laughter • One unforgettable panda birthday</p>
      </motion.div>

      <div className="film-strip film-strip-left" aria-hidden="true" />
      <div className="film-strip film-strip-right" aria-hidden="true" />
      <div className="cinema-floor" aria-hidden="true" />
    </section>
  )
}
