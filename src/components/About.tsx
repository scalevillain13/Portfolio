import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { about } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { SectionAmbience } from './SectionAmbience'
import './About.css'

const statAccents = [
  { hue: 'coral', icon: '◎' },
  { hue: 'gold', icon: '◈' },
  { hue: 'rose', icon: '◆' },
  { hue: 'amber', icon: '☕' },
]

const ribbonWords = [
  'Fullstack Developer',
  'Москва',
  '18 y/o',
  'Open to work',
  'Clean Code',
  'UI / UX',
  'Motion Design',
  'React & Laravel',
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = Math.max(1, Math.floor(value / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="about-stat__value">
      {count}
      {suffix && <span className="about-stat__suffix">{suffix}</span>}
    </span>
  )
}

export function About() {
  return (
    <section className="section about" id="about">
      <SectionAmbience variant="about" />
      <div className="container section__content">
        <SectionHeading
          label="01 — Обо мне"
          title="Разработчик с большими амбициями"
        />
      </div>

      <motion.div
        className="about__ribbon"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="about__ribbon-track">
          {[...ribbonWords, ...ribbonWords].map((word, i) => (
            <span className="about__ribbon-item" key={i}>
              <span className="about__ribbon-star" aria-hidden="true">✦</span>
              {word}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="container section__content">
        <div className="about__grid col-grid">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="about__bio">{about.bio}</p>
            <p className="about__bio about__bio--secondary">{about.bioSecondary}</p>
            <p className="about__bio about__bio--secondary">{about.bioThird}</p>

            <blockquote className="about__quote">
              <span className="about__quote-mark" aria-hidden="true">"</span>
              <p>{about.quote.text}</p>
              <cite>— {about.quote.author}</cite>
            </blockquote>

            <div className="about__tags">
              <span className="about__tags-label">Фокус сейчас</span>
              <div className="about__tags-list">
                {about.focusTags.map((tag) => (
                  <span key={tag} className="about__tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="about__stats">
            {about.stats.map((stat, i) => {
              const accent = statAccents[i] ?? statAccents[0]
              return (
                <motion.div
                  key={stat.label}
                  className={`about-stat about-stat--${accent.hue}`}
                  initial={{ opacity: 0, y: 40, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, transition: { duration: 0.35 } }}
                >
                  <div className="about-stat__glow" aria-hidden="true" />
                  <div className="about-stat__noise" aria-hidden="true" />
                  <div className="about-stat__corner" aria-hidden="true" />

                  <div className="about-stat__top">
                    <span className="about-stat__index">0{i + 1}</span>
                    <span className="about-stat__icon">{accent.icon}</span>
                  </div>

                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <span className="about-stat__label">{stat.label}</span>

                  <div className="about-stat__bar" aria-hidden="true">
                    <motion.span
                      className="about-stat__bar-fill"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
