import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { birthdayData } from '../data/birthdayData'
import { useMissionProgress } from '../hooks/useMissionProgress'
export default function SoundToggle() {
  const { progress, update } = useMissionProgress(); const audio = useRef(null); const [available, setAvailable] = useState(true)
  useEffect(() => () => audio.current?.pause(), [])
  const toggle = async () => {
    if (!available) return
    if (!audio.current) { audio.current = new Audio(birthdayData.musicPath); audio.current.loop = true; audio.current.addEventListener('error', () => { setAvailable(false); update({ sound: false }) }) }
    if (progress.sound) { audio.current.pause(); update({ sound: false }) } else { try { await audio.current.play(); update({ sound: true }) } catch { setAvailable(false); update({ sound: false }) } }
  }
  return <button className="sound-toggle" onClick={toggle} aria-label={available ? `Turn music ${progress.sound ? 'off' : 'on'}` : 'Music file unavailable'} title={!available ? 'Birthday music is unavailable' : 'Play birthday music'}>{progress.sound ? <Volume2/> : <VolumeX/>}<span>{available ? `Music ${progress.sound ? 'on' : 'off'}` : 'No audio'}</span></button>
}
