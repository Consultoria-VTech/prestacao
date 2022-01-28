/* eslint-disable no-unused-vars */
import { AuthToken } from '../services/auth-token'
import { RefreshToken, Usuario } from './models/usuario'

export type errorMessage = string

export type AuthValues = {
  login(usuario: Usuario): Promise<errorMessage | void>
  logout(permanent: boolean): Promise<boolean>
  refreshToken(): Promise<errorMessage | string>
  saveAccessData(usuario: Usuario, refreshToken: RefreshToken): void
}

export type DecodedToken = {
  readonly exp: number
  readonly data: Usuario
}

export type AuthProps = {
  auth: AuthToken
}

export type UserProviderValues = {
  auth?: AuthValues
  user?: Usuario | null
  token?: string | null
  isAuthenticad?: boolean
  updateAccessToken?: (newAccessToken: string) => void
}
