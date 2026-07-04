import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import './ProjectDetailAmbience.css'

type ProjectDetailAmbienceProps = {
  color: string
}

export function ProjectDetailAmbience({ color }: ProjectDetailAmbienceProps) {
  return (
    <div className="pd-ambience" aria-hidden="true" style={{ '--pd-accent': color } as CSSProperties}>
      <motion.span
        className="pd-ambience__orb pd-ambience__orb--1"
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 25, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />
      <motion.span
        className="pd-ambience__orb pd-ambience__orb--2"
        animate={{ x: [0, -35, 25, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      <motion.span
        className="pd-ambience__ring"
        animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.span
        className="pd-ambience__diamond"
        animate={{ rotate: [0, 180, 360], y: [0, -16, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {[...Array(14)].map((_, i) => (
        <motion.span
          key={i}
          className="pd-ambience__dot"
          style={{
            top: `${8 + (i * 6.5) % 84}%`,
            left: `${3 + (i * 9) % 16}%`,
          }}
          animate={{ opacity: [0.12, 0.45, 0.12], y: [0, -10, 0] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
      <svg className="pd-ambience__arc" viewBox="0 0 240 600">
        <motion.path
          d="M 200 0 C 80 140, 160 300, 60 460 S 20 600 20 600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 10"
          initial={{ pathLength: 0, opacity: 0.15 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
        />
      </svg>
      <svg className="pd-ambience__grid" viewBox="0 0 160 160">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 32}
            x2="160"
            y2={i * 32}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.12"
          />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={`v-${i}`}
            x1={i * 32}
            y1="0"
            x2={i * 32}
            y2="160"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.12"
          />
        ))}
      </svg>
    </div>
  )
}
