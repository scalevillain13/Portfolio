import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useIsMobile, useIsTouchDevice } from '../hooks/useMedia'
import './CustomCursor.css'

export function CustomCursor() {
  const mobile = useIsMobile()
  const touch = useIsTouchDevice()
  const [hoverLabel, setHoverLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const ringX = useSpring(0, { ...springConfig, damping: 22, stiffness: 200 })
  const ringY = useSpring(0, { ...springConfig, damping: 22, stiffness: 200 })

  useEffect(() => {
    if (mobile || touch) return

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
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

    window.addEventListener('mousemove', move)
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
