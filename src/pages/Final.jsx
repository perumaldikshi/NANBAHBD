import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ChevronRight, Crown, Home, Images, Infinity as InfinityIcon, Leaf, Sparkles, Star } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import GiftReveal from '../components/GiftReveal'
import PandaMascot from '../components/PandaMascot'
import FinalPhotoAlbum from '../components/FinalPhotoAlbum'
import { birthdayData } from '../data/birthdayData'
import { useMissionProgress } from '../hooks/useMissionProgress'
import './finalPremium.css'

const ezhilHighlights = [
  { icon: Check, title: 'Always Genuine', text: 'The kind of person who never needs to pretend.' },
  { icon: Images, title: 'Memory Maker', text: 'Someone who turns ordinary moments into stories.' },
  { icon: Crown, title: 'One of a Kind', text: 'There is only one Ezhil — and that is the best part.' },
  { icon: InfinityIcon, title: 'Forever Friend', text: 'A friendship worth carrying into every new chapter.' },
]

export default function Final() {
  const { progress, update } = useMissionProgress()
  return <PageTransition className="page final-page premium-final">
    <section className="final-hero">
      <div className="final-orbit" aria-hidden="true"><i /><i /><i /></div>
      <motion.div className="final-panda" initial={{ opacity: 0, y: 30, scale: .86 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .8 }}><PandaMascot variant="final" label="Panda celebrating Ezhil's birthday" /></motion.div>
      <motion.div className="final-hero-copy" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .7 }}>
        <p className="eyebrow"><Sparkles /> 29 September 2026 • Your day</p>
        <h1>Happy Birthday,<br /><span>{birthdayData.name}!</span></h1>
        <p>Today is a celebration of you — your laughter, your kindness, your chaos, and all the little things that make you completely unforgettable.</p>
      </motion.div>
      <div className="final-scroll-cue"><span>Your birthday story</span><ChevronRight /></div>
    </section>

    <section className="completion-dashboard glass">
      <div className="completion-ring" style={{ position: 'relative' }} aria-label="Ezhil birthday date 29 September 2026"><div><strong>29</strong><span>SEP</span><small>2026</small></div></div>
      <div className="completion-copy"><p className="eyebrow">A day made for Ezhil</p><h2>Today, the spotlight belongs to you.</h2><p>I hope this birthday brings you the same happiness you bring into other people’s lives. May the coming year be filled with good surprises, peaceful days, loud laughter, and memories you will always want to keep.</p><div className="completion-metrics"><span><strong>365</strong> New days waiting</span><span><strong>∞</strong> Reasons to smile</span><span><strong>Forever</strong> Best-friend support</span></div></div>
    </section>

    <section className="achievement-section">
      <header><p className="eyebrow">What makes Ezhil special</p><h2>Four things worth celebrating.</h2></header>
      <div className="achievement-grid">{ezhilHighlights.map(({ icon: Icon, title, text }, index) => <motion.article className="achievement-card glass" key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }}><div className="achievement-icon"><Icon /></div><span>That is Ezhil</span><h3>{title}</h3><p>{text}</p></motion.article>)}</div>
    </section>

    <section className="final-gift-stage">
      <div className="gift-stage-decoration" aria-hidden="true"><Leaf /><Star /><Leaf /></div>
      <p className="eyebrow">Ezhil’s birthday surprise</p>
      <GiftReveal alreadyOpen={progress.final} onOpen={() => update({ final: true })} />
    </section>

    <FinalPhotoAlbum />

    <section className="final-quote">
      <span aria-hidden="true">“</span>
      <blockquote>May this new year of your life bring you more reasons to laugh, more moments to remember, and every happiness you truly deserve.</blockquote>
      <p>Happy Birthday, Ezhil. Stay exactly who you are — the world needs that version of you. 🐼</p>
    </section>

    <nav className="final-actions" aria-label="Final page actions"><Link className="secondary" to="/memories"><Images /> Revisit Ezhil’s memories</Link><Link className="primary" to="/"><Home /> Return to Panda World</Link></nav>
    <footer className="final-footer"><PandaMascot variant="mini" /><p>Made especially for Ezhil, with memories, friendship, and a little panda magic.</p><span>HAPPY BIRTHDAY EZHIL • 29.09.2026</span></footer>
  </PageTransition>
}
