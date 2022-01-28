import { ReactElement } from 'react'

export type ComponentProps = ReactElement & {
  message?: string
  sidebarState?: string | null | undefined
}
