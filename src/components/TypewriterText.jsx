import { useEffect, useRef, useState } from 'react'
export default function TypewriterText({ lines, speed = 18, onComplete }) {
  const content = lines.join('\n\n'); const [count, setCount] = useState(0); const completed = useRef(false); const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])
  useEffect(() => {
    if (count >= content.length) {
      if (!completed.current) { completed.current = true; onCompleteRef.current?.() }
      return undefined
    }
    const id = setTimeout(() => setCount((current) => current + 1), speed)
    return () => clearTimeout(id)
  }, [count, content, speed])
  return <div className="typewriter" aria-label={content}>{content.slice(0, count)}<span className="cursor" aria-hidden="true"/></div>
}
