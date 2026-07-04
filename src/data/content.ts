export type Project = {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  longDescription: string
  problem: string
  tags: string[]
  stack: string[]
  color: string
  year: string
  liveUrl: string
  repoUrl?: string
  image: string
  gallery: string[]
  highlights: string[]
}

export const personal = {
  name: 'Александр',
  nameEn: 'Alexander',
  role: 'Fullstack Developer',
  age: 18,
  location: 'Москва',
  locationEn: 'Moscow',
  tagline: 'Создаю цифровые продукты на стыке дизайна и инженерии',
  email: 'tka4ev2301@mail.ru',
  phone: '+7 988 501 54 84',
  phoneHref: 'tel:+79885015484',
  telegram: '@vanlaviks',
  telegramUrl: 'https://t.me/vanlaviks',
  github: 'scalevillain13',
  githubUrl: 'https://github.com/scalevillain13',
  resumeUrl: './docs/resume_alexander.pdf',
} as const

export const about = {
  bio: `Мне 18, я fullstack-разработчик из Москвы. Уже сейчас строю полноценные веб-приложения — от интерфейса до серверной логики и деплоя. Мне важны чистый код, продуманная анимация и продукты, которыми приятно пользоваться.`,
  bioSecondary:
    'Каждый проект — возможность вырасти. Я не просто пишу код, а создаю опыт, который запоминается: плавные анимации, продуманный UX и архитектура, которая масштабируется.',
  bioThird:
    'Сейчас активно беру pet-проекты и фриланс-задачи: landing pages, dashboards, fullstack MVP. Люблю когда продукт выглядит так же круто, как работает под капотом.',
  quote: {
    text: 'Код — это инструмент. Продукт — это впечатление.',
    author: 'Alexander',
  },
  focusTags: ['React', 'TypeScript', 'PHP', 'Laravel', 'UI Motion', 'Docker'],
  stats: [
    { label: 'Возраст', value: 18, suffix: '' },
    { label: 'Проектов', value: 12, suffix: '+' },
    { label: 'Стек', value: 15, suffix: '+' },
    { label: 'Кофе в день', value: 3, suffix: '☕' },
  ],
}

export const skills = [
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'Figma', category: 'design' },
  { name: 'PHP', category: 'backend' },
  { name: 'Laravel', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'Docker', category: 'devops' },
  { name: 'Git', category: 'devops' },
  { name: 'Vite', category: 'tools' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'Redis', category: 'backend' },
]

export const projects: Project[] = [
  {
    id: '01',
    slug: 'cyberlearn',
    title: 'CyberLearn',
    tagline: 'Интерактивная платформа по кибербезопасности на русском языке',
    description:
      'Русскоязычная платформа по кибербезопасности с Docker-лабораториями, CTF-заданиями и системой рангов.',
    longDescription:
      'CyberLearn — первая полноценная русскоязычная платформа для обучения информационной безопасности в формате TryHackMe. Теория, квизы, практика в изолированных контейнерах и прогрессия от script_kiddie до fsociety_member — всё в одном продукте.',
    problem:
      'В Рунете не было качественной русскоязычной платформы с интерактивной практикой в InfoSec. Новичкам приходилось либо учить английский ради TryHackMe, либо читать устаревшие учебники без hands-on опыта.',
    tags: ['Next.js', 'TypeScript', 'Docker'],
    stack: ['Next.js', 'TypeScript', 'Docker', 'PostgreSQL', 'Redis', 'Vite'],
    color: '#34d399',
    year: '2026',
    liveUrl: 'https://cyberlearn-psi.vercel.app/',
    repoUrl: 'https://github.com/scalevillain13/cyberlearn',
    image: './images/cyberlearn.png',
    gallery: ['./images/cyberlearn.png'],
    highlights: [
      'Docker-лаборатории прямо в браузере',
      '38+ комнат и 5 треков обучения',
      'Система рангов, XP и CTF-флаги',
      'FREE tier и Premium-подписка',
    ],
  },
  {
    id: '02',
    slug: 'yoom-pro',
    title: 'yoom.pro',
    tagline: 'Витрина новостроек Сочи без посредников и устаревших объявлений',
    description:
      'Платформа подбора новостроек в Сочи — каталог без посредников, wizard из 4 шагов и SEO по районам.',
    longDescription:
      'yoom.pro — коммерческий продукт для рынка недвижимости Большого Сочи. Актуальные цены от застройщиков, понятный путь от выбора района до заявки на подборку и SEO-страницы под локальные поисковые запросы.',
    problem:
      'Рынок недвижимости Сочи перегружен посредниками, устаревшими объявлениями и непрозрачными ценами. Покупателям нужен честный каталог новостроек с быстрым подбором без лишних звонков.',
    tags: ['Laravel', 'React', 'PostgreSQL'],
    stack: ['Laravel', 'PHP', 'React', 'TypeScript', 'PostgreSQL'],
    color: '#c9a66b',
    year: '2025',
    liveUrl: 'https://yoom.pro',
    image: './images/yoom.png',
    gallery: ['./images/yoom.png'],
    highlights: [
      '4-шаговый wizard подбора квартиры',
      'Каталог по 5 районам Большого Сочи',
      'Фильтры по бюджету, метражу и комнатам',
      'SEO-оптимизация под локальные запросы',
    ],
  },
]

export const experience = [
  {
    period: '2023 — 2024',
    role: 'Junior Web Developer',
    company: 'Learning & Building',
    description:
      'Первые проекты на PHP и Laravel, основы веб-разработки, участие в хакатонах и построение fullstack-приложений.',
  },
  {
    period: '2025',
    role: 'Frontend Developer',
    company: 'Pet Projects & Open Source',
    description:
      'Pet-проекты на Laravel и React, open-source contributions, углубление в PHP-экосистему и современный frontend.',
  },
  {
    period: '2026 — наст. время',
    role: 'Freelance Fullstack Developer',
    company: 'Self-employed',
    description:
      'Разработка fullstack-приложений для клиентов на React + Laravel: от прототипа в Figma до production-деплоя.',
  },
]

export const navLinks = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Стек', href: '#skills' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Опыт', href: '#experience' },
  { label: 'Резюме', href: '#resume' },
  { label: 'Контакт', href: '#contact' },
]

const stackCategoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'DevOps',
  tools: 'Tools',
  design: 'Design',
}

export function getProjectById(id: string | null) {
  if (!id) return null
  return projects.find((p) => p.id === id) ?? null
}

export function getAdjacentProjects(id: string) {
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}

export function groupProjectStack(stack: string[]) {
  const groups = new Map<string, string[]>()

  for (const tech of stack) {
    const skill = skills.find((s) => s.name === tech)
    const category = skill?.category ?? 'tools'
    const label = stackCategoryLabels[category] ?? category
    const existing = groups.get(label) ?? []
    existing.push(tech)
    groups.set(label, existing)
  }

  return Array.from(groups.entries()).map(([label, items]) => ({ label, items }))
}
