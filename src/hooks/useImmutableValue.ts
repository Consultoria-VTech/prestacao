import { useCallback, useEffect, useRef } from 'react'

type useImmutableValueData<T> = {
  immutableValue: T
  updateValue: (newValue: T) => void
}
export const useImmutableValue = <T>(value: T): useImmutableValueData<T> => {
  const ref = useRef<T>()

  const updateValue = useCallback((newValue: T) => {
    ref.current = newValue
  }, [])

  useEffect(() => {
    if (value) ref.current = value
  }, [value])

  return { immutableValue: ref.current, updateValue }
}
