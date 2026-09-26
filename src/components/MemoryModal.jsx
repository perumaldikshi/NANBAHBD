import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Image as ImageIcon } from 'lucide-react'
export default function MemoryModal({ memory, onClose }) {
  const [failed, setFailed] = useState(false)
  useEffect(() => { const close = (e) => e.key === 'Escape' && onClose(); addEventListener('keydown', close); return () => removeEventListener('keydown', close) }, [onClose])
  return <motion.div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={memory.title} onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.div className="memory-modal glass" onClick={(e) => e.stopPropagation()} initial={{ scale: .94 }} animate={{ scale: 1 }}>
      <button className="icon-button modal-close" onClick={onClose} aria-label="Close memory"><X/></button>
      {failed ? <div className="image-fallback tall"><ImageIcon/><span>Your memory belongs here</span></div> : <img src={memory.image} alt={memory.caption} onError={() => setFailed(true)}/>} 
      <div><span className="eyebrow">{memory.date}</span><h2>{memory.title}</h2><p>{memory.caption}</p></div>
    </motion.div>
  </motion.div>
}
