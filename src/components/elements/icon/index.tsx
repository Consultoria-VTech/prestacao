import React from 'react'
import * as BoxIcons from 'react-icons/bi'
import * as Bootstrap from 'react-icons/bs'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'
import * as FontAwesome from 'react-icons/fa'
import * as GitHubIcons from 'react-icons/gi'
import * as GrommetIcons from 'react-icons/gr'
import * as IcoMoon from 'react-icons/im'
import * as IonIcons5 from 'react-icons/io5'
import * as MaterialDesign from 'react-icons/md'
import * as RemixIcons from 'react-icons/ri'
import { IconProps, ICON_LIBRARY } from '../../../types/icon'

const Icon = ({
  icon,
  size,
  color,
  iconLibrary = ICON_LIBRARY.BOX_ICONS,
  className,
  as = 'i',
}: IconProps): JSX.Element => {
  if (typeof icon !== 'string') {
    if ((icon as IconProps).icon !== undefined) {
      const iconElement = icon as IconProps

      if (className && !iconElement.className?.includes(className))
        iconElement.className = (iconElement.className || '') + className

      iconElement.size = iconElement.size || size
      iconElement.color = iconElement.color || color
      iconElement.iconLibrary = iconElement.iconLibrary || iconLibrary
      iconElement.as = iconElement.as || as
      return Icon(iconElement)
    } else {
      return React.createElement(
        as,
        { style: { fontSize: size, color: color }, className },
        icon
      )
      // <i style={{ fontSize: size, color: color }} className={className}>
      //   {icon}
      // </i>
    }
  }
  let lib: any = []
  switch (iconLibrary) {
    case ICON_LIBRARY.BOX_ICONS:
      lib = BoxIcons
      break
    case ICON_LIBRARY.FONT_AWESOME:
      lib = FontAwesome
      break
    case ICON_LIBRARY.BOOTSTRAP_ICONS:
      lib = Bootstrap
      break
    case ICON_LIBRARY.ICOMOON_FREE:
      lib = IcoMoon
      break
    case ICON_LIBRARY.MATERIAL_DESIGN:
      lib = MaterialDesign
      break
    case ICON_LIBRARY.IONICONS_5:
      lib = IonIcons5
      break
    case ICON_LIBRARY.GITHUB_OCTICONS:
      lib = GitHubIcons
      break
    case ICON_LIBRARY.GROMMET_ICONS:
      lib = GrommetIcons
      break
    case ICON_LIBRARY.REMIX_ICONS:
      lib = RemixIcons
      break
  }

  try {
    const iconConf = lib[icon]

    if (iconConf) {
      const iconElement = React.createElement(iconConf)
      const Container = React.createElement(
        as,
        { style: { fontSize: size, color: color }, className },
        iconElement
      )
      return Container
      // <i style={{ fontSize: size, color: color }} className={className}>
      //   {iconElement}
      // </i>
    }

    return <BsFillExclamationTriangleFill size={size} color="red" />
  } catch (e) {
    console.error(e)
    return <BsFillExclamationTriangleFill size={size} color="red" />
  }
}

export default Icon
