/* eslint-disable no-unused-vars */
import { ItemParams } from 'react-contexify'
import { ActionEnum } from './enum/actionEnum'
import { ContextMenuEnum } from './enum/contextMenuEnum'

export type ContextMenuItem<P = any, D = any> = {
  id: string
  onClick?: ({ event, triggerEvent, props, data }: ItemParams<P, D>) => void
  className?: string
  title: string
  data?: D
}

export type ContextMenuProps<P, D> = {
  id: ContextMenuEnum | string
  className?: string
  items: ContextMenuItem<P, D>[]
  animation?: string
  onHidden?: () => void
}

export type ContextMenuCustomProps<T = any> = {
  onItemClick: <D = T>(id: ActionEnum | string, data: D) => void
}

export type DisplayMenuProps<T = any> = {
  e: React.MouseEvent<HTMLElement>
  data: T
}

export type ContextMenuData<T = any> = {
  idContextMenu: ContextMenuEnum
  items: ContextMenuItem<T, any>[]
  displayMenu: ({ e, data }: DisplayMenuProps) => void
}