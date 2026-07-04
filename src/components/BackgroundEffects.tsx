import { motion } from 'framer-motion'
import './BackgroundEffects.css'

export function BackgroundEffects() {
  return (
    <div className="bg-effects" aria-hidden="true">
      <div className="bg-grid" />
      <motion.div
        className="bg-orb bg-orb--1"
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="bg-orb bg-orb--2"
        animate={{ x: [0, -50, 30, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="bg-orb bg-orb--3"
        animate={{ x: [0, 20, -40, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
