import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, RotateCcw } from 'lucide-react'
import PandaMascot from './PandaMascot'
import './pandaRouteLoader.css'

const games = {
  '/mission': { title: 'Bamboo Dash', instruction: 'Collect five bamboo sticks for Panda Ezhil.', icon: '🎋', total: 5 },
  '/memories': { title: 'Panda Hide & Seek', instruction: 'Find the panda hiding inside the forest tiles.', icon: '🍃', total: 1, find: true },
  '/lock': { title: 'Paw Code', instruction: 'Tap the four panda paws in the correct order.', icon: '🐾', total: 4, sequence: true },
  '/letter': { title: 'Friendship Hearts', instruction: 'Collect five green hearts to open the letter.', icon: '💚', total: 5 },
  '/last-thing': { title: 'Leaf Cleanup', instruction: 'Help the panda clear six leaves from the path.', icon: '🍃', total: 6 },
  '/final': { title: 'Birthday Balloon Pop', instruction: 'Pop five green balloons to start Ezhil’s finale.', icon: '🎈', total: 5 },
}

export default function PandaRouteLoader() {
  const { pathname } = useLocation()
  const game = games[pathname]
  const [open, setOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [won, setWon] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wrong, setWrong] = useState(null)
  const hiddenPanda = useMemo(() => (pathname.length * 3) % 9, [pathname])

  useEffect(() => {
    if (!game) { setOpen(false); return undefined }
    setScore(0); setWon(false); setLoading(false); setWrong(null); setOpen(true)
    return undefined
  }, [pathname, game])

  const complete = () => {
    setWon(true)
    window.setTimeout(() => {
      setLoading(true)
    }, 800)
    window.setTimeout(() => {
      setOpen(false)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 3800)
  }

  const collect = () => {
    if (won) return
    const next = score + 1
    setScore(next)
    if (next >= game.total) complete()
  }

  const chooseTile = (index) => {
    if (index === hiddenPanda) { setScore(1); complete() }
    else { setWrong(index); window.setTimeout(() => setWrong(null), 450) }
  }

  const chooseSequence = (number) => {
    if (number === score + 1) collect()
    else { setWrong(number); setScore(0); window.setTimeout(() => setWrong(null), 450) }
  }

  if (!game) return null

  return <AnimatePresence>{open && <motion.div className="panda-game-gate" role="dialog" aria-modal="true" aria-labelledby="panda-game-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="game-fireflies" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    <motion.section className={`panda-game-card ${won ? 'game-won' : ''} ${loading ? 'route-is-loading' : ''}`} initial={{ scale: .88, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94, y: -20 }}>
      <div className="game-panda"><PandaMascot variant={loading ? 'loader' : won ? 'game-winner' : 'game-player'} label="Panda game guide" /></div>
      <p className="game-kicker">{loading ? 'Panda Route Loader' : 'Panda World Challenge'}</p>
      <h2 id="panda-game-title">{loading ? 'Opening next page...' : won ? 'You won!' : game.title}</h2>
      <p className="game-instruction">{loading ? 'Panda Ezhil is preparing your next adventure.' : won ? 'Amazing! Challenge completed successfully.' : game.instruction}</p>

      {!won && game.find && <div className="find-panda-grid">{Array.from({ length: 9 }, (_, index) => <motion.button type="button" key={index} className={wrong === index ? 'wrong-tile' : ''} onClick={() => chooseTile(index)} whileTap={{ scale: .88 }} aria-label={`Forest tile ${index + 1}`}>{wrong === index ? '🌿' : '🍃'}</motion.button>)}</div>}

      {!won && game.sequence && <div className="paw-sequence">{[1, 2, 3, 4].map((number) => <motion.button type="button" key={number} className={`${number <= score ? 'done' : ''} ${wrong === number ? 'wrong-tile' : ''}`} onClick={() => chooseSequence(number)} whileTap={{ scale: .85 }}><span>🐾</span><small>{number}</small></motion.button>)}</div>}

      {!won && !game.find && !game.sequence && <div className="collect-game">{Array.from({ length: game.total }, (_, index) => <motion.button type="button" key={`${pathname}-${index}`} className={index < score ? 'collected' : ''} onClick={index === score ? collect : undefined} disabled={index !== score} initial={{ y: -8 }} animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }} transition={{ duration: 1.5, delay: index * .12, repeat: Infinity }} aria-label={`Collect item ${index + 1}`}>{index < score ? <Check /> : game.icon}</motion.button>)}</div>}

      {!loading && <div className="game-progress"><div><motion.span animate={{ width: `${(score / game.total) * 100}%` }} /></div><strong>{score} / {game.total}</strong></div>}
      {game.sequence && !won && score > 0 && <button type="button" className="game-reset" onClick={() => setScore(0)}><RotateCcw /> Reset sequence</button>}
      {won && !loading && <motion.div className="win-check" initial={{ scale: 0 }} animate={{ scale: 1 }}><Check /></motion.div>}
      {loading && <div className="post-game-loader" role="status"><div className="post-game-dots"><i /><i /><i /></div><div className="post-game-track"><motion.span initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3, ease: 'linear' }} /></div><small>Loading Panda World • 3 seconds</small></div>}
    </motion.section>
  </motion.div>}</AnimatePresence>
}
