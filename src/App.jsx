import { Navigate, Route, Routes } from 'react-router-dom'
import AnimatedBackground from './components/AnimatedBackground'
import SoundToggle from './components/SoundToggle'
import AdminReset from './components/AdminReset'
import PandaWorld from './components/PandaWorld'
import PandaRouteLoader from './components/PandaRouteLoader'
import Home from './pages/Home'
import Mission from './pages/Mission'
import Memories from './pages/Memories'
import Lock from './pages/Lock'
import Letter from './pages/Letter'
import LastThing from './pages/LastThing'
import Final from './pages/Final'
import './greenPandaOverrides.css'
import './premiumPanda.css'
export default function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><AnimatedBackground/><PandaWorld/><PandaRouteLoader/><div id="main"><Routes><Route path="/" element={<Home/>}/><Route path="/mission" element={<Mission/>}/><Route path="/memories" element={<Memories/>}/><Route path="/lock" element={<Lock/>}/><Route path="/letter" element={<Letter/>}/><Route path="/last-thing" element={<LastThing/>}/><Route path="/final" element={<Final/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></div><SoundToggle/><AdminReset/></>
}
