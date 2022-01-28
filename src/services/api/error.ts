import { AxiosError } from 'axios'

export type ErrorResponse = {
  error: string
}

export const catchAxiosError = (error: AxiosError): ErrorResponse => {
  console.log('Error', error.message)
  let message = 'Aconteceu um erro durante a solicitação de requisição!'

  if (error.response) {
    console.log(error.response.status)
    console.log(error.response.data.message)
    message = error.response.data.message
  } else if (error.request) {
    console.log(error.message)
    message = 'A solicitação foi feita, mas nenhuma resposta foi recebida.'
  }

  return { error: message }
}
