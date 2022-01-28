import Link from 'next/link'
import React from 'react'
import NavbarLogin from './../navbar/navbar-login'
import { Navbar } from './styles'

const HeaderHome: React.FC = () => {
  return (
    <Navbar className="navbar navbar-top bg-white navbar-expand navbar-light border-bottom shadow-lg">
      <div className="container-fluid px-0 justify-content-start flex-nowrap">
        <div
          className={`collapse navbar-collapse container-fluid px-0`}
          suppressHydrationWarning={true}>
          <Link href="/">
            <a href="?" className="navbar-brand">
              <img
                src="/img/logo-light.svg"
                alt="VTech Consultoria"
                width="fill"
                height="fill"
                // loading="eager"
              />
              {/* <img src="./img/logo-light.svg" alt="VTech Consultoria" /> */}
            </a>
          </Link>

          {process.browser && (
            <>
              <NavbarLogin />
            </>
          )}
        </div>
      </div>
    </Navbar>
  )
}

export default HeaderHome
