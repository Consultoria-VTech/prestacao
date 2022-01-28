import { MutableRefObject, useEffect } from 'react'

export const useOutsideComponent = (
  ref: MutableRefObject<HTMLElement>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside, false)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false)
    }
  }, [ref, callback])
}
