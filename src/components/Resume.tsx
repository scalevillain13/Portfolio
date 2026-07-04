import { useState } from 'react'
import { motion } from 'framer-motion'
import { personal } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { SectionAmbience } from './SectionAmbience'
import './Resume.css'

function DocumentIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="10" y="6" width="28" height="36" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16h16M16 22h16M16 28h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M28 6v8h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DownloadIcon({ active }: { active: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      animate={active ? { y: [0, 3, 0] } : { y: 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <path
        d="M12 3v11m0 0l4-4m-4 4L8 10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 18v2a2 2 0 002 2h12a2 2 0 002-2v-2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

export function Resume() {
  const [hovered, setHovered] = useState(false)

  return (
    <section className="section resume" id="resume">
      <SectionAmbience variant="contact" />
      <div className="container section__content">
        <SectionHeading
          label="05 — Резюме"
          title="Скачать резюме"
          subtitle="Полная картина опыта, навыков и проектов — в одном PDF."
        />

        <motion.div
          className="resume__card"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="resume__glow" aria-hidden="true" />
          <div className="resume__icon-wrap">
            <DocumentIcon />
          </div>

          <div className="resume__content">
            <h3 className="resume__title">Alexander — Fullstack Developer</h3>
            <p className="resume__text">
              Полный обзор моего опыта, стека и ключевых проектов — удобно для HR и тимлидов.
            </p>
            <ul className="resume__meta">
              <li>PDF · русский</li>
              <li>Опыт · проекты · контакты</li>
            </ul>
          </div>

          <motion.a
            href={personal.resumeUrl}
            download="resume_alexander.pdf"
            className="resume__download"
            data-cursor="Download"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <DownloadIcon active={hovered} />
            <span>Скачать резюме</span>
            <span className="resume__download-glow" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
