import { motion } from 'framer-motion'
import { experience } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { SectionAmbience } from './SectionAmbience'
import './Experience.css'

const SPINE_PATH =
  'M 20 28 C 20 72, 6 96, 20 140 S 34 184, 20 228 S 6 272, 20 316 S 34 360, 20 404'

export function Experience() {
  return (
    <section className="section experience" id="experience">
      <SectionAmbience variant="experience" />
      <div className="container section__content">
        <SectionHeading
          label="04 — Опыт"
          title="Путь разработчика"
        />

        <div className="timeline">
          <svg
            className="timeline__spine"
            viewBox="0 0 40 432"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="timeline-spine-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
                <stop offset="55%" stopColor="var(--accent-secondary)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.25" />
              </linearGradient>
              <filter id="timeline-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              className="timeline__spine-track"
              d={SPINE_PATH}
              fill="none"
              stroke="rgba(250, 245, 238, 0.06)"
              strokeWidth="2"
            />

            <motion.path
              className="timeline__spine-line"
              d={SPINE_PATH}
              fill="none"
              stroke="url(#timeline-spine-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#timeline-glow)"
              initial={{ pathLength: 0, opacity: 0.4 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {experience.map((item, i) => {
              const nodeY = [28, 140, 316][i] ?? 28 + i * 140
              return (
              <motion.g key={item.period}>
                <motion.circle
                  cx="20"
                  cy={nodeY}
                  r="10"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  opacity="0.25"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.25 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.35, duration: 0.6 }}
                />
                <motion.circle
                  className="timeline__spine-node"
                  cx="20"
                  cy={nodeY}
                  r="5"
                  fill="var(--accent)"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65 + i * 0.35, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </motion.g>
              )
            })}
          </svg>

          {experience.map((item, i) => (
            <motion.div
              key={item.period}
              className="timeline__item"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.2 + i * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="timeline__marker">
                <span className="timeline__dot-ring" aria-hidden="true" />
                <span className="timeline__dot" />
              </div>
              <div className="timeline__content">
                <span className="timeline__period">{item.period}</span>
                <h3 className="timeline__role">{item.role}</h3>
                <span className="timeline__company">{item.company}</span>
                <p className="timeline__desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
