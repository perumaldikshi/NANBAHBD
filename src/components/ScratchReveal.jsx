import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import './scratchReveal.css'

export default function ScratchReveal({ onReveal }) {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const moves = useRef(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return undefined

    const paint = () => {
      const rect = host.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(rect.width * ratio))
      canvas.height = Math.max(1, Math.round(rect.height * ratio))
      const context = canvas.getContext('2d')
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const gradient = context.createLinearGradient(0, 0, rect.width, rect.height)
      gradient.addColorStop(0, '#173f2d')
      gradient.addColorStop(.5, '#8ee8c2')
      gradient.addColorStop(1, '#245c42')
      context.fillStyle = gradient
      context.fillRect(0, 0, rect.width, rect.height)
      context.fillStyle = 'rgba(255,255,255,.16)'
      for (let x = -rect.height; x < rect.width; x += 34) context.fillRect(x, 0, 9, rect.height)
    }

    paint()
    const observer = new ResizeObserver(paint)
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  const scratch = (event) => {
    if (!drawing.current || revealed) return
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ratio = canvas.width / rect.width
    const context = canvas.getContext('2d')
    context.save()
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    context.globalCompositeOperation = 'destination-out'
    context.beginPath()
    context.arc(event.clientX - rect.left, event.clientY - rect.top, Math.max(24, rect.width * .09), 0, Math.PI * 2)
    context.fill()
    context.restore()

    moves.current += 1
    if (moves.current % 10 !== 0) return
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
    let clear = 0
    for (let index = 3; index < pixels.length; index += 40) if (pixels[index] < 40) clear += 1
    if (clear / (pixels.length / 40) > .38) {
      setRevealed(true)
      onReveal?.()
    }
  }

  return <div className={`scratch-layer ${revealed ? 'is-revealed' : ''}`}>
    <canvas ref={canvasRef} onPointerDown={(event) => { drawing.current = true; event.currentTarget.setPointerCapture(event.pointerId); scratch(event) }} onPointerMove={scratch} onPointerUp={() => { drawing.current = false }} onPointerCancel={() => { drawing.current = false }} aria-label="Scratch to reveal this photo" />
    <div className="scratch-instruction" aria-hidden="true"><Sparkles /><strong>Scratch me</strong><span>Reveal the memory</span></div>
  </div>
}
