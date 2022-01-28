import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { COOKIES } from '../../util/constants'
import { AppCookies } from '../../util/cookies'
import { AuthToken } from './../auth-token'

export type ErrorData = {
  data?: any
  message?: string
  status?: number | string
}

export const URL_API: string = process.env.REACT_APP_URL_API
// export const URL_API = 'http://localhost:3333'

const baseConfig: AxiosRequestConfig = {
  baseURL: URL_API,
}
export const ApiDefault = axios.create(baseConfig)
const Api = ApiDefault

// Intercepta as requisições
Api.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    const auth = new AuthToken()

    if (auth && auth.authorizationString && request.url !== '/login') {
      request.headers.Authorization = auth.authorizationString
    }

    return request
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Intercepta as respostas
Api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    try {
      if ([401, 403].indexOf(error?.response?.status) !== -1) {
        // Efetua Logout automáticamente caso o retorno seja:
        // 401 - Usuário não autorizado, dados de login inválidos
        if (error?.response?.status === 401) {
          // const originalRequest = error.config
          // const refreshToken = localStorage.getItem('refreshToken')

          // if (refreshToken) {
          //   return axios
          //     .post(`${URL_API}/refresh`, null, {
          //       headers: {
          //         'Authorization': `Bearer ${refreshToken}`
          //       }
          //     })
          //     .then((res) => {
          //       if (res.status === 200) {
          //         localStorage.setItem("accessToken", res.data.accessToken);
          //         console.log("Access token refreshed!");
          //         return axios(originalRequest);
          //       }
          //     });
          // }
          // }
          error.message = error.response?.data || 'Falha ao autenticar'
        }
        // 403 - Acesso negado, usuário foi reconhecido porem teve acesso negado por algum motivo ou regra na autenticação.
        else if (error?.response?.status === 403)
          error.message = error.response?.data || 'Acesso negado'

        AppCookies.remove(COOKIES.authToken)
        sessionStorage.removeItem(COOKIES.authToken)
      } else if (error?.response?.status === 404)
        error.message = 'Página não encontrada!'

      if (process.env.NODE_ENV === 'development')
        console.error('Erro na resposta: ', { error })

      if (!error?.response?.data) {
        const erroData: ErrorData = {
          message: error?.message,
          data: error?.stack,
          status: error?.code,
        }
        return Promise.reject(erroData)
      }

      return Promise.reject(error?.response?.data)
    } catch (e) {
      console.error('Erro na interceptor de resposta: ', { e })
    }
  }
)

export default Api
