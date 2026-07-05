import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useIsMobile, useIsTouchDevice } from '../hooks/useMedia'
import { CURSOR_RING_SPRING, CURSOR_SPRING } from '../motion/constants'
import './CustomCursor.css'

export function CustomCursor() {
  const mobile = useIsMobile()
  const touch = useIsTouchDevice()
  const [hoverLabel, setHoverLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  const cursorX = useSpring(0, CURSOR_SPRING)
  const cursorY = useSpring(0, CURSOR_SPRING)
  const ringX = useSpring(0, CURSOR_RING_SPRING)
  const ringY = useSpring(0, CURSOR_RING_SPRING)

  useEffect(() => {
    if (mobile || touch) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      setVisible(true)
    }

    const hide = () => setVisible(false)
    const show = () => setVisible(true)

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('[data-cursor]')
      if (interactive) {
        setHoverLabel(interactive.getAttribute('data-cursor'))
      } else {
        setHoverLabel(null)
      }
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [mobile, touch, cursorX, cursorY, ringX, ringY])

  if (mobile || touch) return null

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: cursorX, y: cursorY, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className={`cursor-ring ${hoverLabel ? 'cursor-ring--hover' : ''}`}
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        {hoverLabel && <span className="cursor-label">{hoverLabel}</span>}
      </motion.div>
    </>
  )
}
