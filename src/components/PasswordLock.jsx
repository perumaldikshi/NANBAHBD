import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LockKeyhole, UnlockKeyhole, Lightbulb } from 'lucide-react'
import { birthdayData } from '../data/birthdayData'
export default function PasswordLock({ unlocked, onUnlock }) {
  const [value, setValue] = useState(''); const [denied, setDenied] = useState(false); const [hint, setHint] = useState(false)
  const submit = (e) => { e.preventDefault(); if (value.trim().toLocaleLowerCase() === birthdayData.secret.password.trim().toLocaleLowerCase()) onUnlock(); else { setDenied(true); setValue('') } }
  return <div className={`lock-panel glass ${unlocked ? 'is-unlocked' : ''}`}>
    <motion.div className="lock-icon" animate={unlocked ? { scale: [1,1.2,1], rotate: [0,-8,0] } : { y: [0,-5,0] }} transition={{ repeat: unlocked ? 0 : Infinity, duration: 2 }}>{unlocked ? <UnlockKeyhole/> : <LockKeyhole/>}</motion.div>
    <h2>{unlocked ? 'Access granted' : 'Final memory locked'}</h2>
    {!unlocked && <><p>Only someone who knows our story can unlock this.</p><form onSubmit={submit}><label htmlFor="secret">Enter secret code</label><input id="secret" type="password" value={value} onChange={(e) => { setValue(e.target.value); setDenied(false) }} autoComplete="off"/><button className="primary" type="submit">Unlock</button></form><button className="text-button" onClick={() => setHint(!hint)}><Lightbulb size={16}/> Show hint</button></>}
    <AnimatePresence>{denied && <motion.p className="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Access denied 😏 You know me better than this. Try again.</motion.p>}</AnimatePresence>
    {hint && !unlocked && <p className="hint">{birthdayData.secret.hint}</p>}
    {unlocked && <div className="access-bar"><span/></div>}
  </div>
}
