import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { ButtonStyled } from './styles'

export enum BUTTON_STATE {
  LOADING = 'loading',
  DISABLED = 'disabled',
  SUCCESS = 'success',
  ERROR = 'error',
  NOTHING = '',
}

export type ButtonDefaultSizeProps = {
  sizeButton: string
  sizeBorder: string
}

export type ButtonSize = 'sm' | 'md' | 'lg' | ButtonDefaultSizeProps

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  state?: BUTTON_STATE
  onSucess?: () => void
  onError?: () => void
  defaultSize?: ButtonDefaultSizeProps
  buttonSize?: ButtonSize
  tooltip?: string
}

const Button: React.FC<ButtonProps> = props => {
  const {
    onClick,
    children,
    className,
    style,
    type = 'button',
    disabled,
    defaultSize,
    buttonSize,
    tooltip,
  } = props

  const [coords, setCoords] = useState({ x: -1, y: -1 })
  const [isRippling, setIsRippling] = useState(false)
  const [stateButton, setStateButton] = useState(BUTTON_STATE.NOTHING)
  const [isLoading, setIsLoading] = useState(false)
  const [animateState, setAnimateState] = useState(false)

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true)
      setTimeout(() => setIsRippling(false), 300)
    } else setIsRippling(false)
  }, [coords])

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 })
  }, [isRippling])

  const buttonRef = useRef(null)

  useEffect(() => {
    switch (props.state) {
      case BUTTON_STATE.SUCCESS:
        setStateButton(BUTTON_STATE.SUCCESS)
        break
      case BUTTON_STATE.ERROR:
        setStateButton(BUTTON_STATE.ERROR)
        break
      case BUTTON_STATE.LOADING:
        setIsLoading(true)
        break
      case BUTTON_STATE.DISABLED:
        break
      case BUTTON_STATE.NOTHING:
        break
      default:
        break
    }

    if (
      props.state === BUTTON_STATE.SUCCESS ||
      props.state === BUTTON_STATE.ERROR
    ) {
      setTimeout(() => {
        setAnimateState(true)
      }, 100)
      setTimeout(() => {
        setStateButton(BUTTON_STATE.NOTHING)
        setIsLoading(false)
        setAnimateState(false)

        if (props.state === BUTTON_STATE.SUCCESS && props.onSucess)
          props.onSucess()

        if (props.state === BUTTON_STATE.ERROR && props.onError) props.onError()
      }, 1000)
    }
  }, [props.state])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.target as HTMLButtonElement

      if (isLoading || stateButton === BUTTON_STATE.LOADING) {
        return
      }

      const rect = target.getBoundingClientRect()
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })

      onClick && onClick(e)
    },
    [onClick, isLoading, stateButton]
  )

  let customSize: ButtonDefaultSizeProps = null
  switch (buttonSize) {
    case 'sm':
      customSize = {
        sizeButton: '18px',
        sizeBorder: '8px',
      }
      break
    case 'md':
      customSize = {
        sizeButton: '24.5px',
        sizeBorder: '11px',
      }
      break
    case 'lg':
      customSize = {
        sizeButton: '32px',
        sizeBorder: '14px',
      }
      break
    default:
      customSize = defaultSize
      break
  }

  return (
    <>
      <ButtonStyled
        data-tip={tooltip}
        // data-for="button"
        ref={buttonRef}
        onClick={handleClick}
        className={`${className} ${isLoading ? 'button-loading' : ''} ${
          stateButton === BUTTON_STATE.SUCCESS ? 'button-success' : ''
        } ${stateButton === BUTTON_STATE.ERROR ? 'button-error' : ''}`}
        buttonLoadingProps={customSize}
        style={style}
        disabled={disabled}
        type={type}>
        {isRippling ? (
          <span
            className="button-ripple"
            style={{
              left: coords.x,
              top: coords.y,
            }}
          />
        ) : (
          ''
        )}

        {isLoading && stateButton === BUTTON_STATE.SUCCESS && (
          <span
            className={`success ${
              animateState ? 'button-animation-state' : ''
            }`}>
            <svg width="26px" height="26px" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </span>
        )}

        {isLoading && stateButton === BUTTON_STATE.ERROR && (
          <span
            className={`error ${animateState ? 'button-animation-state' : ''}`}>
            <div className="in">
              <div className="button-block"></div>
              <div className="button-block"></div>
            </div>
            <div className="out">
              <div className="button-block"></div>
              <div className="button-block"></div>
            </div>
          </span>
        )}

        <span className="button-content">{children}</span>
      </ButtonStyled>
      <ReactTooltip
        // id="button"
        place="top"
        type="dark"
        effect="solid"
        multiline={true}
      />
    </>
  )
}

Button.defaultProps = {
  defaultSize: {
    sizeBorder: '14px',
    sizeButton: '32px',
  },
  buttonSize: 'lg',
}

export default Button
