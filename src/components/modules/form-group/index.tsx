import { InputMask } from '@components'
import { FieldProps } from '@types'
import React, { ReactElement, ReactNode } from 'react'
import Input from '~/components/elements/input'
import Select from '~/components/elements/select'
import { FormHrStyled } from './styled'

type FormGroupProps = {
  children?: ReactNode
  className?: string
  formAlternative?: boolean
}

export interface FormGroupInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  messageError?: string | Date | null
  field?: FieldProps<T>
  isInvalid?: boolean
  classNameFormGroup?: string
  classNameInput?: string
  formAlternative?: boolean
  label?: string
  mask?: InputMask
}

interface FormGroupSelectProps<T>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  // icon?: ReactNode
  messageError?: string | Date | any
  field?: FieldProps<T>
  isInvalid?: boolean
  label?: string
}

type FormGroupCheckboxProps<T> = React.InputHTMLAttributes<HTMLInputElement> & {
  field?: FieldProps<T>
  label?: string
}

const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
  formAlternative = false,
}) => {
  return (
    <div className={`form-group py-1 ${className}`}>
      <div
        className={`${
          formAlternative
            ? 'input-group input-group-merge input-group-alternative'
            : ''
        } has-validation `}>
        {children}
      </div>
    </div>
  )
}

export const FormGroupInput = <
  T extends number | string | ReadonlyArray<string>
>({
  field,
  required,
  placeholder,
  type,
  icon,
  messageError,
  label,
  onChange,
  onBlur,
  name,
  value,
  isInvalid: isInvalidInput,
  classNameFormGroup,
  formAlternative = false,
  readOnly,
  maxLength,
  max,
  mask,
  classNameInput,
}: FormGroupInputProps<T>): ReactElement => {
  const isError = isInvalidInput || field?.isInvalid
  return (
    <FormGroup
      formAlternative={formAlternative}
      className={`${classNameFormGroup} ${isError ? 'has-danger' : ''}`}>
      {label && (
        <label
          htmlFor={name || field?.field?.name}
          className="form-control-label">
          {label}
        </label>
      )}
      {icon && (
        <div className="input-group-prepend">
          <span className="input-group-text">{icon}</span>{' '}
        </div>
      )}
      <div
        className={isError ? 'position-relative alert-validate' : ''}
        style={{ flex: 1 }}
        data-validate={messageError}>
        <Input
          className={`form-control ${classNameInput} ${
            isError ? 'pe-2-25 is-invalid' : ''
          }`}
          readOnly={readOnly}
          required={required}
          placeholder={placeholder}
          type={type}
          max={max}
          onChange={e => {
            if (onChange) onChange(e)
            else if (field?.setField)
              field?.setField(field?.field?.name, e.target.value)
            else field?.field?.onChange(e)
          }}
          value={value || field?.field?.value || '' }
          name={name || field?.field?.name}
          mask={mask}
          maxLength={maxLength}
          onBlur={onBlur || field?.field?.onBlur}
        />
      </div>

      {/* {(isInvalidInput || isInvalid) && (
        <span className="invalid-feedback">{messageError}</span>
      )} */}
    </FormGroup>
  )
}

export const FormGroupSelect = <T extends object | string | number | boolean>({
  field: { field, isInvalid, setField },
  required,
  placeholder,
  className,
  messageError,
  label,
  disabled,
  onChange,
  onBlur,
  name,
  value,
  children,
  isInvalid: isInvalidInput,
}: FormGroupSelectProps<T>): ReactElement => {
  const isError = isInvalidInput || isInvalid

  // const valueSelect = value || field.value?.toString() || ''
  return (
    <div
      className={`form-group py-1 ${className} ${isError ? 'has-danger' : ''}`}>
      {label && (
        <label htmlFor={name || field.name} className="form-control-label">
          {label}
        </label>
      )}
      <div
        className={isError ? 'position-relative alert-validate' : ''}
        style={{ flex: 1 }}
        data-validate={messageError}>
        <Select
          className={`form-control ${isError ? 'pe-2-25 is-invalid' : ''}`}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          onChange={e => {
            if (onChange) onChange(e)
            else if (setField) setField(field.name, e.target.value)
            else field.onChange(e)
          }}
          value={value || ''}
          name={name || field.name}
          onBlur={onBlur || field.onBlur}>
          {children}
        </Select>
      </div>
    </div>
  )
}

export const FormGroupSel = <T extends object | string | number | boolean>({
  field: { field, isInvalid, setField },
  required,
  placeholder,
  className,
  messageError,
  label,
  disabled,
  onChange,
  onBlur,
  name,
  value,
  children,
  isInvalid: isInvalidInput,
}: FormGroupSelectProps<T>): ReactElement => {
  const isError = isInvalidInput || isInvalid

  // const valueSelect = value || field.value?.toString() || ''
  return (
    <div
      className={`form-group py-1 ${className} ${isError ? 'has-danger' : ''}`}>
      {label && (
        <label htmlFor={name || field.name} className="form-control-label">
          {label}
        </label>
      )}
      <div
        className={isError ? 'position-relative alert-validate' : ''}
        style={{ flex: 1 }}
        data-validate={messageError}>
        <Select
          className={`form-control ${isError ? 'pe-2-25 is-invalid' : ''}`}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          onChange={e => {
            if (onChange) onChange(e)
            else if (setField) setField(field.name, e.target.value)
            else field.onChange(e)
          }}
          value={value || ''}
          name={name || field.name}
          onBlur={onBlur || field.onBlur}>
          {children}
        </Select>
      </div>
    </div>
  )
}

export const FormHr: React.FC = () => {
  return <FormHrStyled />
}

// export const FormGroupCheckbox = <T extends number | boolean>({
//   required,
//   field: { field = null },
//   placeholder,
//   checked,
//   label,

//   onChange,
//   onBlur,
//   name,
//   value,
//   id,
// }: FormGroupCheckboxProps<T>): ReactElement => {
//   return (
//     <div className="custom-control custom-control-alternative custom-checkbox mt-2">
//       {/* <Checkbox
//         required={required}
//         placeholder={placeholder}
//         onChange={onChange || field.onChange}
//         checked={checked || field.checked}
//         value={
//           value || typeof field.value !== 'boolean'
//             ? Number(field.value)
//             : field.value === true
//             ? 1
//             : 0
//         }
//         id={id}
//         name={name || field.name}
//         onBlur={onBlur || field.onBlur}
//       />
//       <Label className="custom-control-label ms-2" htmlFor={id}>
//         <span className="text-muted">{label}</span>
//       </Label> */}
//     </div>
//   )
// }

export default FormGroup
