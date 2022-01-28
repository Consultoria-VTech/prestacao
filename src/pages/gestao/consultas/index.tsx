import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import ConsultasTemplate from '../../../components/templates/consultas'
import TemplateDefault from '../../../components/templates/default'
import { URL_API } from '../../../services/api/api'
import { getPageConfiguration } from '../../../services/pages'
import { ContasPagarPagination } from '../../../types/models/contasPagar'
import { ContasReceberPagination } from '../../../types/models/contasReceber'
import { PageProps } from '../../../types/page'
import SystemLayout from './../../../components/layout/system/index'
import { saveAccessData } from './../../../services/authentication'
import { verifyAuth } from './../../../util/verifyAuth'

type ConsultasPageProps = PageProps & {
  dataContasReceber?: ContasReceberPagination
  dataContasPagar?: ContasPagarPagination
}
const ConsultasPage: NextPage<ConsultasPageProps> = props => {
  saveAccessData(props.user, props.refreshToken)

  const router = useRouter()
  const page = getPageConfiguration(router.pathname)
  return (
    <SystemLayout title={page.name}>
      <TemplateDefault page={page}>
        <ConsultasTemplate
          dataContasReceber={props?.dataContasReceber}
          dataContasPagar={props?.dataContasPagar}
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
    const {
      idEmpresa,
      idNatureza,
      idFornecedor,
      idStatus,
      dtEmissaoInicial,
      dtEmissaoFinal,
      dtVencimentoInicial,
      dtVencimentoFinal,
      tipoDoc,
      nDoc,
      page,
      size,

      idPlanoContasCr,
      idClienteCr,
      idContratoCr,
      statusCr,
      dtEmissaoInicialCr,
      dtEmissaoFinalCr,
      dtVencimentoInicialCr,
      dtVencimentoFinalCr,
      tipoDocCr,
      nDocCr,
      emAtrasoCr,
      pageCr,
      sizeCr,
    } = context.query

    const responseContasReceber = await axios.get(
      URL_API + '/api/contasreceber',
      {
        headers: { Authorization: `${auth.authorizationString}` },
        params: {
          idEmpresa,
          idPlanoContasCr,
          idClienteCr,
          idContratoCr,
          statusCr,
          dtEmissaoInicialCr,
          dtEmissaoFinalCr,
          dtVencimentoInicialCr,
          dtVencimentoFinalCr,
          tipoDocCr,
          nDocCr,
          emAtrasoCr,
          pageCr,
          sizeCr,
        },
      }
    )
    const responseContasPagar = await axios.get(URL_API + '/api/contaspagar', {
      headers: { Authorization: `${auth.authorizationString}` },
      params: {
        idEmpresa,
        idNatureza,
        idFornecedor,
        idStatus,
        dtEmissaoInicial,
        dtEmissaoFinal,
        dtVencimentoInicial,
        dtVencimentoFinal,
        tipoDoc,
        nDoc,
        page,
        size,
      },
    })

    return {
      props: {
        user: auth.user,
        accessToken: newAcessToken,
        refreshToken: refreshToken,
        dataContasReceber: responseContasReceber?.data,
        dataContasPagar: responseContasPagar?.data,
      },
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

export default ConsultasPage
