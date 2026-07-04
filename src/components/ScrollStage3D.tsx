import { useRef, type ReactNode } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useIsDesktop, useReducedMotion } from '../hooks/useMedia'
import './ScrollStage3D.css'

const EASE_CURVE = [0.16, 1, 0.3, 1] as const

/** Main section transforms — soft follow, no mechanical snap */
const STAGE_SPRING = {
  stiffness: 175,
  damping: 34,
  mass: 0.48,
  restDelta: 0.0004,
}

/** Parallax / decorative layers — slightly slower for depth separation */
const DEPTH_SPRING = {
  stiffness: 140,
  damping: 30,
  mass: 0.55,
  restDelta: 0.0004,
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
  const isNear = useInView(ref, { margin: '280px 0px', amount: 0 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.42', 'end 0.58', 'end 0.08'],
  })

  const direction = index % 2 === 0 ? 1 : -1
  const enterTilt = 14 * direction
  const exitTilt = -9 * direction

  const rotateXRaw = useTransform(
    scrollYProgress,
    [0, 0.28, 0.62, 1],
    [enterTilt, 0, 0, exitTilt],
  )
  const rotateYRaw = useTransform(
    scrollYProgress,
    [0, 0.28, 0.62, 1],
    [5 * direction, 0, 0, -3.5 * direction],
  )
  const zRaw = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [-140, 0, 0, -100])
  const scaleRaw = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0.86, 1, 1, 0.88])
  const opacityRaw = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0.38, 1, 1, 0.42])
  const shadowOpacityRaw = useTransform(scrollYProgress, [0, 0.45, 1], [0, 0.45, 0.12])
  const backYRaw = useTransform(scrollYProgress, [0, 1], [32, -32])
  const frontYRaw = useTransform(scrollYProgress, [0, 1], [-18, 18])
  const edgeGlowRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.55, 0.2])

  const rotateX = useSpring(rotateXRaw, STAGE_SPRING)
  const rotateY = useSpring(rotateYRaw, STAGE_SPRING)
  const z = useSpring(zRaw, STAGE_SPRING)
  const scale = useSpring(scaleRaw, STAGE_SPRING)
  const opacity = useSpring(opacityRaw, STAGE_SPRING)
  const shadowOpacity = useSpring(shadowOpacityRaw, DEPTH_SPRING)
  const backY = useSpring(backYRaw, DEPTH_SPRING)
  const frontY = useSpring(frontYRaw, DEPTH_SPRING)
  const edgeGlow = useSpring(edgeGlowRaw, DEPTH_SPRING)

  const willChange = isNear ? 'transform, opacity' : 'auto'

  return (
    <div ref={ref} className="scroll-stage-3d">
      <motion.div
        className="scroll-stage-3d__shadow"
        style={{ opacity: shadowOpacity, willChange }}
        aria-hidden="true"
      />

      <motion.div
        className="scroll-stage-3d__depth scroll-stage-3d__depth--far"
        style={{ y: backY, z: -60, rotateX, opacity: edgeGlow, willChange }}
        aria-hidden="true"
      >
        <span className="scroll-stage-3d__grid" />
      </motion.div>

      <motion.div
        className="scroll-stage-3d__plane"
        style={{
          rotateX,
          rotateY,
          z,
          scale,
          opacity,
          willChange,
        }}
      >
        <motion.div className="scroll-stage-3d__content" style={{ y: frontY, willChange }}>
          {children}
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-stage-3d__depth scroll-stage-3d__depth--near"
        style={{ y: frontY, z: 30, opacity: edgeGlow, willChange }}
        aria-hidden="true"
      />
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
