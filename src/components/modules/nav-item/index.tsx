import Link from 'next/link'
import React from 'react'

export interface NavItemProps {
  link: string
  title?: string
}
export const NavItem: React.FC<NavItemProps> = props => {
  return (
    <li className="nav-item">
      <Link href={props.link}>
        <a href="?" className="nav-link" style={{ fontWeight: 'bold' }}>
          <span className="">{props.title}</span>
        </a>
      </Link>
    </li>
  )
}
