import React, { useRef, useState } from 'react'
import { useContextMenu } from 'react-contexify'
import { ContextMenuItem } from '../../../types/context-menu'
import ContextMenu from '../context-menu'
import { useResize } from './../../../hooks/useResize'
import { DropdownStyles } from './styles'

type DropdownProps = {
  id: string
  value: ContextMenuItem
  items: ContextMenuItem[]
  label?: string
}

type MenuPositionProps = {
  x: number
  y: number
}

const Dropdown: React.FC<DropdownProps> = ({ id, value, items }) => {
  const [isVisible, setVisibility] = useState(false)
  const MenuPosition = useRef<MenuPositionProps>({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLButtonElement>()
  const { show, hideAll } = useContextMenu({ id })

  const { rect } = useResize(triggerRef)

  const getMenuPosition = (): MenuPositionProps => {
    const { left, bottom, y, x } = triggerRef.current.getBoundingClientRect()

    // console.log(left, bottom, y, x)
    MenuPosition.current = { x: left, y: 566 }

    return MenuPosition.current
  }

  const handleMenuTrigger = e => {
    if (isVisible) {
      setVisibility(false)
      hideAll()
      return
    }

    setVisibility(true)
    show(e, {
      position: getMenuPosition(),
    })
  }

  const handleKeyboard = e => {
    switch (e.key) {
      case 'Enter':
        setVisibility(true)
        show(e, {
          position: getMenuPosition(),
        })
        break
      case 'Escape':
        if (isVisible) {
          setVisibility(false)
          hideAll()
        }
        break
      default:
        break
    }
  }

  const clearVisibility = () => {
    setVisibility(false)
  }

  return (
    <DropdownStyles>
      {/* <label htmlFor={`label-${id}`} className={styles.label}>
        {label}
      </label> */}
      <button
        id={`label-${id}`}
        onClick={handleMenuTrigger}
        onKeyDown={handleKeyboard}
        tabIndex={0}
        ref={triggerRef}
        aria-haspopup="true"
        aria-expanded={isVisible}>
        <span>{value.title}</span>
        <span>{/* <Chevron direction={isVisible ? 'up' : 'down'} /> */}</span>
      </button>
      <ContextMenu
        id={id}
        animation="fade"
        items={items}
        onHidden={clearVisibility}
      />
    </DropdownStyles>
  )
}

export default Dropdown
