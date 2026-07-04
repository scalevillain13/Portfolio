import { useCallback, useEffect, useState } from 'react'
import { getProjectById, type Project } from '../data/content'

const HASH_PREFIX = '#project/'

export function useProjectRoute() {
  const [projectId, setProjectId] = useState<string | null>(() => parseHash())

  useEffect(() => {
    const onHashChange = () => setProjectId(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.body.style.overflow = projectId ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [projectId])

  const openProject = useCallback((id: string) => {
    window.location.hash = `project/${id}`
    setProjectId(id)
  }, [])

  const closeProject = useCallback(() => {
    const { pathname, search } = window.location
    window.history.replaceState(null, '', `${pathname}${search}`)
    setProjectId(null)
  }, [])

  const project: Project | null = getProjectById(projectId)

  return { projectId, project, openProject, closeProject }
}

function parseHash() {
  const hash = window.location.hash
  if (!hash.startsWith(HASH_PREFIX)) return null
  return hash.slice(HASH_PREFIX.length) || null
}
