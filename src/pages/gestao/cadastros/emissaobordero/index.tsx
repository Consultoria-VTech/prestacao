import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SystemLayout from '../../../../components/layout/system'
import EmitirBorderoTemplate from '../../../../components/templates/emitir-bordero/index'
import TemplateDefault from '../../../../components/templates/default'
import { URL_API } from '../../../../services/api/api'
import { getPageConfiguration } from '../../../../services/pages'
import { ContasPagarPagination } from '../../../../types/models/contasPagar'
import { PageProps } from '../../../../types/page'
import { verifyAuth } from '../../../../util/verifyAuth'
import { saveAccessData } from './../../../../services/authentication'

type EmitirBorderoPageProps = PageProps<ContasPagarPagination>

const EmitirBorderoPage: NextPage<EmitirBorderoPageProps> = props => {
  saveAccessData(props.user, props.refreshToken)
  const router = useRouter()
  const page = getPageConfiguration(router.pathname)

  return (
    <SystemLayout title={page.name}>
      <TemplateDefault page={page}>
        <EmitirBorderoTemplate data={props?.data} />
      </TemplateDefault>
    </SystemLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const retorno = await verifyAuth(context)
  const { auth, newAcessToken, refreshToken } = retorno
  let error = null

  try {
    const { size, page } = context.query

    const response = await axios.get(URL_API + '/api/contaspagar', {
      headers: { Authorization: `${auth.authorizationString}` },
      params: {
        page,
        size,
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

export default EmitirBorderoPage
