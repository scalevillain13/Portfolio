import { type ComponentType } from 'react'
import { motion, useTransform, type MotionStyle, type MotionValue } from 'framer-motion'
import { personal } from '../data/content'
import { useNormalizedMouseMotion } from '../hooks/useMousePosition'
import { useIsMobile, useReducedMotion } from '../hooks/useMedia'
import {
  ReactIcon, TypeScriptIcon, JavaScriptIcon, PhpIcon, LaravelIcon, GitIcon,
  FigmaIcon, CssIcon, HtmlIcon, DockerIcon,
  MongoIcon, PostgresIcon, ViteIcon, NextIcon, GraphQLIcon, RedisIcon,
} from '../icons/TechIcons'
import './HeroOrbit.css'

type OrbitItem = {
  Icon: ComponentType<{ className?: string }>
  name: string
  angle: number
  radius: number
  size: number
  depth: number
  duration: number
  delay: number
  color: string
}

const orbitItems: OrbitItem[] = [
  { Icon: ReactIcon, name: 'React', angle: 0, radius: 180, size: 28, depth: 1, duration: 8, delay: 0, color: '#61DAFB' },
  { Icon: TypeScriptIcon, name: 'TS', angle: 25, radius: 200, size: 24, depth: 0.7, duration: 10, delay: 0.5, color: '#3178C6' },
  { Icon: JavaScriptIcon, name: 'JS', angle: 55, radius: 170, size: 26, depth: 0.9, duration: 9, delay: 1, color: '#F7DF1E' },
  { Icon: LaravelIcon, name: 'Laravel', angle: 80, radius: 210, size: 22, depth: 0.5, duration: 11, delay: 0.3, color: '#FF2D20' },
  { Icon: GitIcon, name: 'Git', angle: 110, radius: 190, size: 24, depth: 0.8, duration: 7, delay: 0.8, color: '#F05032' },
  { Icon: FigmaIcon, name: 'Figma', angle: 140, radius: 175, size: 22, depth: 0.6, duration: 12, delay: 1.2, color: '#F24E1E' },
  { Icon: CssIcon, name: 'CSS', angle: 170, radius: 205, size: 20, depth: 0.4, duration: 9.5, delay: 0.2, color: '#1572B6' },
  { Icon: HtmlIcon, name: 'HTML', angle: 200, radius: 185, size: 22, depth: 0.7, duration: 8.5, delay: 0.6, color: '#E34F26' },
  { Icon: DockerIcon, name: 'Docker', angle: 230, radius: 195, size: 24, depth: 0.85, duration: 10.5, delay: 1.5, color: '#2496ED' },
  { Icon: PhpIcon, name: 'PHP', angle: 260, radius: 168, size: 20, depth: 0.45, duration: 11.5, delay: 0.4, color: '#777BB4' },
  { Icon: MongoIcon, name: 'Mongo', angle: 290, radius: 208, size: 22, depth: 0.55, duration: 9, delay: 0.9, color: '#47A248' },
  { Icon: PostgresIcon, name: 'PG', angle: 320, radius: 178, size: 20, depth: 0.65, duration: 10, delay: 1.1, color: '#4169E1' },
  { Icon: ViteIcon, name: 'Vite', angle: 345, radius: 192, size: 22, depth: 0.75, duration: 8, delay: 0.7, color: '#646CFF' },
  { Icon: NextIcon, name: 'Next', angle: 15, radius: 220, size: 20, depth: 0.35, duration: 13, delay: 1.3, color: '#ffffff' },
  { Icon: GraphQLIcon, name: 'GQL', angle: 65, radius: 160, size: 18, depth: 0.3, duration: 11, delay: 0.1, color: '#E10098' },
  { Icon: RedisIcon, name: 'Redis', angle: 155, radius: 215, size: 20, depth: 0.5, duration: 12, delay: 1.4, color: '#DC382D' },
]

function OrbitIcon({
  item,
  index,
  mouseX,
  mouseY,
  parallax,
}: {
  item: OrbitItem
  index: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  parallax: boolean
}) {
  const rad = (item.angle * Math.PI) / 180
  const baseX = Math.cos(rad) * item.radius
  const baseY = Math.sin(rad) * item.radius
  const depthFactor = item.depth * 12

  const x = useTransform(mouseX, (value) => (parallax ? baseX + value * depthFactor : baseX))
  const y = useTransform(mouseY, (value) => (parallax ? baseY + value * depthFactor : baseY))

  return (
    <motion.div
      className="hero-orbit__icon"
      style={{
        x,
        y,
        zIndex: Math.round(item.depth * 10),
        '--icon-size': `${item.size}px`,
        '--icon-color': item.color,
        '--icon-blur': `${(1 - item.depth) * 2}px`,
        '--icon-opacity': 0.4 + item.depth * 0.6,
      } as MotionStyle}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 0.4 + item.depth * 0.6,
        scale: 0.7 + item.depth * 0.3,
      }}
      transition={{
        opacity: { delay: 2.4 + index * 0.05, duration: 0.5 },
        scale: { delay: 2.4 + index * 0.05, duration: 0.5 },
      }}
    >
      <motion.div
        className="hero-orbit__icon-inner"
        animate={parallax ? {
          y: [0, -8 - item.depth * 6, 4, 0],
          rotate: [0, item.depth * 5, -item.depth * 3, 0],
        } : undefined}
        transition={parallax ? {
          duration: item.duration,
          delay: item.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        } : undefined}
      >
        <item.Icon className="hero-orbit__icon-svg" />
      </motion.div>
    </motion.div>
  )
}

export function HeroOrbit() {
  const { x: mouseX, y: mouseY } = useNormalizedMouseMotion()
  const mobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const parallax = !mobile && !reducedMotion

  const avatarX = useTransform(mouseX, (value) => (parallax ? value * -8 : 0))
  const avatarY = useTransform(mouseY, (value) => (parallax ? value * -8 : 0))

  return (
    <div className="hero-orbit">
      <motion.div
        className="hero-orbit__avatar-wrap"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: avatarX, y: avatarY }}
      >
        <div className="hero-orbit__ring hero-orbit__ring--1" />
        <div className="hero-orbit__ring hero-orbit__ring--2" />
        <div className="hero-orbit__ring hero-orbit__ring--3" />
        <div className="hero-orbit__avatar">
          <img
            src="./images/avatar.jpg"
            alt={personal.name}
            className="hero-orbit__photo"
            loading="eager"
            decoding="async"
          />
          <div className="hero-orbit__avatar-glow" aria-hidden="true" />
        </div>
      </motion.div>

      {orbitItems.map((item, i) => (
        <OrbitIcon
          key={item.name}
          item={item}
          index={i}
          mouseX={mouseX}
          mouseY={mouseY}
          parallax={parallax}
        />
      ))}
    </div>
  )
}
