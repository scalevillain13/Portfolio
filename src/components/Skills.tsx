import { motion } from 'framer-motion'
import { skills } from '../data/content'
import { techIconMap } from '../icons/TechIcons'
import { SectionHeading } from './SectionHeading'
import { SectionAmbience } from './SectionAmbience'
import './Skills.css'

export function Skills() {
  const doubled = [...skills, ...skills]

  return (
    <section className="section skills" id="skills">
      <SectionAmbience variant="skills" />
      <div className="container section__content">
        <SectionHeading
          label="02 — Стек"
          title="Технологии, с которыми работаю"
          subtitle="Frontend, backend, design tools и DevOps — полный цикл разработки."
        />
      </div>

      <div className="skills__marquee-wrap">
        <div className="skills__marquee">
          {doubled.map((skill, i) => {
            const Icon = techIconMap[skill.name]
            return (
              <div key={`${skill.name}-${i}`} className="skills__pill">
                {Icon && <Icon className="skills__pill-icon" />}
                <span>{skill.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="container section__content">
        <div className="skills__grid">
          {skills.map((skill, i) => {
            const Icon = techIconMap[skill.name]
            return (
              <motion.div
                key={skill.name}
                className="skills__card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: (i % 8) * 0.05, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                data-cursor="Tech"
              >
                <div className="skills__card-icon">
                  {Icon && <Icon />}
                </div>
                <span className="skills__card-name">{skill.name}</span>
                <span className="skills__card-cat">{skill.category}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
