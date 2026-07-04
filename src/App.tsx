import { useEffect, useState } from 'react'
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
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { SectionDivider } from './components/SectionDivider'
import { ProjectDetail } from './components/ProjectDetail'
import { useReducedMotion } from './hooks/useMedia'
import { useProjectRoute } from './hooks/useProjectRoute'

function App() {
  const [loading, setLoading] = useState(true)
  const reducedMotion = useReducedMotion()
  const { project, openProject, closeProject } = useProjectRoute()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [reducedMotion])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />
      <BackgroundEffects />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects onOpenProject={openProject} />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />

      <AnimatePresence>
        {project && (
          <ProjectDetail key={project.id} project={project} onClose={closeProject} />
        )}
      </AnimatePresence>
    </>
  )
}

export default App
