import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { Preloader } from './components/Preloader'
import { CustomCursor } from './components/CustomCursor'
import { BackgroundEffects } from './components/BackgroundEffects'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Resume } from './components/Resume'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { SectionDivider } from './components/SectionDivider'
import { ScrollStage3D } from './components/ScrollStage3D'
import { LenisProvider } from './context/LenisContext'
import { useReducedMotion } from './hooks/useMedia'
import { useProjectRoute } from './hooks/useProjectRoute'

const ProjectDetail = lazy(() =>
  import('./components/ProjectDetail').then((module) => ({ default: module.ProjectDetail })),
)

function App() {
  const [loading, setLoading] = useState(true)
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)
  const { project, openProject, closeProject } = useProjectRoute()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const onResize = () => lenis.resize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    if (project) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [project])

  const lenisControl = useMemo(
    () => ({
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
      scrollTo: (y: number, options?: { immediate?: boolean }) =>
        lenisRef.current?.scrollTo(y, options),
    }),
    [],
  )

  return (
    <LenisProvider value={lenisControl}>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />
      <BackgroundEffects />
      <Navbar />

      <main className="scroll-canvas" style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <ScrollStage3D index={0}>
          <SectionDivider />
          <About />
        </ScrollStage3D>
        <ScrollStage3D index={1}>
          <SectionDivider />
          <Skills />
        </ScrollStage3D>
        <ScrollStage3D index={2}>
          <SectionDivider />
          <Projects onOpenProject={openProject} />
        </ScrollStage3D>
        <ScrollStage3D index={3}>
          <SectionDivider />
          <Experience />
        </ScrollStage3D>
        <ScrollStage3D index={4}>
          <SectionDivider />
          <Resume />
        </ScrollStage3D>
        <ScrollStage3D index={5}>
          <SectionDivider />
          <Contact />
        </ScrollStage3D>
      </main>

      <Footer />

      <AnimatePresence>
        {project && (
          <Suspense fallback={null}>
            <ProjectDetail
              key={project.id}
              project={project}
              onClose={closeProject}
              onNavigate={openProject}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </LenisProvider>
  )
}

export default App
