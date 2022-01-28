import React from 'react'
import { BoxChartsStyled, BoxChartsStyledProps } from './styles'

type BoxChartsProps = BoxChartsStyledProps & {}

export const BoxCharts: React.FC<BoxChartsProps> = (t, width) => {
  return (
    <BoxChartsStyled />
  )
}
