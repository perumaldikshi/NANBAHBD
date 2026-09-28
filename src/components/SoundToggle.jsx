import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { birthdayData } from '../data/birthdayData'
import { useMissionProgress } from '../hooks/useMissionProgress'
export default function SoundToggle() {
  const { update } = useMissionProgress()
  const audio = useRef(null)
  const [available, setAvailable] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const player = new Audio(birthdayData.musicPath)
    player.loop = true
    player.preload = 'auto'
    audio.current = player

    const stopMusic = () => {
      player.pause()
      setIsPlaying(false)
      update({ sound: false })
    }
    const handleError = () => {
      setAvailable(false)
      stopMusic()
    }
    const stopForVoice = () => stopMusic()
    const removeStartListeners = () => {
      window.removeEventListener('pointerdown', startMusic)
      window.removeEventListener('keydown', startMusic)
      window.removeEventListener('touchstart', startMusic)
    }
    const startMusic = async () => {
      if (!player.paused) return
      try {
        window.dispatchEvent(new Event('panda:music-start'))
        await player.play()
        setIsPlaying(true)
        update({ sound: true })
        removeStartListeners()
      } catch {
        setIsPlaying(false)
        update({ sound: false })
      }
    }

    player.addEventListener('error', handleError)
    window.addEventListener('panda:voice-start', stopForVoice)
    update({ sound: false })
    startMusic()
    window.addEventListener('pointerdown', startMusic)
    window.addEventListener('keydown', startMusic)
    window.addEventListener('touchstart', startMusic)

    return () => {
      removeStartListeners()
      window.removeEventListener('panda:voice-start', stopForVoice)
      player.removeEventListener('error', handleError)
      player.pause()
      audio.current = null
    }
  }, [update])

  const toggle = async () => {
    const player = audio.current
    if (!available || !player) return

    if (!player.paused) {
      player.pause()
      setIsPlaying(false)
      update({ sound: false })
      return
    }

    try {
      window.dispatchEvent(new Event('panda:music-start'))
      await player.play()
      setIsPlaying(true)
      update({ sound: true })
    } catch {
      setIsPlaying(false)
      update({ sound: false })
    }
  }

  return <button className="sound-toggle" onClick={toggle} aria-label={available ? `Turn music ${isPlaying ? 'off' : 'on'}` : 'Music file unavailable'} title={!available ? 'Birthday music is unavailable' : `${isPlaying ? 'Pause' : 'Play'} birthday music`}>{isPlaying ? <Volume2/> : <VolumeX/>}<span>{available ? `Music ${isPlaying ? 'on' : 'off'}` : 'No audio'}</span></button>
}
