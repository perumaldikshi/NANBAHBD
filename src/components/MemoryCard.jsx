import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'

export default function MemoryCard({ memory, onOpen }) {
  const [failed, setFailed] = useState(false)
  return <button className="memory-card" onClick={onOpen} aria-label={`Open ${memory.title}`}>
    <div className="memory-image">{failed ? <div className="image-fallback"><ImageIcon/><span>Add {memory.image.split('/').pop()}</span></div> : <img src={memory.image} alt={`${memory.title}: ${memory.caption}`} loading="lazy" onError={() => setFailed(true)}/>}</div>
    <div className="memory-copy"><span>{memory.date}</span><h3>{memory.title}</h3><p>{memory.caption}</p></div>
  </button>
}
