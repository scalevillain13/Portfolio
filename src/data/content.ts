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
  liveUrl?: string
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
  focusTags: ['React', 'TypeScript', 'Tailwind CSS', 'PHP', 'Laravel', 'Docker'],
  stats: [
    { label: 'Возраст', value: 18, suffix: '' },
    { label: 'Проектов', value: 12, suffix: '+' },
    { label: 'Стек', value: 16, suffix: '+' },
    { label: 'Кофе в день', value: 3, suffix: '☕' },
  ],
}

export const languagesAndAi = {
  language: {
    name: 'English',
    level: 'Confident B1/B2',
    proficiency: 72,
    note: 'Уверенно читаю документацию, переписываюсь с командой и обсуждаю задачи на английском.',
  },
  aiTools: [
    {
      name: 'Cursor',
      description: 'Основная AI-IDE для быстрой разработки, рефакторинга и code review.',
      color: '#EDECEC',
    },
    {
      name: 'Claude',
      description: 'Архитектурные решения, сложная отладка и работа с большим контекстом.',
      color: '#D97757',
    },
    {
      name: 'Codex',
      description: 'Генерация и доработка кода, автоматизация рутинных dev-задач.',
      color: '#10A37F',
    },
  ],
} as const

export const skills = [
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
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
    tagline: 'Первая русскоязычная интерактивная платформа по кибербезопасности — аналог TryHackMe',
    description:
      'Обучение InfoSec с нуля: 5 треков, 38 комнат с теорией на русском, мини-игры, Docker-лаборатории и прогрессия рангов от script_kiddie до fsociety_member.',
    longDescription:
      'CyberLearn — fullstack edtech на Next.js 16 и PostgreSQL (Supabase): MDX-контент в базе через Prisma, NextAuth v5, 5 Docker-лабораторий с флагами CYBER{...}, 4 мини-игры (SQLi, XSS, Caesar, Linux), лидерборд, premium-треки и админ-панель. Тарифы FREE/PREMIUM с gating из БД, 4 темы оформления, сброс пароля через Resend. Деплой на Vercel с ISR и security audit.',
    problem:
      'В Рунете не было качественной русскоязычной платформы с интерактивной практикой в InfoSec. Новичкам приходилось либо учить английский ради TryHackMe, либо читать теорию без hands-on опыта, лабораторий и прогрессии.',
    tags: ['Next.js', 'TypeScript', 'Docker'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Docker', 'PostgreSQL', 'React'],
    color: '#34d399',
    year: '2026',
    liveUrl: 'https://cyberlearn-psi.vercel.app/profile',
    image: './images/cyberlearn.png',
    gallery: [
      './images/cyberlearn.png',
      './images/cy-1.png',
      './images/cy-4.png',
      './images/cy-5.png',
      './images/cy-6.png',
      './images/cy-7.png',
    ],
    highlights: [
      '5 треков и 38 комнат — free и premium-контент',
      '5 Docker-лабораторий с CTF-флагами и 4 мини-игры',
      'NextAuth, XP-ранги, лидерборд и 4 темы UI',
      'Vercel + Supabase, tier gating и rate limits',
    ],
  },
  {
    id: '02',
    slug: 'yoom-pro',
    title: 'yoom.pro',
    tagline: 'Полнофункциональный сайт агентства недвижимости в Сочи',
    description:
      'yoom.pro — полнофункциональный сайт агентства недвижимости в Сочи: каталог из 15+ жилых комплексов с умными фильтрами, картой и поиском, детальные страницы ЖК и квартир, личный кабинет, авторизация, избранное, ипотечный калькулятор, приём заявок и защищённая админ-панель. Адаптивная вёрстка, REST API на PHP + MySQL, SEO-оптимизация, чистые URL.',
    longDescription:
      'yoom.pro — коммерческий веб-сайт агентства недвижимости, специализирующегося на новостройках Сочи и пригородов (Адлер, Хоста, Лазаревское, Красная Поляна, центр). Многостраничное приложение без фреймворков: чистый HTML/CSS/vanilla JS на фронтенде и REST API на PHP + MySQL на бэкенде — деплой на shared-хостинг без Node.js. Полная разработка: вёрстка, клиентская логика (30+ модулей), серверное API, БД, SEO и Apache. Каталог с умной сортировкой и толерантным поиском, синхронизация списка и Yandex Maps, страницы ЖК с ипотечным калькулятором, личный кабинет с токен-авторизацией, избранное, заявки, админ-панель и Telegram-уведомления. Техническое SEO: Schema.org, sitemap, фасетные URL, critical CSS.',
    problem:
      'Агентству нужен был не шаблонный лендинг, а полноценный продукт: презентация 15+ ЖК, удобный подбор квартир с картой и фильтрами, личные кабинеты, сбор лидов для менеджеров и SEO под локальные запросы — при этом с простым деплоем на обычный хостинг без сложной инфраструктуры.',
    tags: ['PHP', 'JavaScript', 'HTML'],
    stack: ['PHP', 'JavaScript', 'HTML', 'CSS', 'Git'],
    color: '#c9a66b',
    year: '2025',
    liveUrl: 'https://yoom.pro/',
    image: './images/yoom.png',
    gallery: ['./images/yoom.png', './images/y-1.png'],
    highlights: [
      '15+ ЖК: фильтры, карта Yandex Maps, толерантный поиск',
      'Личный кабинет — авторизация, избранное, заявки',
      'REST API на PHP + MySQL, админ-панель, Telegram',
      'SEO: Schema.org, sitemap, фасетные URL, чистые адреса',
    ],
  },
  {
    id: '03',
    slug: 'resume-builder',
    title: 'CV Builder',
    tagline: 'Редактор резюме с live-preview и структурированными секциями',
    description:
      'Веб-приложение для создания резюме: форма редактирования, мгновенный предпросмотр и гибкие секции под опыт, навыки и проекты.',
    longDescription:
      'CV Builder — pet-проект для быстрого составления аккуратного резюме прямо в браузере. Режимы «Редактирование» и «Просмотр», секции с drag-and-drop, группы навыков, опциональные блоки и live-preview без перезагрузки страницы.',
    problem:
      'Готовые шаблоны в Word и PDF сложно править, а конструкторы резюме часто перегружены paywall или плохим UX. Нужен простой редактор с понятной структурой и мгновенным результатом.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    color: '#818cf8',
    year: '2026',
    liveUrl: 'https://scalevillain13.github.io/resume-builder/',
    repoUrl: 'https://github.com/scalevillain13/resume-builder',
    image: './images/resum.png',
    gallery: ['./images/resum.png', './images/resu-1.png'],
    highlights: [
      'Редактирование и просмотр в одном интерфейсе',
      'Секции: опыт, образование, навыки, проекты',
      'Переупорядочивание блоков и групп навыков',
      'Опциональные секции и загрузка фото',
    ],
  },
  {
    id: '04',
    slug: 'laravel-url-shortener',
    title: 'Сокращатель ссылок',
    tagline: 'Laravel-приложение для коротких ссылок, аналитики переходов и кабинета на Filament v3',
    description:
      'Сервис сокращения URL с редиректом, записью статистики (IP, геолокация, UTM) и управлением ссылками через Filament admin.',
    longDescription:
      'Полноценный Laravel 13 pet-проект: публичный лендинг для создания ссылок, редирект GET /{code} без блокировки БД, личный кабинет на Filament v3, REST API на Sanctum, QR-коды, Docker Compose и CI на GitHub Actions. Клики пишутся асинхронно через очередь, боты фильтруются, URL валидируются на безопасность.',
    problem:
      'Публичные сокращатели не дают контроля над данными и аналитикой, а простые pet-проекты редко покрывают production-сценарии: очереди, policy, rate limit, API и admin panel в одном продукте.',
    tags: ['Laravel', 'PHP', 'Docker'],
    stack: ['Laravel', 'PHP', 'Docker', 'Git', 'Redis'],
    color: '#f43f5e',
    year: '2026',
    liveUrl: 'https://scalevillain13.github.io/laravel-url-shortener/',
    repoUrl: 'https://github.com/scalevillain13/laravel-url-shortener',
    image: './images/url.png',
    gallery: ['./images/url.png', './images/url-1.png', './images/url-2.png'],
    highlights: [
      'Filament v3 — список ссылок, фильтры и статистика',
      'REST API (Sanctum) + асинхронная запись кликов',
      'Docker Compose, очереди и GitHub Actions CI',
      'UTM-метки, срок жизни ссылок и защита от ботов',
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
