import { useEffect } from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion'
import { MOUSE_SPRING } from '../motion/constants'

type NormalizedMouseMotion = {
  x: MotionValue<number>
  y: MotionValue<number>
}

export function useNormalizedMouseMotion(): NormalizedMouseMotion {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, MOUSE_SPRING)
  const y = useSpring(rawY, MOUSE_SPRING)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [rawX, rawY])

  return { x, y }
}
