import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SystemLayout from '../../../../components/layout/system'
import ConciliacaoBancariaTemplate from '../../../../components/templates/conciliacao-bancaria'
import TemplateDefault from '../../../../components/templates/default'
import { URL_API } from '../../../../services/api/api'
import { saveAccessData } from '../../../../services/authentication'
import { getPageConfiguration } from '../../../../services/pages'
import { ConciliacaoPagination } from '../../../../types/models/conciliacao'
import { PageProps } from '../../../../types/page'
import { verifyAuth } from '../../../../util/verifyAuth'

type ConciliacaoPageProps = PageProps<ConciliacaoPagination>

const ConciliacaoBancariaPage: NextPage<ConciliacaoPageProps> = props => {
  saveAccessData(props.user, props.refreshToken)
  const router = useRouter()
  const page = getPageConfiguration(router.pathname)

  return (
    <SystemLayout title={page.name}>
      <TemplateDefault page={page}>
        <ConciliacaoBancariaTemplate />
      </TemplateDefault>
    </SystemLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const retorno = await verifyAuth(context)
  const { auth, newAcessToken, refreshToken } = retorno

  let error = null

  try {
    const { size, page, name, bankId } = context.query

    const response = await axios.get(URL_API + '/api/contasreceber', {
      headers: { Authorization: `${auth.authorizationString}` },
      params: {
        page,
        size,
        name,
        bankId,
      },
    })

    if (response?.data) {
      return {
        props: {
          user: auth.user,
          accessToken: newAcessToken,
          refreshToken: refreshToken,
          data: response.data,
        },
      }
    }
  } catch (e) {
    error = e.message
    console.log(error)
  }

  return {
    props: {
      error,
      user: auth.user,
      accessToken: newAcessToken,
      refreshToken: refreshToken,
    },
  }
}

export default ConciliacaoBancariaPage
