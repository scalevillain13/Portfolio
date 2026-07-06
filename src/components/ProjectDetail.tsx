import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import {
  getAdjacentProjects,
  groupProjectStack,
  type Project,
} from '../data/content'
import { techIconMap } from '../icons/TechIcons'
import { MagneticButton } from './MagneticButton'
import { OptimizedImage } from './OptimizedImage'
import { ProjectDetailAmbience } from './ProjectDetailAmbience'
import './ProjectDetail.css'

type ProjectDetailProps = {
  project: Project
  onClose: () => void
  onNavigate: (id: string) => void
}

const ease = [0.16, 1, 0.3, 1] as const

const sectionMotion = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
}

export function ProjectDetail({ project, onClose, onNavigate }: ProjectDetailProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const { prev, next } = getAdjacentProjects(project.id)
  const stackGroups = groupProjectStack(project.stack)

  useEffect(() => {
    scrollerRef.current?.scrollTo(0, 0)
  }, [project.id])

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
      transition={{ duration: 0.4 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
    >
      <motion.div
        className="project-detail__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        ref={scrollerRef}
        className="project-detail__scroller"
        data-lenis-prevent
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.65, ease }}
      >
        <ProjectDetailAmbience color={project.color} />

        <div className="project-detail__inner">
          <header className="project-detail__topbar">
            <button
              type="button"
              className="project-detail__back"
              onClick={onClose}
              data-cursor="Back"
            >
              <span className="project-detail__back-icon" aria-hidden="true">←</span>
              <span>К проектам</span>
            </button>
            <span className="project-detail__top-id">{project.id} / {project.year}</span>
            <button
              type="button"
              className="project-detail__close"
              onClick={onClose}
              aria-label="Закрыть"
              data-cursor="Close"
            >
              ✕
            </button>
          </header>

          <motion.section
            className="project-detail__header"
            style={{ '--project-color': project.color } as CSSProperties}
            initial="hidden"
            animate="visible"
            variants={sectionMotion}
          >
            <div className="project-detail__header-deco" aria-hidden="true">
              <span className="project-detail__header-watermark">{project.id}</span>
              <span className="project-detail__header-orb" />
              <span className="project-detail__header-ring" />
            </div>

            <div className="project-detail__header-body">
              <p className="project-detail__eyebrow">{project.slug}</p>
              <h1 id="project-detail-title" className="project-detail__title">
                {project.title}
              </h1>
              <p className="project-detail__tagline">{project.tagline}</p>

              <div className="project-detail__header-tags">
                {project.tags.map((tag) => {
                  const Icon = techIconMap[tag]
                  return (
                    <span key={tag} className="project-detail__header-tag">
                      {Icon && <Icon />}
                      {tag}
                    </span>
                  )
                })}
              </div>

              <div className="project-detail__header-actions">
                {project.liveUrl && (
                  <MagneticButton href={project.liveUrl} cursorLabel="Live" external>
                    Открыть сайт
                  </MagneticButton>
                )}
                {project.repoUrl && (
                  <MagneticButton href={project.repoUrl} variant="ghost" cursorLabel="Code" external>
                    GitHub
                  </MagneticButton>
                )}
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="project-detail__live-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.liveUrl.replace(/^https?:\/\//, '')}
                  <span aria-hidden="true"> ↗</span>
                </a>
              )}
            </div>
          </motion.section>

          <motion.section
            className="project-detail__section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionMotion}
          >
            <p className="project-detail__section-label">Overview</p>
            <h2 className="project-detail__section-title">О проекте</h2>
            <p className="project-detail__overview">{project.longDescription}</p>
            <div className="project-detail__problem">
              <span className="project-detail__problem-label">Задача</span>
              <p>{project.problem}</p>
            </div>
          </motion.section>

          <motion.section
            className="project-detail__section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionMotion}
          >
            <p className="project-detail__section-label">Highlights</p>
            <h2 className="project-detail__section-title">Ключевые фичи</h2>
            <div className="project-detail__features">
              {project.highlights.map((item, i) => (
                <motion.article
                  key={item}
                  className="project-detail__feature-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease }}
                >
                  <span className="project-detail__feature-index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p>{item}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="project-detail__section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionMotion}
          >
            <p className="project-detail__section-label">Stack</p>
            <h2 className="project-detail__section-title">Технологии</h2>
            <div className="project-detail__stack-groups">
              {stackGroups.map((group) => (
                <div key={group.label} className="project-detail__stack-group">
                  <h3>{group.label}</h3>
                  <div className="project-detail__stack-grid">
                    {group.items.map((tech) => {
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
              ))}
            </div>
          </motion.section>

          {project.gallery.length > 0 && (
            <motion.section
              className="project-detail__section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={sectionMotion}
            >
              <p className="project-detail__section-label">Gallery</p>
              <h2 className="project-detail__section-title">Скриншоты</h2>
              <div className="project-detail__gallery">
                {project.gallery.map((src, i) => (
                  <motion.figure
                    key={`${src}-${i}`}
                    className="project-detail__gallery-item"
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.65, ease }}
                  >
                    <OptimizedImage
                      src={src}
                      alt={`${project.title} — скриншот ${i + 1}`}
                    />
                  </motion.figure>
                ))}
              </div>
            </motion.section>
          )}

          <motion.footer
            className="project-detail__footer-nav"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionMotion}
          >
            <button
              type="button"
              className="project-detail__nav-btn project-detail__nav-btn--back"
              onClick={onClose}
              data-cursor="Back"
            >
              <span>← Все проекты</span>
            </button>

            <div className="project-detail__nav-adjacent">
              {prev ? (
                <button
                  type="button"
                  className="project-detail__nav-btn"
                  onClick={() => onNavigate(prev.id)}
                  data-cursor="View"
                >
                  <span className="project-detail__nav-dir">Предыдущий</span>
                  <span className="project-detail__nav-title">{prev.title}</span>
                </button>
              ) : (
                <span />
              )}
              {next ? (
                <button
                  type="button"
                  className="project-detail__nav-btn project-detail__nav-btn--next"
                  onClick={() => onNavigate(next.id)}
                  data-cursor="View"
                >
                  <span className="project-detail__nav-dir">Следующий</span>
                  <span className="project-detail__nav-title">{next.title}</span>
                </button>
              ) : (
                <span />
              )}
            </div>
          </motion.footer>
        </div>
      </motion.div>
    </motion.div>
  )
}
