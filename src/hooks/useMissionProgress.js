import { createContext, createElement, useCallback, useContext, useEffect, useState } from 'react'
import { clearProgress, loadProgress, saveProgress } from '../utils/storage'

const ProgressContext = createContext(null)
export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress)
  useEffect(() => saveProgress(progress), [progress])
  const update = useCallback((patch) => setProgress((current) => ({ ...current, ...patch })), [])
  const reset = useCallback(() => { clearProgress(); setProgress(loadProgress()) }, [])
  return createElement(ProgressContext.Provider, { value: { progress, update, reset } }, children)
}
export const useMissionProgress = () => useContext(ProgressContext)
