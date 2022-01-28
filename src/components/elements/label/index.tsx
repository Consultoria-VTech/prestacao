import React from 'react'
import { FormLabelStyled, LabelStyled } from './styles'

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = props => {
  return <LabelStyled {...props} />
}

export const FormLabel: React.FC = ({ children }) => {
  return <FormLabelStyled>{children}</FormLabelStyled>
}

export default Label
