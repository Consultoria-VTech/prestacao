import { MutableRefObject, useCallback, useEffect, useState } from 'react'

type ResizeProps = {
  rect: {
    width: number
    height: number
    left: number
    right: number
    top: number
    bottom: number
  }
  screenWidth: number
  screenHeight: number
  ratiowh: number
  ratiohw: number
}
export const useResize = (
  element?: MutableRefObject<HTMLElement>
): ResizeProps => {
  let [{ screenWidth, screenHeight, ratiowh, ratiohw, rect }, setState] =
    useState({
      screenWidth: 0,
      screenHeight: 0,
      ratiowh: 0,
      ratiohw: 0,
      rect: undefined,
    })

  const onResize = useCallback(() => {
    screenWidth = window.innerWidth
    screenHeight = window.innerHeight
    ratiowh = screenWidth / screenHeight
    ratiohw = screenHeight / screenWidth

    if (element && element.current) {
      // rect = element.current.getBoundingClientRect();
      const clientRect = element.current.getBoundingClientRect()
      // DOM API does not allow for a shallow copy, so we have to manually set them
      rect = {
        width: clientRect.width,
        height: clientRect.height,
        left: clientRect.left,
        right: clientRect.right,
        top: clientRect.top,
        bottom: clientRect.bottom,
      }
    }

    setState({ screenWidth, screenHeight, ratiowh, ratiohw, rect })
  }, [element])

  // useEffect(() => {
  //   if (element && element.current) onResize()
  // }, [onResize, element])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    onResize()
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  return { screenWidth, screenHeight, ratiowh, ratiohw, rect }
}
