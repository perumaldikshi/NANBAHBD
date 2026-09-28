import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'

export default function MemoryCard({ memory, onOpen }) {
  const [failed, setFailed] = useState(false)
  const hasNoPhoto = memory.empty || !memory.image
  return <button className={`memory-card${hasNoPhoto ? ' memory-card-empty' : ''}`} onClick={hasNoPhoto ? undefined : onOpen} aria-label={hasNoPhoto ? `${memory.date}: No photos` : `Open ${memory.title}`} disabled={hasNoPhoto}>
    <div className="memory-image">{hasNoPhoto ? <div className="image-fallback"><ImageIcon/><span>No photos</span></div> : failed ? <div className="image-fallback"><ImageIcon/><span>Add {memory.image.split('/').pop()}</span></div> : <img src={memory.image} alt={`${memory.title}: ${memory.caption}`} loading="lazy" onError={() => setFailed(true)}/>}</div>
    <div className="memory-copy"><span>{memory.date}</span><h3>{memory.title}</h3><p>{memory.caption}</p></div>
  </button>
}
