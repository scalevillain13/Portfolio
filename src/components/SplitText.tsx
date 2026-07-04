import { createElement, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '../hooks/useMedia'

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p'
}

const WORD_STAGGER = 0.08
const WORD_DURATION = 0.7

export function SplitText({ text, className = '', delay = 0, as: Tag = 'h2' }: SplitTextProps) {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const words = text.split(' ')
  const totalDurationMs = (delay + words.length * WORD_STAGGER + WORD_DURATION) * 1000 + 200

  const isInView = useInView(rootRef, {
    once: true,
    amount: 0.2,
    margin: '0px 0px -10% 0px',
  })

  const [forceVisible, setForceVisible] = useState(false)

  useEffect(() => {
    if (reduced) return
    const timer = window.setTimeout(() => setForceVisible(true), totalDurationMs)
    return () => window.clearTimeout(timer)
  }, [reduced, totalDurationMs])

  const visible = reduced || isInView || forceVisible

  if (reduced) {
    return createElement(Tag, { className }, text)
  }

  return createElement(
    Tag,
    { ref: rootRef, className, 'aria-label': text },
    words.map((word, i) =>
      createElement(
        'span',
        { key: `${word}-${i}`, className: 'split-word-wrap' },
        createElement(
          motion.span,
          {
            className: 'split-word',
            initial: { y: '100%', opacity: 0 },
            animate: visible
              ? { y: '0%', opacity: 1 }
              : { y: '100%', opacity: 0 },
            transition: {
              duration: WORD_DURATION,
              delay: visible ? delay + i * WORD_STAGGER : 0,
              ease: [0.16, 1, 0.3, 1],
            },
          },
          word,
        ),
        i < words.length - 1 ? '\u00A0' : null,
      ),
    ),
  )
}
