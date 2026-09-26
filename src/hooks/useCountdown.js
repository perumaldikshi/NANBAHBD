import { useEffect, useState } from 'react'

function calculate(target) {
  const now = new Date()
  const birthday = new Date(target)
  const birthdayEnd = new Date(birthday); birthdayEnd.setDate(birthdayEnd.getDate() + 1)
  if (now >= birthdayEnd) return { state: 'after', days: 0, hours: 0, minutes: 0, seconds: 0 }
  if (now >= birthday) return { state: 'today', days: 0, hours: 0, minutes: 0, seconds: 0 }
  const seconds = Math.max(0, Math.floor((birthday - now) / 1000))
  return { state: 'before', days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24, minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60 }
}
export function useCountdown(target) {
  const [value, setValue] = useState(() => calculate(target))
  useEffect(() => { const id = setInterval(() => setValue(calculate(target)), 1000); return () => clearInterval(id) }, [target])
  return value
}
