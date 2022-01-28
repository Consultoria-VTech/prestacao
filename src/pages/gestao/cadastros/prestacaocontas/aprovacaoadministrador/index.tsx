import { PrestacaoContasTemplate } from '@components'
import {
  PageProps,
  PrestacaoContasPagination,
  PrestacaoContasTipoEnum,
} from '@types'
import { verifyAuth } from '@utils'
import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SystemLayout from '~/components/layout/system'
import TemplateDefault from '~/components/templates/default'
import { URL_API } from '~/services/api/api'
import { saveAccessData } from '~/services/authentication'
import { getPageConfiguration } from '~/services/pages'

type PrestacaoContasPageProps = PageProps<PrestacaoContasPagination>

const AprovacaoAdministradorPage: NextPage<PrestacaoContasPageProps> =
  props => {
    saveAccessData(props.user, props.refreshToken)
    const router = useRouter()
    const page = getPageConfiguration(router.pathname)

    return (
      <SystemLayout title={page.name}>
        <TemplateDefault page={page}>
          <PrestacaoContasTemplate
            data={props?.data}
            tipo={PrestacaoContasTipoEnum.AprovacaoAdministrador}
          />
        </TemplateDefault>
      </SystemLayout>
    )
  }

export const getServerSideProps: GetServerSideProps = async context => {
  const retorno = await verifyAuth(context)
  const { auth, newAcessToken, refreshToken } = retorno
  let error = null

  try {
    const { size, page, id, idempresa } = context.query

    const response = await axios.get(URL_API + '/api/prestacaoContas', {
      headers: { Authorization: `${auth.authorizationString}` },
      params: {
        page,
        size,
        id,
        idempresa,
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

export default AprovacaoAdministradorPage