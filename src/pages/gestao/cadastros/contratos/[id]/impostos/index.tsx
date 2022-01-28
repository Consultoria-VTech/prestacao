import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SystemLayout from '../../../../../../components/layout/system/index'
import TemplateDefault from '../../../../../../components/templates/default'
import { saveAccessData } from '../../../../../../services/authentication'
import { getPageConfiguration } from '../../../../../../services/pages'
import { ContratoImpostoPagination } from '../../../../../../types/models/contratoImposto'
import { PageProps } from '../../../../../../types/page'
import ContratoImpostoTemplate from './../../../../../../components/templates/contrato-imposto/index'
import { URL_API } from './../../../../../../services/api/api'
import { verifyAuth } from './../../../../../../util/verifyAuth'

type ContratoImpostoPageProps = PageProps<ContratoImpostoPagination>
const ContratosImpostosPage: NextPage<ContratoImpostoPageProps> = props => {
  saveAccessData(props.user, props.refreshToken)
  const router = useRouter()

  const page = getPageConfiguration(router.pathname)

  return (
    <SystemLayout title={page?.name}>
      <TemplateDefault page={page}>
        <ContratoImpostoTemplate data={props?.data} />
      </TemplateDefault>
    </SystemLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const retorno = await verifyAuth(context)
  const { auth, newAcessToken, refreshToken } = retorno
  let error = null

  try {
    const { size, page, idImposto, id } = context.query

    const response = await axios.get(URL_API + '/api/contratosimpostos', {
      headers: { Authorization: `${auth.authorizationString}` },
      params: {
        page,
        size,
        idContrato: id,
        idImposto,
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

export default ContratosImpostosPage
