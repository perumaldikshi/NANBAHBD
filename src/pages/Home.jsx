import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Countdown from '../components/Countdown'
import CinematicIntro from '../components/CinematicIntro'
import { birthdayData } from '../data/birthdayData'
import { useMissionProgress } from '../hooks/useMissionProgress'
import { fadeUp, staggerChildren } from '../animations'
import './homeActions.css'

export default function Home() {
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()
  const { update } = useMissionProgress()
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 2200)
    return () => clearTimeout(id)
  }, [])
  const enter = () => {
    update({ entered: true })
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  return <PageTransition>
    <CinematicIntro ready={ready} onEnter={enter} />
    <section id="hero" className="hero section">
      <motion.div variants={staggerChildren} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.p variants={fadeUp} className="eyebrow">A friendship worth celebrating • 29.09.2026</motion.p>
        <motion.h1 variants={fadeUp}>Not all soulmates<br />are lovers.<span>Some become your <em>best friend.</em></span></motion.h1>
        <motion.p variants={fadeUp} className="hero-birthday">Happy Birthday, {birthdayData.name} <span>✦</span></motion.p>
        <motion.p variants={fadeUp} className="hero-friendship-line">This is not just a birthday page. It is a little reminder of every laugh, fight, joke, and memory that made this friendship ours.</motion.p>
        <motion.button type="button" variants={fadeUp} className="primary" onClick={() => navigate('/mission')}>Begin our story <ArrowRight /></motion.button>
      </motion.div>
    </section>
    <div className="content-wrap"><Countdown /></div>
  </PageTransition>
}
