import { useRef, type ReactNode } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { useIsDesktop, useReducedMotion } from '../hooks/useMedia'
import './ScrollStage3D.css'

const EASE_CURVE = [0.16, 1, 0.3, 1] as const

const SCROLL_SPRING = {
  stiffness: 320,
  damping: 44,
  mass: 0.35,
  restDelta: 0.0008,
}

type ScrollStage3DProps = {
  children: ReactNode
  index: number
}

function ScrollStageFallback({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      className="scroll-stage-3d scroll-stage-3d--flat"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: EASE_CURVE }}
    >
      {children}
    </motion.div>
  )
}

function ScrollStageDesktop({ children, index }: ScrollStage3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isNear = useInView(ref, { margin: '240px 0px', amount: 0 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const direction = index % 2 === 0 ? 1 : -1

  const rotateXRaw = useTransform(
    scrollYProgress,
    [0, 0.22, 0.5, 0.78, 1],
    [7 * direction, 2.5 * direction, 0, -2 * direction, -6 * direction],
  )
  const rotateYRaw = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [3.5 * direction, 1 * direction, 0, -0.8 * direction, -2.5 * direction],
  )
  const zRaw = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [-70, -18, 0, -18, -55])
  const scaleRaw = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.935, 0.975, 1, 0.975, 0.935])
  const opacityRaw = useTransform(scrollYProgress, [0, 0.18, 0.5, 0.82, 1], [0.55, 0.92, 1, 0.92, 0.55])

  const rotateX = useSpring(rotateXRaw, SCROLL_SPRING)
  const rotateY = useSpring(rotateYRaw, SCROLL_SPRING)
  const z = useSpring(zRaw, SCROLL_SPRING)
  const scale = useSpring(scaleRaw, SCROLL_SPRING)
  const opacity = useSpring(opacityRaw, SCROLL_SPRING)

  return (
    <div ref={ref} className="scroll-stage-3d">
      <motion.div
        className="scroll-stage-3d__plane"
        style={{
          rotateX,
          rotateY,
          z,
          scale,
          opacity,
          willChange: isNear ? 'transform, opacity' : 'auto',
        }}
      >
        <div className="scroll-stage-3d__content">{children}</div>
      </motion.div>
    </div>
  )
}

export function ScrollStage3D({ children, index }: ScrollStage3DProps) {
  const desktop = useIsDesktop()
  const reducedMotion = useReducedMotion()

  if (desktop && !reducedMotion) {
    return <ScrollStageDesktop index={index}>{children}</ScrollStageDesktop>
  }

  return <ScrollStageFallback>{children}</ScrollStageFallback>
}
