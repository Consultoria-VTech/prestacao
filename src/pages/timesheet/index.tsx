import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SystemLayout from '../../components/layout/system'
import TemplateDefault from '../../components/templates/default'
import TimeSheetTemplate from '../../components/templates/time-sheet/index'
import { URL_API } from '../../services/api/api'
import { getPageConfiguration } from '../../services/pages'
import { TimeSheetPagination } from '../../types/models/timeSheet'
import { PageProps } from '../../types/page'
import { verifyAuth } from '../../util/verifyAuth'
import { saveAccessData } from './../../services/authentication'

type TimeSheetPageProps = PageProps<TimeSheetPagination>

const TimeSheetPage: NextPage<TimeSheetPageProps> = props => {
  const { user, refreshToken, data } = props

  saveAccessData(user, refreshToken)
  const router = useRouter()
  const page = getPageConfiguration(router.pathname) // ver o que é

  return (
    <SystemLayout  title={page.name}>
      <TemplateDefault page={page}>
        <TimeSheetTemplate data={data} />
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

    const response = await axios.get(URL_API + '/api/timeSheet', {
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

export default TimeSheetPage