import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMedia'
import './MagneticButton.css'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  cursorLabel?: string
  external?: boolean
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  cursorLabel = 'Go',
  external = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const mobile = useIsMobile()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMove = (e: MouseEvent) => {
    if (mobile || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.25, y: y * 0.25 })
  }

  const handleLeave = () => setPosition({ x: 0, y: 0 })

  const classes = `magnetic-btn magnetic-btn--${variant} ${className}`

  const motionProps = {
    ref,
    className: classes,
    style: { x: position.x, y: position.y },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileTap: { scale: 0.96 },
    'data-cursor': cursorLabel,
  }

  if (href) {
    return (
      <motion.a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...motionProps}
      >
        <span className="magnetic-btn__text">{children}</span>
        <span className="magnetic-btn__glow" aria-hidden="true" />
      </motion.a>
    )
  }

  return (
    <motion.button type="button" onClick={onClick} {...motionProps}>
      <span className="magnetic-btn__text">{children}</span>
      <span className="magnetic-btn__glow" aria-hidden="true" />
    </motion.button>
  )
}
