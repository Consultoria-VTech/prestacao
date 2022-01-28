import React from 'react'
import { TitleStyled, TitleStyledProps } from './styles'

type TitleProps = TitleStyledProps & {
  text?: string
}
export const Title: React.FC<TitleProps> = ({ text, fontSize, margin }) => {
  return (
    <TitleStyled fontSize={fontSize} margin={margin}>
      {text}
    </TitleStyled>
  )
}
