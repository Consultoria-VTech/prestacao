import axios from 'axios'
import Router from 'next/router'
import { AuthValues, errorMessage } from '../types/auth'
import { RefreshToken, Usuario } from '../types/models/usuario'
import { COOKIES, redirectLogout } from '../util/constants'
import { AppCookies } from '../util/cookies'
import { b64EncodeUnicode } from '../util/stringUtil'
import { AlertService } from './../util/alertService'
import { URL_API } from './api/api'
import { postLogin } from './api/auth'
import { AuthToken } from './auth-token'

export const logout = async (permanent = false): Promise<boolean> => {
  AppCookies.remove(COOKIES.authToken)
  sessionStorage.removeItem(COOKIES.authToken)

  if (!permanent) {
    const newToken = await refreshToken()

    if (!newToken) {
      AlertService(
        'Sessão expirada',
        'Seu acesso foi expirado e você foi redirecionado para a página de login'
      )
      return await Router.push(redirectLogout)
    }
  } else {
    AppCookies.remove(COOKIES.refreshToken)
    return await Router.push(redirectLogout)
  }

  return true
}

export const autoLogout = (expirationDate: number): void => {
  setTimeout(async () => {
    if (AppCookies.get(COOKIES.authToken)) {
      console.info('Refresh token')
      await logout()
    }
  }, expirationDate)
}

export const saveAccessData = (
  usuario: Usuario,
  refreshToken: RefreshToken
): void => {
  try {
    // console.log('save access', usuario, refreshToken)
    if (!usuario || !refreshToken) return

    const { accessToken } = usuario

    const auth = new AuthToken(accessToken)
    AppCookies.set(COOKIES.refreshToken, JSON.stringify(refreshToken))

    if (usuario?.lembrarSenha === true)
      // AppCookies.set(COOKIES.authToken, accessToken)
      AppCookies.set(COOKIES.authToken, accessToken, {
        expires: auth.expireDate,
      })
    else AppCookies.set(COOKIES.authToken, accessToken)

    autoLogout(auth.expiresIn)
  } catch (e) {
    console.error(e)
  }
}

export const login = async (usuario: Usuario): Promise<errorMessage | void> => {
  // usuario.senha = SHA256(usuario.senha).toString()
  usuario.senha = b64EncodeUnicode(usuario.senha)

  const response: any = await postLogin(usuario)

  if (response.error) throw new Error(response.error)
  else if (!response.data || !response.data.usuario)
    throw new Error('Erro ao efetuar login')

  const { usuario: user, refreshToken } = response.data

  // const auth = new AuthToken(accessToken)
  // localStorage.setItem(LOCALSTORAGE.refreshToken, JSON.stringify(refreshToken))

  // if (usuario?.lembrarSenha === true)
  //   AppCookies.set(COOKIES.authToken, accessToken, {
  //     expires: auth.expireDate,
  //   })
  // else AppCookies.set(COOKIES.authToken, accessToken)

  // autoLogout(auth.expiresIn)

  saveAccessData(user, refreshToken)
  await Router.push('/portal')
}

export const refreshToken = async (): Promise<errorMessage | string> => {
  try {
    const refreshToken = AppCookies.get(COOKIES.refreshToken)

    if (refreshToken) {
      const tokenObject: RefreshToken = JSON.parse(refreshToken)

      const response: any = await axios.post(URL_API + '/refresh-token', {
        refreshToken: tokenObject.id,
      })

      if (response.error) {
        console.log('Refresh Token: ', response.error)
        return null
      } else if (!response.data || !response.data.usuario) {
        console.log('Refresh Token2: ', response)
        return null
      }

      const { usuario: user, refreshToken: newRefreshToken } = response.data
      saveAccessData(user, newRefreshToken)

      return user.accessToken
    }
  } catch (e) {
    console.log('Refresh Token3: ', e)
  }

  return null
}

const Auth: AuthValues = {
  login,
  logout,
  refreshToken,
  saveAccessData,
}

export default Auth