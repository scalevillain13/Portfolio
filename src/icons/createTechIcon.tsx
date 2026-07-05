import type { ComponentType } from 'react'

type IconProps = { className?: string }

export function createTechIcon(path: string, viewBox = '0 0 24 24'): ComponentType<IconProps> {
  return function TechIcon({ className }: IconProps) {
    return (
      <svg className={className} viewBox={viewBox} fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    )
  }
}
