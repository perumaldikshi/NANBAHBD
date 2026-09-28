import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import FindThePanda from '../components/FindThePanda'

export default function PandaHunt() {
  const navigate = useNavigate()
  const openIntro = useCallback(() => navigate('/intro', { replace: true }), [navigate])

  return <PageTransition className="page panda-hunt-page">
    <FindThePanda onComplete={openIntro} />
  </PageTransition>
}
