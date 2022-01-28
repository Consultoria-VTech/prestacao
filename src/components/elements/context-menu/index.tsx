import React from 'react'
import { Item } from 'react-contexify'
import { ContextMenuProps } from '../../../types/context-menu'
import { ContextMenuStyled } from './styles'

const ContextMenu = <P, D>({
  id,
  className,
  items,
  animation = 'scale',
  onHidden,
}: ContextMenuProps<P, D>): JSX.Element => {
  return (
    <ContextMenuStyled
      id={id}
      className={`context-menu ${className || ''}`}
      onHidden={onHidden}
      animation={animation}>
      {items.map(item => {
        return (
          <Item
            key={item.id}
            id={item.id}
            data={item?.data}
            onClick={item.onClick}
            className={`context-menu-item ${item.className || ''}`}>
            {item.title}
          </Item>
        )
      })}
    </ContextMenuStyled>
  )
}

export default ContextMenu
