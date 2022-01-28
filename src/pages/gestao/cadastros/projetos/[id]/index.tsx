import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import TemplateDefault from '../../../../../components/templates/default'
import { getPageConfiguration } from '../../../../../services/pages'
import { PageProps } from '../../../../../types/page'
import SystemLayout from './../../../../../components/layout/system/index'
import { PageMenuContainer } from './../../../../../components/modules/page-menu/index'
import { saveAccessData } from './../../../../../services/authentication'
import { verifyAuth } from './../../../../../util/verifyAuth'

const ProjetosInfoPage: NextPage<PageProps> = props => {
  saveAccessData(props.user, props.refreshToken)

  const router = useRouter()
  const page = getPageConfiguration(router.pathname)
  return (
    <SystemLayout title={page.name}>
      <TemplateDefault page={page}>
        <PageMenuContainer pages={page.subPages} />
      </TemplateDefault>
    </SystemLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const retorno = await verifyAuth(context)
  return {
    props: {},
    notFound: true,
  }

  // return {
  //   props: {
  //     user: retorno.user,
  //     accessToken: retorno.newAcessToken,
  //     refreshToken: retorno.refreshToken,
  //   },
  // }
}

export default ProjetosInfoPage