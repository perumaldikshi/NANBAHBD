import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PandaMascot from './PandaMascot'
import './pandaRouteLoader.css'

export default function PandaRouteLoader() {
  const { pathname } = useLocation()
  const firstRender = useRef(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return undefined
    }

    setLoading(true)
    const timer = window.setTimeout(() => {
      setLoading(false)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [pathname])

  return <AnimatePresence>{loading && <motion.div className="panda-route-loader" role="status" aria-live="polite" aria-label="Loading the next section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
    <div className="loader-bamboo loader-bamboo-left" aria-hidden="true" />
    <div className="loader-bamboo loader-bamboo-right" aria-hidden="true" />
    <motion.div className="panda-loader-card" initial={{ y: 25, scale: 0.9 }} animate={{ y: 0, scale: 1 }} exit={{ y: -20, scale: 0.94 }}>
      <PandaMascot variant="loader" label="Cute panda loading the next section" />
      <p>Panda is opening the next memory...</p>
      <div className="panda-loading-dots" aria-hidden="true"><i /><i /><i /></div>
      <div className="panda-loading-track" aria-hidden="true"><motion.span initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3, ease: 'linear' }} /></div>
      <small>Please wait for 3 seconds 🐼</small>
    </motion.div>
  </motion.div>}</AnimatePresence>
}
