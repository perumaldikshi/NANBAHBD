import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import MemoryCard from '../components/MemoryCard'
import MemoryModal from '../components/MemoryModal'
import Timeline from '../components/Timeline'
import { birthdayData } from '../data/birthdayData'
import { useMissionProgress } from '../hooks/useMissionProgress'
import './friendship.css'
export default function Memories() {
  const [selected, setSelected] = useState(null); const navigate = useNavigate(); const { update } = useMissionProgress()
  return <PageTransition className="page"><header className="page-header"><p className="eyebrow">Mission 02</p><h1>The archive</h1><p>A few moments worth keeping forever.</p></header>
    <section className="friendship-archive-intro glass"><p className="eyebrow">Our digital photo journal</p><h2>Photos fade. The stories behind them never do.</h2><p>Every photo here holds an inside joke, a conversation, or a moment that only we fully understand.</p></section>
    <section className="gallery">{birthdayData.gallery.map((memory) => <MemoryCard key={memory.title} memory={memory} onOpen={() => setSelected(memory)}/>)}</section>
    <section className="timeline-section"><p className="eyebrow">The story so far</p><h2>Every year, another chapter.</h2><Timeline items={birthdayData.timeline}/></section>
    <div className="center"><button className="primary" onClick={() => { update({ archive: true }); navigate('/lock') }}>Approach the final lock <ArrowRight/></button></div>
    <AnimatePresence>{selected && <MemoryModal memory={selected} onClose={() => setSelected(null)}/>}</AnimatePresence>
  </PageTransition>
}
