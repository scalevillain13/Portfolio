import { motion } from 'framer-motion'
import './SectionDivider.css'

export function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <div className="section-divider__line">
        <motion.span
          className="section-divider__glow"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <span className="section-divider__dot" />
      <span className="section-divider__dot section-divider__dot--secondary" />
    </div>
  )
}
