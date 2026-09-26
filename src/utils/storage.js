const KEY = 'birthdayMissionProgress'
export const initialProgress = { entered: false, puzzles: [], archive: false, unlocked: false, letter: false, final: false, sound: false }

export function loadProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY))
    return value && typeof value === 'object' ? { ...initialProgress, ...value } : initialProgress
  } catch { return initialProgress }
}
export function saveProgress(value) {
  try { localStorage.setItem(KEY, JSON.stringify(value)) } catch { /* Storage may be unavailable. */ }
}
export function clearProgress() {
  try { localStorage.removeItem(KEY) } catch { /* Storage may be unavailable. */ }
}
