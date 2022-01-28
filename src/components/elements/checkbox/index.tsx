import React, { InputHTMLAttributes } from 'react'
import { CheckboxStyled, ContainerCheckbox } from './styles'

type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}
const Checkbox: React.FC<CheckBoxProps> = props => {
  const {
    onChange,
    value,
    name,
    onBlur,
    className,
    required,
    placeholder,
    checked,
    id,
    readOnly,
    onClick,
    disabled,
    style,
  } = props

  return (
    <ContainerCheckbox className={className} style={style}>
      <CheckboxStyled
        required={required}
        placeholder={placeholder}
        type="checkbox"
        onChange={onChange}
        onClick={onClick}
        checked={checked}
        value={value}
        id={id}
        readOnly={readOnly}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
      />

      <label className="gs-checkbox" htmlFor={id}>
        <span>
          <svg width="12px" height="10px" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <span className="titulo">{props.label}</span>
      </label>
    </ContainerCheckbox>
  )
}

Checkbox.defaultProps = {
  disabled: false,
  readOnly: false,
}

export default Checkbox
