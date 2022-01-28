import jwtDecode from 'jwt-decode'
import _isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import { setTimeout } from 'timers'
import { DecodedToken } from '../types/auth'
import { Usuario } from '../types/models/usuario'
import { COOKIES } from '../util/constants'
import { AppCookies } from '../util/cookies'

export class AuthToken {
  readonly decodedToken: DecodedToken

  constructor(readonly token?: string) {
    this.decodedToken = { exp: 0, data: {} }
    try {
      if (token) {
        this.decodedToken = jwtDecode(token)
      } else {
        const access = AppCookies.get(COOKIES.authToken)

        if (access) this.decodedToken = jwtDecode(access)
      }
    } catch (e) {
      console.log('Erro ao decodificar token: ', e)
    }
  }

  get expiresAt(): Date {
    return new Date(this.decodedToken.exp * 1000)
  }

  get isExpired(): boolean {
    return new Date() > this.expiresAt
  }

  get expiresIn(): number {
    const dtInicio = new Date()
    const dtFinal = this.expiresAt

    const ms = moment(dtFinal, 'DD/MM/YYYY HH:mm:ss').diff(
      moment(dtInicio, 'DD/MM/YYYY HH:mm:ss')
    )
    const duration = moment.duration(ms)

    return duration.asMilliseconds()
  }

  get expireDate(): number {
    const dtInicio = new Date()
    const dtFinal = this.expiresAt

    const ms = moment(dtFinal, 'DD/MM/YYYY HH:mm:ss').diff(
      moment(dtInicio, 'DD/MM/YYYY HH:mm:ss')
    )
    const duration = moment.duration(ms)
    // const horas =
    //   Math.floor(duration.asHours()) + moment.utc(ms).format(':mm:ss')
    const days = duration.asDays()
    return days
  }

  get user(): Usuario | null {
    if (!this.decodedToken.data || _isEmpty(this.decodedToken.data)) return null
    return this.decodedToken.data
  }

  get isAuthenticated(): boolean {
    return !this.isExpired
  }

  get isAuthenticatedPromise(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.isAuthenticated)
      }, 1000)
    })
  }

  get authToken(): string {
    return AppCookies.get(COOKIES.authToken)
  }

  get authorizationString(): string {
    return `Bearer ${this.token || this.authToken}`
  }

  // get token(): string | null {
  //   return this.token
  // }
}
