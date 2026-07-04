import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useIsMobile, useReducedMotion } from '../hooks/useMedia'
import './ScrollStage3D.css'

type ScrollStage3DProps = {
  children: ReactNode
  index: number
}

export function ScrollStage3D({ children, index }: ScrollStage3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const mobile = useIsMobile(1024)
  const disabled = reducedMotion || mobile

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.42', 'end 0.58', 'end 0.08'],
  })

  const direction = index % 2 === 0 ? 1 : -1
  const enterTilt = 14 * direction
  const exitTilt = -9 * direction

  const rotateX = useTransform(scrollYProgress, [0, 0.28, 0.62, 1], [enterTilt, 0, 0, exitTilt])
  const rotateY = useTransform(scrollYProgress, [0, 0.28, 0.62, 1], [5 * direction, 0, 0, -3.5 * direction])
  const z = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [-140, 0, 0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0.86, 1, 1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0.25, 1, 1, 0.35])
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0, 0.45, 0.12])
  const backY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const frontY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const edgeGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.55, 0.2])

  if (disabled) {
    return <div className="scroll-stage-3d scroll-stage-3d--flat">{children}</div>
  }

  return (
    <div ref={ref} className="scroll-stage-3d">
      <motion.div
        className="scroll-stage-3d__shadow"
        style={{ opacity: shadowOpacity }}
        aria-hidden="true"
      />

      <motion.div
        className="scroll-stage-3d__depth scroll-stage-3d__depth--far"
        style={{ y: backY, z: -60, rotateX, opacity: edgeGlow }}
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
        }}
      >
        <motion.div className="scroll-stage-3d__content" style={{ y: frontY }}>
          {children}
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-stage-3d__depth scroll-stage-3d__depth--near"
        style={{ y: frontY, z: 30, opacity: edgeGlow }}
        aria-hidden="true"
      />
    </div>
  )
}
