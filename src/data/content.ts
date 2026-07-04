export type Project = {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  stack: string[]
  color: string
  year: string
  liveUrl: string
  repoUrl: string
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
    slug: 'nebula-commerce',
    title: 'Nebula Commerce',
    description:
      'Fullstack e-commerce платформа с real-time инвентарём, Stripe-платежами и админ-панелью.',
    longDescription:
      'Nebula Commerce — полноценный e-commerce продукт с каталогом, корзиной, checkout и админ-панелью. Real-time обновление остатков, Stripe-платежи, роли пользователей и аналитика продаж. Backend на Laravel с REST API и очередями.',
    tags: ['React', 'Laravel', 'PostgreSQL'],
    stack: ['React', 'TypeScript', 'Laravel', 'PHP', 'PostgreSQL', 'Stripe', 'Docker', 'Redis'],
    color: '#eb8d5c',
    year: '2025',
    liveUrl: 'https://example.com/nebula-commerce',
    repoUrl: 'https://github.com/scalevillain13/nebula-commerce',
    highlights: [
      'Real-time inventory sync',
      'Stripe checkout flow',
      'Admin analytics dashboard',
      'Role-based access control',
    ],
  },
  {
    id: '02',
    slug: 'pulse-analytics',
    title: 'Pulse Analytics',
    description:
      'Dashboard для визуализации метрик с кастомными графиками, WebSocket-стримингом и dark mode.',
    longDescription:
      'Pulse Analytics — интерактивный dashboard для мониторинга метрик в реальном времени. Кастомные D3-графики, WebSocket-стриминг данных, фильтры по периодам и полноценный dark mode. API и стриминг реализованы на Laravel.',
    tags: ['TypeScript', 'D3.js', 'WebSocket'],
    stack: ['TypeScript', 'React', 'D3.js', 'WebSocket', 'Laravel', 'PHP', 'Vite'],
    color: '#c9a66b',
    year: '2025',
    liveUrl: 'https://example.com/pulse-analytics',
    repoUrl: 'https://github.com/scalevillain13/pulse-analytics',
    highlights: [
      'Live metric streaming',
      'Custom D3 visualizations',
      'Period filters & exports',
      'Adaptive dark theme',
    ],
  },
  {
    id: '03',
    slug: 'vault-notes',
    title: 'Vault Notes',
    description:
      'End-to-end encrypted note-taking app с markdown, тегами и синхронизацией между устройствами.',
    longDescription:
      'Vault Notes — зашифрованное приложение для заметок с markdown-редактором, тегами и синхронизацией между устройствами. E2E шифрование, офлайн-режим и быстрый поиск. Backend — Laravel API с авторизацией и синхронизацией.',
    tags: ['Next.js', 'Laravel', 'MongoDB'],
    stack: ['Next.js', 'TypeScript', 'Laravel', 'PHP', 'MongoDB', 'Auth.js'],
    color: '#d4846a',
    year: '2024',
    liveUrl: 'https://example.com/vault-notes',
    repoUrl: 'https://github.com/scalevillain13/vault-notes',
    highlights: [
      'End-to-end encryption',
      'Markdown editor',
      'Cross-device sync',
      'Tag-based organization',
    ],
  },
  {
    id: '04',
    slug: 'orbit-social',
    title: 'Orbit Social',
    description:
      'Минималистичная социальная сеть для dev-сообщества с live-чатом и code snippets.',
    longDescription:
      'Orbit Social — платформа для dev-сообщества с профилями, лентой, live-чатом и встроенными code snippets. GraphQL API на Laravel, Redis для real-time и модерация контента.',
    tags: ['React', 'Laravel', 'Redis'],
    stack: ['React', 'GraphQL', 'Redis', 'Laravel', 'PHP', 'PostgreSQL'],
    color: '#e8b86d',
    year: '2024',
    liveUrl: 'https://example.com/orbit-social',
    repoUrl: 'https://github.com/scalevillain13/orbit-social',
    highlights: [
      'Live community chat',
      'Syntax-highlighted snippets',
      'GraphQL API layer',
      'Real-time notifications',
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
  { label: 'Контакт', href: '#contact' },
]

export function getProjectById(id: string | null) {
  if (!id) return null
  return projects.find((p) => p.id === id) ?? null
}
