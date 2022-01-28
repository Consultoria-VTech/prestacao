import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import ServerCookie from 'next-cookies'
import { AuthToken } from '../services/auth-token'
import { RefreshToken, Usuario } from '../types/models/usuario'
import { URL_API } from './../services/api/api'
import { COOKIES } from './constants'

type VerifyAuthData = {
  auth: AuthToken
  user?: Usuario
  refreshToken?: RefreshToken
  newAcessToken?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const verifyAuth = async (
  context: GetServerSidePropsContext<any>
): Promise<VerifyAuthData> => {
  const token = ServerCookie(context)[COOKIES.authToken]

  let auth = new AuthToken(token)

  if (auth.isExpired) {
    const refresh: any = ServerCookie(context)[COOKIES.refreshToken]

    if (refresh && refresh.id) {
      console.log('Refresh', refresh.id)
      try {
        const response: any = await axios.post(URL_API + '/refresh-token', {
          refreshToken: refresh.id,
        })

        if (response.data && response.data.usuario) {
          const { usuario, refreshToken } = response.data
          auth = new AuthToken(usuario.accessToken)
          console.log('new refresh token', response.data)
          return {
            auth,
            user: usuario,
            refreshToken,
            newAcessToken: usuario.accessToken,
          }
        }
      } catch (e) {
        console.log('Erro ao gerar novo token', e)
      }
    }

    if (auth.isExpired) {
      console.log(
        'Olá, infelizmente seu token de acesso expirou. Tente efetuar login novamente!'
      )
      context.res.writeHead(302, {
        Location: '/login',
      })
      context.res.end()
    }
  }

  return { auth, newAcessToken: null, refreshToken: null, user: null }
}
