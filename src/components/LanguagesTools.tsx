import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { languagesAndAi } from '../data/content'
import { ClaudeIcon, CodexIcon, CursorIcon } from '../icons/AiToolIcons'
import './LanguagesTools.css'

const aiToolIcons = {
  Cursor: CursorIcon,
  Claude: ClaudeIcon,
  Codex: CodexIcon,
} as const

export function LanguagesTools() {
  const { language, aiTools } = languagesAndAi

  return (
    <div className="languages-tools">
      <motion.div
        className="languages-tools__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="languages-tools__eyebrow">02.1 — Дополнительно</span>
        <h3 className="languages-tools__title">Языки & AI-инструменты</h3>
        <p className="languages-tools__subtitle">
          Уверенный английский для рабочей коммуникации и ежедневное использование AI в разработке.
        </p>
      </motion.div>

      <div className="languages-tools__grid">
        <motion.article
          className="languages-tools__language-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="languages-tools__language-glow" aria-hidden="true" />
          <div className="languages-tools__language-top">
            <span className="languages-tools__language-flag" aria-hidden="true">EN</span>
            <div>
              <h4 className="languages-tools__language-name">{language.name}</h4>
              <p className="languages-tools__language-level">{language.level}</p>
            </div>
          </div>

          <div className="languages-tools__level-track" aria-hidden="true">
            <motion.span
              className="languages-tools__level-fill"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left center', width: `${language.proficiency}%` }}
            />
          </div>

          <div className="languages-tools__level-labels" aria-hidden="true">
            <span>A2</span>
            <span>B1</span>
            <span>B2</span>
            <span>C1</span>
          </div>

          <p className="languages-tools__language-note">{language.note}</p>
        </motion.article>

        <div className="languages-tools__ai-list">
          {aiTools.map((tool, i) => {
            const Icon = aiToolIcons[tool.name as keyof typeof aiToolIcons]
            return (
              <motion.article
                key={tool.name}
                className="languages-tools__ai-card"
                style={{ '--ai-accent': tool.color } as CSSProperties}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                data-cursor="Tech"
              >
                <span className="languages-tools__ai-glow" aria-hidden="true" />
                <span className="languages-tools__ai-icon">
                  {Icon ? <Icon /> : tool.name.slice(0, 1)}
                </span>
                <div className="languages-tools__ai-body">
                  <h4 className="languages-tools__ai-name">{tool.name}</h4>
                  <p className="languages-tools__ai-desc">{tool.description}</p>
                </div>
                <span className="languages-tools__ai-badge">AI</span>
              </motion.article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
