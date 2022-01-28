import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePrevPropsAndState } from './usePrevPropsAndState'

export const useGetSnapshotBeforeUpdate = (cb, props, state) => {
  // get prev props and state
  const { prevProps, prevState } = usePrevPropsAndState(props, state)

  const snapshot = useRef(null)

  // getSnapshotBeforeUpdate (execute before the changes are comitted for painting! Before anythingg show on screen) - not run on mount + run on every update
  const componentJustMounted = useRef(true)
  useLayoutEffect(() => {
    if (!componentJustMounted.current) {
      // skip first run at mount
      snapshot.current = cb(prevProps, prevState)
    }
    componentJustMounted.current = false
  })

  // ________ a hook construction within a hook with closure __________
  const useComponentDidUpdate = cb => {
    // run after the changes are applied (commited) and apparent on screen
    useEffect(() => {
      if (!componentJustMounted.current) {
        // skip first run at mount
        cb(prevProps, prevState, snapshot.current)
      }
    })
  }
  // returning the ComponentDidUpdate hook!
  return useComponentDidUpdate
}