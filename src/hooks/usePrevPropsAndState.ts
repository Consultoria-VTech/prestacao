import { useEffect, useRef } from 'react'

export const usePrevPropsAndState = (props: any, state: any) => {
  const prevPropsAndStateRef = useRef({ props: null, state: null })
  const prevProps = prevPropsAndStateRef.current.props
  const prevState = prevPropsAndStateRef.current.state

  useEffect(() => {
    prevPropsAndStateRef.current = { props, state }
  })

  return { prevProps, prevState }
}