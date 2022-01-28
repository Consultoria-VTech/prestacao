import React, { SelectHTMLAttributes } from 'react'
import { SelectStyled } from './styles'

// import { Container } from './styles';

const Select: React.FC<SelectHTMLAttributes<HTMLSelectElement>> = props => {
  const {
    onChange,
    onBlur,
    required,
    value,
    placeholder,
    children,
    disabled,
    name,
    className,
  } = props

  return (
    <SelectStyled
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      disabled={disabled}
      required={required}
      name={name}
      valueISEmptyOrNull={!value || value <= 0}
      className={className}
      placeholder={placeholder}>
      {children}
    </SelectStyled>
  )
}

export default Select
