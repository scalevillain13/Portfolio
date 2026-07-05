import { createContext, useContext, type ReactNode } from 'react'

type LenisControl = {
  stop: () => void
  start: () => void
  scrollTo: (y: number, options?: { immediate?: boolean }) => void
}

const LenisContext = createContext<LenisControl | null>(null)

export function LenisProvider({
  value,
  children,
}: {
  value: LenisControl
  children: ReactNode
}) {
  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
}

export function useLenisControl() {
  return useContext(LenisContext)
}
