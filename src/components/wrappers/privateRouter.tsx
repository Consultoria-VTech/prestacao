import ServerCookie from 'next-cookies'
import React, { Component } from 'react'
import { AuthToken } from '../../services/auth-token'
import { AuthProps } from '../../types/auth'
import { COOKIES } from '../../util/constants'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withPrivateRoute = (WrappedComponent: any) => {
  class PrivateRouter extends Component<AuthProps> {
    static getInitialProps = (context: any) => {
      const token = ServerCookie(context)[COOKIES.authToken]

      const auth = new AuthToken(token)
      const initialProps = { auth }

      if (auth.isExpired) {
        console.log(
          'Infelizmente seu token de acesso expiorou. Tente efetuar login novamente!'
        )
        context.res.writeHead(302, {
          Location: '/login',
        })
        context.res.end()
      }

      if (WrappedComponent.getInitialProps)
        return WrappedComponent.getInitialProps(initialProps)

      return initialProps
    }

    get auth() {
      return new AuthToken(this.props.auth.token)
    }

    render = () => <WrappedComponent {...this.props} auth={this.auth} />
  }

  return PrivateRouter
}
