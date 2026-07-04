import { motion } from 'framer-motion'
import { personal } from '../data/content'
import { HeroOrbit } from './HeroOrbit'
import { MagneticButton } from './MagneticButton'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero section" id="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
          >
            <span className="hero__badge-dot" />
            Available for projects
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero__title-line">
              <span className="hero__title-name">{personal.name}</span>
            </span>
            <span className="hero__title-line hero__title-line--role">
              <em>{personal.role}</em>
            </span>
          </motion.h1>

          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            className="hero__meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <span>{personal.location}</span>
            <span className="hero__meta-divider" />
            <span>{personal.age} лет</span>
          </motion.div>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
          >
            <MagneticButton href="#projects" cursorLabel="View">
              Смотреть работы
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" cursorLabel="Contact">
              Связаться
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroOrbit />
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </motion.div>
    </section>
  )
}
