import React, { ReactElement } from 'react'
import { AvatarStyles } from './styles'

type AvatarProps = {
  label?: string | number
  iconOrText?: ReactElement | string
}
const Avatar: React.FC<AvatarProps> = ({ label, iconOrText }) => {
  return (
    <AvatarStyles className="media">
      <span className="avatar avatar-xs rounded-circle">{iconOrText}</span>
      <div className="media-body ms-2 d-none d-lg-block">
        <span className="mb-0 fw-bold">{label}</span>
      </div>
    </AvatarStyles>
  )
}

export default Avatar
