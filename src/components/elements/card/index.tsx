import React from 'react'
import { CSSProperties } from 'styled-components'
import { CardStyled } from './styles'

type CardProps = {
  style?: CSSProperties
  className?: string
}
export const Card: React.FC<CardProps> = ({ children, style, className }) => {
  return (
    <CardStyled className={`card ${className}`} style={style}>
      {children}
    </CardStyled>
  )
}