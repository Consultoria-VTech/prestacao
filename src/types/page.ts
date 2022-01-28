import { NextPageContext } from 'next'
import { ReactElement, ReactNode } from 'react'
import { AuthProps } from './auth'
import { IconProps } from './icon'
import { RefreshToken, Usuario } from './models/usuario'

export type PageSize = 'small' | 'medium' | 'large'
export type PageStyle = 'default' | 'decored'

export type Page = {
  main?: boolean
  name: string
  path: string
  descriptionFullPath?: string
  icon?: IconProps | ReactNode | string | null
  description?: string | null
  show: boolean
  size?: PageSize
  style?: PageStyle
  admin?: boolean

  subPages?: Page[]
}

export interface PageProps<T = any>
  extends AuthProps,
    ReactElement,
    NextPageContext {
  message?: string
  error?: any
  sidebarState?: string
  context: NextPageContext
  user?: Usuario
  accessToken?: string
  refreshToken?: RefreshToken
  data?: T
}
