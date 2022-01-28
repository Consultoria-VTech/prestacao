import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SystemLayout from '../../../components/layout/system'
import { PageMenuContainer } from '../../../components/modules/page-menu'
import TemplateDefault from '../../../components/templates/default'
import { getPageConfiguration } from '../../../services/pages'
import { PageProps } from '../../../types/page'
import { verifyAuth } from '../../../util/verifyAuth'
import { saveAccessData } from './../../../services/authentication'

const CadastrosPage: NextPage<PageProps> = props => {
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
    props: {
      user: retorno.auth.user,
      accessToken: retorno?.newAcessToken,
      refreshToken: retorno?.refreshToken,
    },
  }
}

export default CadastrosPage
