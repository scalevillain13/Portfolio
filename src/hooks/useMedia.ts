import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

export function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])

  return mobile
}

export const DESKTOP_BREAKPOINT = 1024

export function useIsDesktop(breakpoint = DESKTOP_BREAKPOINT) {
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`)
    setDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])

  return desktop
}

export function useIsTouchDevice() {
  const [touch, setTouch] = useState(false)

  useEffect(() => {
    setTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return touch
}
