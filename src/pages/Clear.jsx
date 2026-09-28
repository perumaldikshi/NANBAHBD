import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMissionProgress } from '../hooks/useMissionProgress'

export default function Clear() {
  const navigate = useNavigate()
  const { reset } = useMissionProgress()

  useEffect(() => {
    reset()
    sessionStorage.clear()
    navigate('/', { replace: true })
  }, [navigate, reset])

  return <main className="section"><p>Clearing test progress...</p></main>
}
