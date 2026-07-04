import { SplitText } from './SplitText'
import './SectionHeading.css'

type SectionHeadingProps = {
  label: string
  title: string
  subtitle?: string
}

export function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="section-label">{label}</p>
      <SplitText text={title} className="section-heading__title" as="h2" />
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  )
}
