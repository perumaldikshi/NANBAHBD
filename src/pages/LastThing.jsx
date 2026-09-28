import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import MemoryCard from '../components/MemoryCard'
import MemoryModal from '../components/MemoryModal'
import { birthdayData } from '../data/birthdayData'
import { useMissionProgress } from '../hooks/useMissionProgress'
import './lastThing.css'

export default function LastThing() {
  const navigate = useNavigate()
  const { update } = useMissionProgress()
  const [selected, setSelected] = useState(null)
  const finalMemories = ['2024', '2025', '2026']
    .map((year) => birthdayData.gallery.find((memory) => memory.date === year && memory.image))
    .filter(Boolean)

  const continueToFinal = () => {
    update({ lastThing: true })
    navigate('/final')
  }

  return (
    <PageTransition className="page last-thing-page">
      <header className="page-header">
        <p className="eyebrow">One last thing...</p>
        <h1>You made it.</h1>
        <p>Before the final surprise, here are a few moments worth seeing one more time.</p>
      </header>

      <section className="photo-reveal" aria-label="Final memory reveal">
        {finalMemories.map((memory, index) => (
          <div className={`reveal-photo reveal-${index}`} key={`${memory.title}-${index}`}>
            <MemoryCard memory={memory} onOpen={() => setSelected(memory)} />
          </div>
        ))}
      </section>

      <section className="last-thing-continue glass">
        <Sparkles aria-hidden="true" />
        <p className="eyebrow">Final mission ready</p>
        <h2>There is still one surprise waiting for you.</h2>
        <button type="button" className="primary" onClick={continueToFinal}>
          Continue to the final reveal <ArrowRight />
        </button>
      </section>

      {selected && <MemoryModal memory={selected} onClose={() => setSelected(null)} />}
    </PageTransition>
  )
}
