import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { useIsDesktop, useReducedMotion } from '../hooks/useMedia'
import './SectionDivider.css'

const DIVIDER_SPRING = {
  stiffness: 175,
  damping: 34,
  mass: 0.48,
  restDelta: 0.0004,
}

function DividerContent() {
  return (
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
}

function SectionDividerDesktop() {
  const ref = useRef<HTMLDivElement>(null)
  const isNear = useInView(ref, { margin: '120px 0px', amount: 0 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.55', 'end 0.45'],
  })

  const rotateXRaw = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -12])
  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9])
  const opacityRaw = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.38, 1, 1, 0.45])
  const zRaw = useTransform(scrollYProgress, [0, 0.5, 1], [-60, 0, -40])

  const rotateX = useSpring(rotateXRaw, DIVIDER_SPRING)
  const scale = useSpring(scaleRaw, DIVIDER_SPRING)
  const opacity = useSpring(opacityRaw, DIVIDER_SPRING)
  const z = useSpring(zRaw, DIVIDER_SPRING)

  return (
    <motion.div
      ref={ref}
      className="section-divider section-divider--3d"
      aria-hidden="true"
      style={{
        rotateX,
        scale,
        opacity,
        z,
        transformPerspective: 1200,
        willChange: isNear ? 'transform, opacity' : 'auto',
      }}
    >
      <DividerContent />
    </motion.div>
  )
}

function SectionDividerFlat() {
  return (
    <div className="section-divider" aria-hidden="true">
      <DividerContent />
    </div>
  )
}

export function SectionDivider() {
  const desktop = useIsDesktop()
  const reducedMotion = useReducedMotion()

  if (desktop && !reducedMotion) {
    return <SectionDividerDesktop />
  }

  return <SectionDividerFlat />
}
