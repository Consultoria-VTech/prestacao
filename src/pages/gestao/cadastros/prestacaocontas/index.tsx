import { PageMenuContainer } from '@components'
import { PageProps } from '@types'
import { verifyAuth } from '@utils'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SystemLayout from '~/components/layout/system'
import TemplateDefault from '~/components/templates/default'
import { saveAccessData } from '~/services/authentication'
import { getPageConfiguration } from '~/services/pages'

const PrestacaoContaPage: NextPage<PageProps> = props => {
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

export default PrestacaoContaPage