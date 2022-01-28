import Head from 'next/head'
import React from 'react'
import { SystemLayoutProps } from '../../../types/componentLayout'
import HeaderHome from '../../modules/header-home'
import Wrapper from './style'

const HomeLayout: React.FC<SystemLayoutProps> = ({
  children,
  title = 'VTech',
  icone = '/icon.svg',
}) => {
  return (
    <Wrapper>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>{title}</title>
        <link rel="icon" href={icone} />
      </Head>

      <main className="main-home">
        <HeaderHome />
        <div>{children}</div>
        {/* <footer>
          <h2>Rodape</h2>
        </footer> */}
      </main>
    </Wrapper>
  )
}

export default HomeLayout
