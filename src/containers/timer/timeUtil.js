import { useRef, useEffect } from 'react'

export function UseInterval(call, delay) {
  const callback = useRef(() => {})

  useEffect(() => {
    callback.current = call
  })

  useEffect(() => {
    if (delay !== null) {
      const time = setInterval(() => callback.current(), delay)

      return () => {
        clearInterval(time)
      }
    }
  }, [delay])
}
