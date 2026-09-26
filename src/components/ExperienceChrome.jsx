import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Gift, Home, Images, LockKeyhole, Mail, Sparkles } from 'lucide-react'
import './experienceChrome.css'

const routes = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/mission', label: 'Mission', icon: Sparkles },
  { to: '/memories', label: 'Memories', icon: Images },
  { to: '/lock', label: 'Lock', icon: LockKeyhole },
  { to: '/letter', label: 'Letter', icon: Mail },
  { to: '/final', label: 'Final', icon: Gift },
]

export default function ExperienceChrome() {
  const { pathname } = useLocation()
  const [scroll, setScroll] = useState(0)
  const activeIndex = useMemo(() => Math.max(0, routes.findIndex((route) => route.to === pathname)), [pathname])

  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      setScroll(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [pathname])

  useEffect(() => {
    let frame
    const move = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
        document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move) }
  }, [])

  return <>
    <div className="pointer-aurora" aria-hidden="true" />
    <header className="experience-hud">
      <NavLink className="hud-brand" to="/" aria-label="Panda World home"><span className="hud-panda">🐼</span><span><strong>PANDA WORLD</strong><small>EZHIL • 2026</small></span></NavLink>
      <nav aria-label="Experience navigation">{routes.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'active' : ''}><Icon /><span>{label}</span></NavLink>)}</nav>
      <div className="hud-status"><i /><span>WORLD ONLINE</span></div>
    </header>
    <aside className="journey-rail" aria-label="Journey progress"><span>{String(activeIndex + 1).padStart(2, '0')}</span><div><i style={{ height: `${((activeIndex + 1) / routes.length) * 100}%` }} /></div><small>{String(routes.length).padStart(2, '0')}</small></aside>
    <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${scroll}%` }} /></div>
  </>
}
