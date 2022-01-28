import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BiMenu } from 'react-icons/bi'
import { useApp } from '../../../context/appContext'
import { useAuth } from '../../../context/authContext'
import Button from '../../elements/button'
// const DynamicNavbarNotificacao = dynamic(
//   () => import('../../elements/navbar/navbar-notificacao'),
//   { ssr: false }
// )
// const DynamicNavbarUsuario = dynamic(
//   () => import('../../elements/navbar/navbar-usuario'),
//   { ssr: false }
// )
// const DynamicNavbarLogin = dynamic(
//   () => import('../../elements/navbar/navbar-login'),
//   { ssr:import Button from './../../elements/button/index';
//  false }import NavbarNotificacao from './../../elements/navbar/navbar-notificacao';
import NavbarNotification from '../navbar-notification/index'
import NavbarUsuario from '../navbar-user'
import { Navbar } from './styles'

const HeaderSystem: React.FC = () => {
  const { user } = useAuth()
  const { isFixed, isOpen, open, toggleFixedSidebar } = useApp()
  const router = useRouter()

  return (
    <Navbar
      className="navbar navbar-top bg-white navbar-expand navbar-light border-bottom"
      isFixed={isFixed}
      isOpen={isOpen}>
      <div className="container-fluid px-0 justify-content-start flex-nowrap">
        <Button className="sidebar-toggle pr-3" onClick={toggleFixedSidebar}>
          <BiMenu size="24px" />
        </Button>
        <div
          className={`collapse navbar-collapse container-fluid px-0`}
          suppressHydrationWarning={true}>
          <Link href="/">
            <a
              href="?"
              className={`navbar-brand ${
                isFixed || isOpen ? 'hideLogo' : ''
              }`}>
              <img
                src="/img/logo-light.svg"
                alt="VTech Consultoria"
                width="fill"
                height="fill"
                // loading="eager"
              />
            </a>
          </Link>

          {process.browser && (
            <>
              <NavbarNotification />
              <NavbarUsuario />
            </>
          )}
        </div>
      </div>
    </Navbar>
  )
}

export default HeaderSystem
