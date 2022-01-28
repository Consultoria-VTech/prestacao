import { Scrollbars } from 'rc-scrollbars'
import React, { HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { CSSProperties } from 'styled-components'
import { ThumbScroll, TrackScroll, ViewScroll } from './styles'

type ScrollbarProps = {
  children: ReactNode
  className?: string
  widthThumb?: number
  autoHideDuration?: number
  margin?: number
  autoHide?: boolean
  style?: CSSProperties
  disable?: boolean
}

export const renderTrack = (
  { style, ...props }: HTMLAttributes<HTMLDivElement>,
  margin: number,
  widthThumb?: number,
  disable = false
): JSX.Element => {
  return (
    <TrackScroll
      style={style}
      {...props}
      disable={disable}
      margin={margin}
      widthThumb={widthThumb}
    />
  )
}

export const renderThumb = (
  { style, ...props }: HTMLAttributes<HTMLDivElement>,
  widthThumb?: number,
  disable = false
): JSX.Element => {
  return (
    <ThumbScroll
      style={style}
      {...props}
      disable={disable}
      widthThumb={widthThumb}
    />
  )
}

export const renderView = (
  { style, ...props }: HTMLAttributes<HTMLDivElement>,
  disable = false
): JSX.Element => {
  return (
    <ViewScroll
      style={style}
      disable={disable}
      marginRight={style.marginRight}
      marginBottom={style.marginRight}
      // marginRight="-1rem"
      // marginBottom="-1rem"
      {...props}
      className="view"
    />
  )
}

export const Scrollbar: React.FC<ScrollbarProps> = ({
  children,
  className,
  widthThumb,
  autoHideDuration = 200,
  margin = 0,
  autoHide = true,
  style,
  disable = false,
}) => {
  const [desabilitar, setDesabilitar] = useState(disable)
  // useEffect(() => {
  //   const element = React.Children.map(children, (child, i) => {
  //     const el = React.cloneElement(child)
  //     return el
  //   })
  //   console.log(measureElement(element[0]), element[0])
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      setDesabilitar(disable)
    }, 200)
  }, [disable])

  return (
    <Scrollbars
      style={style}
      className={className}
      autoHide={autoHide}
      autoHideDuration={autoHideDuration}
      renderTrackHorizontal={props =>
        renderTrack(props, margin, widthThumb, desabilitar)
      }
      renderTrackVertical={props =>
        renderTrack(props, margin, widthThumb, desabilitar)
      }
      renderThumbHorizontal={props =>
        renderThumb(props, widthThumb, desabilitar)
      }
      renderThumbVertical={props => renderThumb(props, widthThumb, desabilitar)}
      renderView={props => renderView(props, desabilitar)}
      // autoHeightMin="2vh"
      // autoHeight={true}
      universal>
      {children}
    </Scrollbars>
  )
}
