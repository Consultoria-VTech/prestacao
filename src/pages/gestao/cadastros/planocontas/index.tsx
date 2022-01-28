import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SystemLayout from '../../../../components/layout/system'
import TemplateDefault from '../../../../components/templates/default'
import PlanoContasTemplate from '../../../../components/templates/plano-contas'
import { URL_API } from '../../../../services/api/api'
import { getPageConfiguration } from '../../../../services/pages'
import { PlanoContasPagination } from '../../../../types/models/planoContas'
import { PageProps } from '../../../../types/page'
import { verifyAuth } from '../../../../util/verifyAuth'
import { saveAccessData } from './../../../../services/authentication'

type PlanoContasPageProps = PageProps<PlanoContasPagination>

const PlanoContasPage: NextPage<PlanoContasPageProps> = props => {
  saveAccessData(props.user, props.refreshToken)
  const router = useRouter()
  const page = getPageConfiguration(router.pathname)

  return (
    <SystemLayout title={page.name}>
      <TemplateDefault page={page}>
        <PlanoContasTemplate data={props?.data} />
      </TemplateDefault>
    </SystemLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const retorno = await verifyAuth(context)
  const { auth, newAcessToken, refreshToken } = retorno
  let error = null

  try {
    const {
      idEmpresa,
      id,
      idPlanoContasSintetica,
      descricao,
      ativo,
      receitaOuDespesa,
    } = context.query

    const response = await axios.get(URL_API + '/api/planocontas', {
      headers: { Authorization: `${auth.authorizationString}` },
      params: {
        idEmpresa,
        id,
        idPlanoContasSintetica,
        descricao,
        ativo,
        receitaOuDespesa,
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

export default PlanoContasPage
