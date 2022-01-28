import Link from 'next/link'
import React, { HTMLAttributes, ReactNode } from 'react'
import { Dropdown } from 'react-bootstrap-v5'
import { DropDownMenu } from '../../elements/dropdown-menu'
import { Scrollbar } from '../../elements/scrollbar'
import { NavbarListGroupStyled, NavbarStyled } from './styles'

// import { Container } from './styles';

type NavbarProps = HTMLAttributes<HTMLElement>

type NavbarHeaderProps = HTMLAttributes<HTMLElement> & {
  title: string
  href?: string
  contentLink?: ReactNode | string | number
}

const Navbar: React.FC<NavbarProps> = props => {
  return <NavbarStyled {...props}>{props.children}</NavbarStyled>
}

export const NavbarToggle: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className = ' ' }) => {
  return (
    <Dropdown.Toggle as="button" className="nav-link" bsPrefix={className}>
      {children}
    </Dropdown.Toggle>
  )
}

export const NavbarDropDownMenu: React.FC<NavbarProps> = ({
  children,
  className,
}) => {
  return (
    <Dropdown.Menu
      as={DropDownMenu}
      className={`dropdown-menu py-0 overflow-hidden ${className}`}>
      {children}
    </Dropdown.Menu>
  )
}

export const NavbarHeader: React.FC<NavbarHeaderProps> = ({
  title,
  children,
  className,
  href,
  contentLink,
}) => {
  return (
    <header className={className}>
      <h2>{title}</h2>
      {href && (
        <Link href={href}>
          <a href={href} className="text-primary text-muted text-sm">
            {contentLink}
          </a>
        </Link>
      )}
      {children}
    </header>
  )
}

export const NavbarListGroup: React.FC<
  React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ children }) => {
  return (
    <NavbarListGroupStyled className="list-group list-group-flush">
      <Scrollbar className="navbar-scroll" margin={2}>
        {children}
      </Scrollbar>
    </NavbarListGroupStyled>
  )
}

export default Navbar
