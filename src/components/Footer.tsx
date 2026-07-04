import { motion } from 'framer-motion'
import { personal } from '../data/content'
import { GitHubIcon, TelegramIcon } from '../icons/SocialIcons'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__bg" aria-hidden="true">
        <motion.div
          className="footer__line"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__logo">А</span>
            <div>
              <p className="footer__name">{personal.name}</p>
              <p className="footer__role">{personal.role}</p>
            </div>
          </div>

          <div className="footer__socials">
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social footer__social--github"
              aria-label="GitHub"
              data-cursor="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href={personal.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social footer__social--telegram"
              aria-label="Telegram"
              data-cursor="Telegram"
            >
              <TelegramIcon />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} {personal.name}. Built with React & Vite.</p>
          <p className="footer__location">{personal.location}</p>
        </div>
      </div>
    </footer>
  )
}
