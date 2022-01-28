import React from 'react'
import { useAuth } from '~/context/authContext'
import { NavItem } from '@components'

const NavbarLogin: React.FC = () => {
  const { isAuthenticad } = useAuth()
  return (
    <ul className="navbar-nav align-items-center ms-auto me-md-0">
      {isAuthenticad && <NavItem link="/portal" title="Portal" />}
      <NavItem link="/#" title="Produtos" />
      <NavItem link="/#" title="Sobre" />
      <NavItem link="/#" title="Contato" />
      {!isAuthenticad && <NavItem link="/login" title="Entrar" />}
    </ul>
  )
}

export default NavbarLogin
