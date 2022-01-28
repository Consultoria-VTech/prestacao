import { GetServerSideProps, NextPage } from 'next'
import ServerCookie from 'next-cookies'
import React from 'react'
import LoginTemplate from '../../components/templates/login'
import { AuthToken } from '../../services/auth-token'
import { COOKIES, PageMain } from '../../util/constants'
import HomeLayout from './../../components/layout/home/index'

const LoginPage: NextPage = () => {
  return (
    <HomeLayout>
      <LoginTemplate />
    </HomeLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const token = ServerCookie(context)[COOKIES.authToken]
    const auth = new AuthToken(token)

    const isAuthenticad = !auth.isExpired

    if (isAuthenticad && context.req) {
      // context.res?.writeHead(302, { Location: PageMain.path })
      // context.res?.end()
      return {
        props: {},
        redirect: {
          destination: PageMain.path,
          permanent: false,
          // statusCode: 302,
        },
      }
    }

    // if (isAuthenticad) {
    //   return {
    //     props: {},
    //     redirect: {
    //       destination: PageMain.path,
    //       // permanent: true,
    //       statusCode: 302,
    //     },
    //   }
    // }
    // if (isAuthenticad) Router.push(PageMain.path)

    return { props: {} }
  } catch (e) {
    console.log('Erro Login', e)
    return { props: {} }
  }
}

export default LoginPage
