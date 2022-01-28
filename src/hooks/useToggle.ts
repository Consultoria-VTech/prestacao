import { useCallback, useState } from 'react'

type ToggleProps = {
  isOpen: boolean
  toggle: () => void
}
export const useToggle = (initialValue = false): ToggleProps => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue)
  const toggle = useCallback(() => setIsOpen(isOpen => !isOpen), [])

  return {
    isOpen,
    toggle,
  }
}
