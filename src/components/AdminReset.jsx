import { RotateCcw } from 'lucide-react'
import { useMissionProgress } from '../hooks/useMissionProgress'
export default function AdminReset() {
  const { reset } = useMissionProgress()
  return <details className="admin"><summary>Mission controls</summary><button onClick={() => { if (confirm('Reset all mission progress?')) reset() }}><RotateCcw size={15}/> Reset progress</button></details>
}
