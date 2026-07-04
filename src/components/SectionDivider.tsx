import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useIsMobile, useReducedMotion } from '../hooks/useMedia'
import './SectionDivider.css'

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const mobile = useIsMobile(1024)
  const disabled = reducedMotion || mobile

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.55', 'end 0.45'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -12])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.3, 1, 1, 0.4])
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-60, 0, -40])

  const inner = (
    <>
      <div className="section-divider__line">
        <motion.span
          className="section-divider__glow"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <span className="section-divider__dot" />
      <span className="section-divider__dot section-divider__dot--secondary" />
    </>
  )

  if (disabled) {
    return (
      <div ref={ref} className="section-divider" aria-hidden="true">
        {inner}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className="section-divider section-divider--3d"
      aria-hidden="true"
      style={{ rotateX, scale, opacity, z, transformPerspective: 1200 }}
    >
      {inner}
    </motion.div>
  )
}
