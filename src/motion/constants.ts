export const EASE_CURVE = [0.16, 1, 0.3, 1] as const

export const STAGE_SPRING = {
  stiffness: 175,
  damping: 34,
  mass: 0.48,
  restDelta: 0.0004,
} as const

export const DEPTH_SPRING = {
  stiffness: 140,
  damping: 30,
  mass: 0.55,
  restDelta: 0.0004,
} as const

export const TILT_SPRING = {
  stiffness: 260,
  damping: 32,
  mass: 0.35,
} as const

export const MOUSE_SPRING = {
  stiffness: 80,
  damping: 20,
  mass: 0.4,
} as const

export const CURSOR_SPRING = {
  damping: 28,
  stiffness: 350,
  mass: 0.5,
} as const

export const CURSOR_RING_SPRING = {
  damping: 22,
  stiffness: 200,
  mass: 0.5,
} as const
