import { useState, type FormEvent, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { personal } from '../data/content'
import { GitHubIcon, TelegramIcon, MailIcon, PhoneIcon } from '../icons/SocialIcons'
import { SectionHeading } from './SectionHeading'
import { SectionAmbience } from './SectionAmbience'
import { MagneticButton } from './MagneticButton'
import './Contact.css'

const contactLinks = [
  {
    key: 'mail',
    href: `mailto:${personal.email}`,
    label: 'Email',
    value: personal.email,
    hint: 'Лучший способ для длинных брифов и ТЗ',
    Icon: MailIcon,
    cursor: 'Email',
    accent: '#eb8d5c',
    external: false,
  },
  {
    key: 'phone',
    href: personal.phoneHref,
    label: 'Телефон',
    value: personal.phone,
    hint: 'Для срочных вопросов и быстрых созвонов',
    Icon: PhoneIcon,
    cursor: 'Call',
    accent: '#c9a66b',
    external: false,
  },
  {
    key: 'telegram',
    href: personal.telegramUrl,
    label: 'Telegram',
    value: personal.telegram,
    hint: 'Самый быстрый канал — обычно онлайн',
    Icon: TelegramIcon,
    cursor: 'Telegram',
    accent: '#48b0e0',
    external: true,
  },
  {
    key: 'github',
    href: personal.githubUrl,
    label: 'GitHub',
    value: personal.github,
    hint: 'Код, репозитории и open-source активность',
    Icon: GitHubIcon,
    cursor: 'GitHub',
    accent: '#f5f0eb',
    external: true,
  },
]

export function Contact() {
  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="section contact" id="contact">
      <SectionAmbience variant="contact" />
      <div className="container section__content">
        <SectionHeading
          label="06 — Контакт"
          title="Давайте создадим что-то вместе"
          subtitle="Открыт к новым проектам, коллаборациям и интересным задачам."
        />

        <div className="contact__grid col-grid">
          <div className="contact__aside">
            <div className="contact__links">
              {contactLinks.map((link, i) => {
                const { Icon } = link
                return (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    className={`contact__link contact__link--${link.key}`}
                    style={{ '--link-accent': link.accent } as CSSProperties}
                    data-cursor={link.cursor}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ x: 6, transition: { duration: 0.3 } }}
                  >
                    <span className="contact__link-glow" aria-hidden="true" />
                    <span className="contact__link-noise" aria-hidden="true" />

                    <span className="contact__link-icon">
                      <Icon />
                    </span>

                    <span className="contact__link-body">
                      <span className="contact__link-label">{link.label}</span>
                      <span className="contact__link-value">{link.value}</span>
                      <span className="contact__link-hint">{link.hint}</span>
                    </span>

                    <span className="contact__link-arrow" aria-hidden="true">↗</span>
                  </motion.a>
                )
              })}
            </div>

            <motion.div
              className="contact__availability"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              <div className="contact__availability-glow" aria-hidden="true" />
              <div className="contact__availability-head">
                <span className="contact__availability-dot" />
                <span>Доступен для проектов</span>
              </div>
              <p className="contact__availability-text">
                Обычно отвечаю в течение 24 часов. Часовой пояс — Москва (UTC+3).
              </p>
              <div className="contact__availability-meta">
                <span>Response ~24h</span>
                <span>{personal.location}</span>
              </div>
            </motion.div>
          </div>

          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact__form-glow" aria-hidden="true" />
            <div className="contact__form-noise" aria-hidden="true" />

            <div className="contact__form-head">
              <span className="contact__form-badge">
                <span className="contact__form-badge-dot" />
                Напишите мне
              </span>
              <span className="contact__form-index">/ 06</span>
            </div>

            {submitted ? (
              <motion.div
                className="contact__success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="contact__success-icon">✓</span>
                <p>Сообщение отправлено! (demo)</p>
              </motion.div>
            ) : (
              <>
                <div className={`contact__field ${focused === 'name' ? 'contact__field--focused' : ''}`}>
                  <label htmlFor="name">Имя</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                  <span className="contact__field-line" aria-hidden="true" />
                </div>

                <div className={`contact__field ${focused === 'email' ? 'contact__field--focused' : ''}`}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                  <span className="contact__field-line" aria-hidden="true" />
                </div>

                <div className={`contact__field ${focused === 'message' ? 'contact__field--focused' : ''}`}>
                  <label htmlFor="message">Сообщение</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Расскажите о проекте..."
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                  <span className="contact__field-line" aria-hidden="true" />
                </div>

                <MagneticButton cursorLabel="Send">
                  Отправить сообщение
                </MagneticButton>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
