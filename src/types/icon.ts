/* eslint-disable no-unused-vars */
import { ReactNode } from 'react'
import { IconContext } from 'react-icons/lib'
import { PositionEnum } from './enum/positionEnum'

export interface Icon extends IconContext {
  position?: PositionEnum | undefined | null
  hoverColor?: string | null
}

export enum ICON_LIBRARY {
  FONT_AWESOME = 'fa',
  IONICONS_4 = 'io',
  IONICONS_5 = 'io5',
  MATERIAL_DESIGN = 'md',
  TYPICONS = 'ti',
  GITHUB_OCTICONS = 'go',
  FEATHER = 'fi',
  GAME_ICONS = 'gi',
  WATHER_ICONS = 'wi',
  DEVICONS = 'di',
  ANT_DESIGN_ICONS = 'ai',
  BOOTSTRAP_ICONS = 'bs',
  REMIX_ICONS = 'ri',
  FLAT_COLOR_ICONS = 'fc',
  GROMMET_ICONS = 'gr',
  HEROICONS = 'hi',
  SIMPLE_ICONS = 'si',
  ICOMOON_FREE = 'im',
  BOX_ICONS = 'bi',
  CSS_GG = 'cg',
  VS_CODE_ICONS = 'vsc',
}

export type IconProps = {
  icon: string | ReactNode | IconProps
  size?: string
  color?: string
  iconLibrary?: ICON_LIBRARY
  className?: string
  as?: string
}
