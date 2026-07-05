import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { navLinks } from '../data/content'
import { useLenisControl } from '../context/LenisContext'
import './Navbar.css'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollPositionRef = useRef(0)
  const lenis = useLenisControl()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    scrollPositionRef.current = window.scrollY
    lenis?.stop()

    const { style } = document.body
    style.position = 'fixed'
    style.top = `-${scrollPositionRef.current}px`
    style.left = '0'
    style.right = '0'
    style.width = '100%'
    style.overflow = 'hidden'

    return () => {
      const savedY = scrollPositionRef.current
      style.position = ''
      style.top = ''
      style.left = ''
      style.right = ''
      style.width = ''
      style.overflow = ''

      if (lenis) {
        lenis.scrollTo(savedY, { immediate: true })
        lenis.start()
      } else {
        window.scrollTo(0, savedY)
      }
    }
  }, [menuOpen, lenis])

  useEffect(() => {
    if (!menuOpen) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const mobileMenu = createPortal(
    <nav
      className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}
      aria-hidden={!menuOpen}
    >
      <ul className="navbar__mobile-links">
        {navLinks.map((link, i) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="navbar__mobile-link"
              onClick={closeMenu}
            >
              <span className="navbar__link-index">0{i + 1}</span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="navbar__mobile-cta"
        onClick={closeMenu}
      >
        Связаться
      </a>
    </nav>,
    document.body,
  )

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container navbar__inner">
          <a href="#hero" className="navbar__logo" data-cursor="Top" onClick={closeMenu}>
            <span className="navbar__logo-mark">А</span>
            <span className="navbar__logo-text">Alexander</span>
          </a>

          <nav className="navbar__nav" aria-label="Main">
            <ul className="navbar__links">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="navbar__link"
                    data-cursor="Scroll"
                  >
                    <span className="navbar__link-index">0{i + 1}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#contact"
            className="navbar__cta"
            data-cursor="Contact"
          >
            Связаться
          </a>

          <button
            type="button"
            className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <div id="mobile-navigation">{mobileMenu}</div>
    </>
  )
}
