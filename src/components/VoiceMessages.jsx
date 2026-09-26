import { useEffect, useRef, useState } from 'react'
import { Mic2, Pause, Play, Volume2 } from 'lucide-react'
import { birthdayData } from '../data/birthdayData'
import './voiceMessages.css'

export default function VoiceMessages() {
  const audioRefs = useRef([])
  const [active, setActive] = useState(null)
  const [unavailable, setUnavailable] = useState([])

  useEffect(() => {
    const stopForMusic = () => {
      audioRefs.current.forEach((audio) => audio?.pause())
      window.speechSynthesis?.cancel()
      setActive(null)
    }
    window.addEventListener('panda:music-start', stopForMusic)
    return () => {
      window.removeEventListener('panda:music-start', stopForMusic)
      audioRefs.current.forEach((audio) => audio?.pause())
      window.speechSynthesis?.cancel()
    }
  }, [])

  const toggleVoice = async (index) => {
    const selected = audioRefs.current[index]
    if (!selected) return
    const voice = birthdayData.voiceMessages[index]
    if (unavailable.includes(index)) {
      if (!('speechSynthesis' in window)) return
      if (active === index) { window.speechSynthesis.cancel(); setActive(null); return }
      audioRefs.current.forEach((audio) => audio?.pause())
      window.speechSynthesis.cancel()
      window.dispatchEvent(new Event('panda:voice-start'))
      const message = new SpeechSynthesisUtterance(voice.sampleText)
      message.rate = 0.92
      message.pitch = 1.05
      message.onend = () => setActive(null)
      message.onerror = () => setActive(null)
      setActive(index)
      window.speechSynthesis.speak(message)
      return
    }
    if (active === index && !selected.paused) { selected.pause(); setActive(null); return }

    audioRefs.current.forEach((audio, audioIndex) => {
      if (audioIndex !== index) { audio?.pause(); if (audio) audio.currentTime = 0 }
    })
    window.dispatchEvent(new Event('panda:voice-start'))
    try { await selected.play(); setActive(index) }
    catch { setUnavailable((current) => current.includes(index) ? current : [...current, index]); setActive(null) }
  }

  return <section className="voice-message-section">
    <header><p className="eyebrow"><Mic2 /> Voices for Ezhil</p><h2>Three people. Three birthday messages.</h2><p>Tap a voice to listen. Background music will pause automatically.</p></header>
    <div className="voice-card-grid">{birthdayData.voiceMessages.map((voice, index) => {
      const isActive = active === index
      const isUnavailable = unavailable.includes(index)
      return <article className={`voice-card glass ${isActive ? 'is-playing' : ''}`} key={`${voice.name}-${index}`}>
        <div className="voice-avatar"><span>{voice.name.trim().charAt(0) || '?'}</span><i /></div>
        <div className="voice-copy"><span>Voice {String(index + 1).padStart(2, '0')}</span><h3>{voice.name}</h3><p>{isUnavailable ? 'Sample browser voice • Add MP3 to replace' : voice.role}</p></div>
        <button type="button" className="voice-play" onClick={() => toggleVoice(index)} aria-label={`${isActive ? 'Pause' : 'Play'} voice message from ${voice.name}`}>{isActive ? <Pause /> : <Play />}</button>
        <div className="voice-wave" aria-hidden="true">{Array.from({ length: 18 }, (_, bar) => <i key={bar} />)}</div>
        <audio ref={(node) => { audioRefs.current[index] = node }} src={voice.audio} preload="metadata" onEnded={() => setActive(null)} onError={() => setUnavailable((current) => current.includes(index) ? current : [...current, index])} />
        {isActive && <div className="voice-playing-label"><Volume2 /> Playing now</div>}
      </article>
    })}</div>
    <p className="voice-file-note">Local voice messages for Perumal, Logu, and Sathish</p>
  </section>
}
