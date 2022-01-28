import Head from 'next/head'
import React from 'react'
import { SystemLayoutProps } from '../../../types/componentLayout'
import { Scrollbar } from '../../elements/scrollbar'
import HeaderSystem from '../../modules/header'
import Sidebar from '../../modules/sidebar/index'
import Wrapper from './style'

const SystemLayout: React.FC<SystemLayoutProps> = ({
  children,
  title = 'VTech',
  icone = '/icon.svg',
}) => {
  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <link rel="icon" href={icone} />
      </Head>

      <Sidebar />
      <main className="main-system">
        <HeaderSystem />
        <Scrollbar widthThumb={10} className="container-system" margin={1}>
          <div>{children}</div>
        </Scrollbar>
      </main>
    </Wrapper>
  )
}

export default SystemLayout
