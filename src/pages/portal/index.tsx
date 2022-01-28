import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import PortalTemplate from '~/components/templates/portal'
import SystemLayout from '../../components/layout/system'
import { getPageConfiguration } from '../../services/pages'
import { PageProps } from '../../types/page'
import TemplateDefault from './../../components/templates/default'
import { useResize } from './../../hooks/useResize'
import { saveAccessData } from './../../services/authentication'
import { verifyAuth } from './../../util/verifyAuth'

const PortalPage: NextPage<PageProps> = props => {
  saveAccessData(props.user, props.refreshToken)

  const router = useRouter()
  const page = getPageConfiguration(router.pathname)
  const { screenWidth } = useResize()

  return (
    <SystemLayout title={page.name}>
      <TemplateDefault page={page}>
        <PortalTemplate />
      </TemplateDefault>
    </SystemLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const retorno = await verifyAuth(context)

  return {
    props: {
      user: retorno.auth.user,
      accessToken: retorno.newAcessToken,
      refreshToken: retorno.refreshToken,
    },
  }
}

export default PortalPage
