import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { Project } from '../data/content'
import { techIconMap } from '../icons/TechIcons'
import { MagneticButton } from './MagneticButton'
import './ProjectDetail.css'

type ProjectDetailProps = {
  project: Project
  onClose: () => void
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="project-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="project-detail__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="project-detail__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          className="project-detail__close"
          onClick={onClose}
          aria-label="Закрыть"
          data-cursor="Close"
        >
          ✕
        </button>

        <div
          className="project-detail__hero"
          style={{ '--project-color': project.color } as CSSProperties}
        >
          <div className="project-detail__hero-glow" />
          <div className="project-detail__hero-grid" />
          <div className="project-detail__hero-mock">
            <span className="project-detail__hero-id">{project.id}</span>
            <span className="project-detail__hero-title">{project.title}</span>
            <div className="project-detail__hero-bars">
              <span /><span /><span />
            </div>
          </div>
        </div>

        <div className="project-detail__body">
          <div className="project-detail__meta">
            <span className="project-detail__year">{project.year}</span>
            <span className="project-detail__divider" />
            <span className="project-detail__slug">{project.slug}</span>
          </div>

          <h1 id="project-detail-title" className="project-detail__heading">
            {project.title}
          </h1>

          <p className="project-detail__desc">{project.longDescription}</p>

          <div className="project-detail__highlights">
            <h2>Ключевые фичи</h2>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="project-detail__stack">
            <h2>Tech Stack</h2>
            <div className="project-detail__stack-grid">
              {project.stack.map((tech) => {
                const Icon = techIconMap[tech]
                return (
                  <span key={tech} className="project-detail__stack-item">
                    {Icon && <Icon />}
                    {tech}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="project-detail__actions">
            <MagneticButton href={project.liveUrl} cursorLabel="Live" external>
              Live Demo
            </MagneticButton>
            <MagneticButton href={project.repoUrl} variant="ghost" cursorLabel="Code" external>
              GitHub Repo
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
