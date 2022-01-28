import { MutableRefObject, useEffect } from 'react'

export const useEnterComponent = (
  ref: MutableRefObject<HTMLElement>,
  callbackEnter: () => void,
  callbackLeave: () => void
): void => {
  useEffect(() => {
    const node = ref.current
    if (node) {
      // node.addEventListener('mouseenter', callbackEnter)
      node.addEventListener('mouseleave', callbackLeave)
      return () => {
        // node.removeEventListener('mouseenter', callbackEnter)
        // node.removeEventListener('mouseleave', callbackLeave)
      }
    }
  }, [ref.current, callbackEnter, callbackLeave])
}
