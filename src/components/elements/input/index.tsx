import React, {
  InputHTMLAttributes,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from 'react'
import { cep, cpfCnpj, currency, number, telephone, currencyNegative, } from './mask'
import { InputStyled } from './styles'

export type InputMask =
  | 'cep'
  | 'cpfCnpj'
  | 'telephone'
  | 'currency'
  | 'currencyNegative'
  | 'currencyModal'
  | 'number'
  | 'none'
  | RegExp
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  mask?: InputMask
}
const Input = React.forwardRef(
  (props: InputProps, ref: MutableRefObject<HTMLInputElement>) => {
    const {
      onChange,
      value,
      name,
      onBlur,
      onKeyDown,
      className,
      required,
      readOnly,
      placeholder,
      type,
      maxLength,
      mask = 'none',
      max,
      size,
    } = props

    const [newValue, setNewValue] = useState(value)
    const refTemp = useRef<HTMLInputElement>()

    const applyMask = useCallback(
      (e?: React.FormEvent<HTMLInputElement>, input?: HTMLInputElement) => {
        switch (mask) {
          case 'cep':
            cep(e)
            break
          case 'cpfCnpj':
            cpfCnpj(e, input)
            break
          case 'currency':
            currency(e, input)
            break
          case 'currencyModal':
            currency(e, input)
            break
          case 'currencyNegative':
            currencyNegative(e, input)
            break  
          case 'telephone':
            telephone(e, input)
            break
          case 'number':
            number(e, input, maxLength)
            break
          case 'none':
            break
          default:
            break
        }

        setNewValue(e?.currentTarget?.value || input?.value)
      },
      [mask]
    )

    const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
      applyMask(e)
    }, [])

    const handleChange = useCallback(e => {
      applyMask(e)
      if (onChange) onChange(e)
    }, [])

    const handleBlur = useCallback(e => {
      if (onBlur) onBlur(e)
    }, [])

    // React.useEffect(() => {
    //   if (value) {
    //     const input = ref?.current || refTemp?.current

    //     if (input) {
    //       console.log(value)
    //       applyMask(null, input)
    //     }
    //   }
    // }, [value, applyMask])

    return (
      <InputStyled
        ref={ref || refTemp}
        onKeyUp={handleKeyUp}
        className={className}
        required={required}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        value={value}
        name={name}
        readOnly={readOnly}
        onBlur={handleBlur}
        max={max}
        onLoad={applyMask}
        onKeyDown={onKeyDown}
        maxLength={maxLength}
      />
    )
  }
)
Input.displayName = 'Input'
export default Input
