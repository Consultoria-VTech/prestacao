import Link from 'next/link'
import React, { ReactElement } from 'react'
import { Dropdown } from 'react-bootstrap-v5'
import { BiCog, BiExit, BiLockAlt, BiUser } from 'react-icons/bi'
import { useAuth } from '../../../context/authContext'
import { redirectLogout } from '../../../util/constants'
import { getFirstLetter } from '../../../util/stringUtil'
import Avatar from '../../elements/avatar'
import Navbar, {
  NavbarDropDownMenu,
  NavbarHeader,
  NavbarListGroup,
  NavbarToggle,
} from '../navbar/index'

const NavbarUsuario: React.FC = () => {
  const { auth, user } = useAuth()
  return (
    <Navbar className="navbar-nav align-items-center">
      <Dropdown as="li" className="nav-item dropdown">
        <NavbarToggle>
          <Avatar
            label={`${user?.nome} ${user.sobrenome || ''}`}
            iconOrText={
              getFirstLetter(user?.nome) + getFirstLetter(user?.sobrenome)
            }
          />
        </NavbarToggle>

        <NavbarDropDownMenu className="dropdown-menu-usuario">
          <NavbarHeader title="Bem Vindo!" />

          <NavbarListGroup>
            <NavbarUsuarioItem title="Meu perfil" href="/#" icon={<BiUser />} />
            <NavbarUsuarioItem
              title="Configurações"
              href="/#"
              icon={<BiCog />}
            />
            <NavbarUsuarioItem
              title="Alterar senha"
              href="/login"
              icon={<BiLockAlt />}
            />
            <NavbarUsuarioItem
              title="Sair"
              href={redirectLogout}
              onClick={() => auth.logout(true)}
              icon={<BiExit />}
            />
          </NavbarListGroup>
        </NavbarDropDownMenu>
      </Dropdown>
    </Navbar>
  )
}
type NavbarUsuarioItemProps = {
  href?: string
  icon: ReactElement
  title: string
  onClick?: () => void
}
const NavbarUsuarioItem: React.FC<NavbarUsuarioItemProps> = ({
  href,
  icon,
  title,
  onClick,
}) => {
  return (
    <Link href={href}>
      <a
        href={href}
        className="dropdown-item d-flex align-items-center"
        onClick={onClick}>
        <div className="row align-items-center">
          <div className="img">{icon}</div>
          <div className="col">
            <span>{title}</span>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default NavbarUsuario