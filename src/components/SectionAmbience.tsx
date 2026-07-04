import { motion } from 'framer-motion'
import './SectionAmbience.css'

type AmbienceVariant = 'about' | 'skills' | 'projects' | 'experience' | 'contact'

type SectionAmbienceProps = {
  variant: AmbienceVariant
}

const codeSnippets = [
  'const build = () => {',
  'export default App',
  'async function fetch()',
  'interface Props {',
  '<Component />',
  'npm run dev',
]

const symbols = ['{ }', '< />', '[ ]', '( )', '=>', ';;', '{}', '[]']

export function SectionAmbience({ variant }: SectionAmbienceProps) {
  return (
    <div className={`ambience ambience--${variant}`} aria-hidden="true">
      {variant === 'about' && (
        <>
          <motion.span
            className="ambience__orb ambience__orb--1"
            animate={{ x: [0, 18, -12, 0], y: [0, -24, 14, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="ambience__orb ambience__orb--2"
            animate={{ x: [0, -20, 16, 0], y: [0, 16, -18, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          />
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="ambience__dot"
              style={{
                top: `${12 + (i * 7) % 76}%`,
                left: `${4 + (i * 11) % 18}%`,
                animationDelay: `${i * 0.4}s`,
              }}
              animate={{ opacity: [0.15, 0.5, 0.15], y: [0, -8, 0] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          <svg className="ambience__arc ambience__arc--left" viewBox="0 0 200 200">
            <motion.path
              d="M 180 20 Q 40 100 180 180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 0.35 }}
              transition={{ duration: 3, ease: 'easeOut' }}
            />
          </svg>
        </>
      )}

      {variant === 'skills' && (
        <>
          {codeSnippets.map((snippet, i) => (
            <motion.span
              key={snippet}
              className="ambience__code"
              style={{
                top: `${8 + i * 13}%`,
                right: i % 2 === 0 ? '2%' : '6%',
              }}
              animate={{ opacity: [0.08, 0.22, 0.08], x: [0, i % 2 ? -6 : 6, 0] }}
              transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.5 }}
            >
              {snippet}
            </motion.span>
          ))}
          {symbols.map((sym, i) => (
            <motion.span
              key={sym}
              className="ambience__symbol"
              style={{
                bottom: `${10 + i * 14}%`,
                left: `${3 + (i * 5) % 12}%`,
              }}
              animate={{ rotate: [0, 8, -8, 0], opacity: [0.06, 0.18, 0.06] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 0.4 }}
            >
              {sym}
            </motion.span>
          ))}
          <div className="ambience__bracket ambience__bracket--tl">{'{'}</div>
          <div className="ambience__bracket ambience__bracket--br">{'}'}</div>
        </>
      )}

      {variant === 'projects' && (
        <>
          <motion.span
            className="ambience__diamond"
            style={{ top: '8%', left: '5%' }}
            animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="ambience__diamond ambience__diamond--sm"
            style={{ bottom: '15%', right: '4%' }}
            animate={{ rotate: [360, 0], y: [0, -12, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="ambience__ring"
            style={{ top: '40%', right: '-2%' }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.25, 0.12] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.span
            className="ambience__ring ambience__ring--sm"
            style={{ bottom: '25%', left: '2%' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          />
          <svg className="ambience__grid-corner" viewBox="0 0 120 120">
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 24}
                x2="120"
                y2={i * 24}
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.15"
              />
            ))}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`v-${i}`}
                x1={i * 24}
                y1="0"
                x2={i * 24}
                y2="120"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.15"
              />
            ))}
          </svg>
        </>
      )}

      {variant === 'experience' && (
        <>
          <div className="ambience__exp-grid" aria-hidden="true" />
          <motion.span
            className="ambience__orb ambience__orb--3"
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="ambience__orb ambience__orb--exp-2"
            animate={{ x: [0, -30, 25, 0], y: [0, 25, -15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="ambience__orb ambience__orb--exp-3"
            animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          {[...Array(18)].map((_, i) => (
            <motion.span
              key={i}
              className="ambience__dot ambience__dot--accent"
              style={{
                top: `${6 + (i * 5.2) % 88}%`,
                left: `${2 + (i * 7) % 12}%`,
              }}
              animate={{ opacity: [0.1, 0.45, 0.1], y: [0, -10, 0] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <motion.span
              key={`r-${i}`}
              className="ambience__dot"
              style={{
                top: `${10 + (i * 9) % 80}%`,
                right: `${3 + (i * 6) % 14}%`,
              }}
              animate={{ opacity: [0.08, 0.3, 0.08], x: [0, i % 2 ? 8 : -8, 0] }}
              transition={{ duration: 5 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          {['2023', '2024', '2025'].map((year, i) => (
            <motion.span
              key={year}
              className="ambience__year"
              style={{ top: `${18 + i * 32}%`, right: `${8 + i * 2}%` }}
              animate={{ opacity: [0.04, 0.12, 0.04] }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: i }}
            >
              {year}
            </motion.span>
          ))}
          <svg className="ambience__path-line ambience__path-line--left" viewBox="0 0 120 500">
            <motion.path
              d="M 100 0 C 40 120, 90 240, 30 360 S 10 500 10 500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3.5, ease: 'easeInOut' }}
            />
          </svg>
          <svg className="ambience__path-line" viewBox="0 0 200 600">
            <motion.path
              d="M 180 0 C 80 120, 160 280, 60 420 S 20 600 20 600"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 4, ease: 'easeInOut' }}
            />
          </svg>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="ambience__cross"
              style={{ top: `${12 + i * 18}%`, right: `${4 + (i % 2) * 4}%` }}
              animate={{ opacity: [0.08, 0.25, 0.08], rotate: [0, 45, 0] }}
              transition={{ duration: 5 + i * 2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
          <motion.span
            className="ambience__ring ambience__ring--exp"
            style={{ top: '15%', left: '8%' }}
            animate={{ rotate: [0, 360], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="ambience__diamond ambience__diamond--sm"
            style={{ bottom: '18%', right: '10%' }}
            animate={{ rotate: [0, 180, 360], y: [0, -15, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {variant === 'contact' && (
        <>
          <motion.span
            className="ambience__orb ambience__orb--4"
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          <motion.span
            className="ambience__pulse-ring"
            animate={{ scale: [0.8, 1.4], opacity: [0.2, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.span
            className="ambience__pulse-ring ambience__pulse-ring--delay"
            animate={{ scale: [0.8, 1.4], opacity: [0.15, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="ambience__dot ambience__dot--accent"
              style={{
                bottom: `${15 + i * 18}%`,
                right: `${5 + (i * 7) % 15}%`,
              }}
              animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.3, 1] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.6 }}
            />
          ))}
        </>
      )}
    </div>
  )
}
