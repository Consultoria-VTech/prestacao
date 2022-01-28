import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SystemLayout from '../../../../components/layout/system'
import TemplateDefault from '../../../../components/templates/default'
import { URL_API } from '../../../../services/api/api'
import { saveAccessData } from '../../../../services/authentication'
import { getPageConfiguration } from '../../../../services/pages'
import { ParametrosCobrancaPagination } from '../../../../types/models/parametrosCobranca'
import { PageProps } from '../../../../types/page'
import { verifyAuth } from '../../../../util/verifyAuth'
import ParametrosCobrancaTemplate from './../../../../components/templates/parametros-cobranca/index'

type ParametroCobrancaPageProps = PageProps<ParametrosCobrancaPagination>

const ParametroCobrancaPage: NextPage<ParametroCobrancaPageProps> = props => {
  saveAccessData(props.user, props.refreshToken)
  const router = useRouter()
  const page = getPageConfiguration(router.pathname)

  return (
    <SystemLayout title={page.name}>
      <TemplateDefault page={page}>
        <ParametrosCobrancaTemplate data={props?.data} />
      </TemplateDefault>
    </SystemLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const retorno = await verifyAuth(context)
  const { auth, newAcessToken, refreshToken } = retorno
  let error = null

  try {
    const { idEmpresa, id, descricao, ativo, tipo } = context.query

    const response = await axios.get(URL_API + '/api/parametrocobranca', {
      headers: { Authorization: `${auth.authorizationString}` },
      params: {
        idEmpresa,
        id,
        descricao,
        ativo,
        tipo,
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

export default ParametroCobrancaPage
