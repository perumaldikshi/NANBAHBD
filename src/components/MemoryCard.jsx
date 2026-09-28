import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import ScratchReveal from './ScratchReveal'

export default function MemoryCard({ memory, onOpen, scratchable = false }) {
  const [failed, setFailed] = useState(false)
  const [revealed, setRevealed] = useState(!scratchable)
  const hasNoPhoto = memory.empty || !memory.image
  return <button className={`memory-card${hasNoPhoto ? ' memory-card-empty' : ''}${revealed ? ' memory-card-revealed' : ''}`} onClick={hasNoPhoto || !revealed ? undefined : onOpen} aria-label={!revealed ? `Scratch to reveal ${memory.title}` : hasNoPhoto ? `${memory.date}: No photos` : `Open ${memory.title}`} disabled={hasNoPhoto && !scratchable}>
    <div className="memory-image">
      {hasNoPhoto ? <div className="image-fallback"><ImageIcon/><span>No photos</span></div> : failed ? <div className="image-fallback"><ImageIcon/><span>Add {memory.image.split('/').pop()}</span></div> : <img src={memory.image} alt={`${memory.title}: ${memory.caption}`} loading="lazy" onError={() => setFailed(true)}/>}
      {scratchable && <ScratchReveal onReveal={() => setRevealed(true)} />}
    </div>
    <div className="memory-copy"><span>{memory.date}</span><h3>{memory.title}</h3><p>{memory.caption}</p></div>
  </button>
}
