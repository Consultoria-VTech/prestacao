import { Banco } from '../types/models/banco'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (banco: Banco): Promise<Banco | ErrorData> => {
  const response = await Api.post<Banco>('/api/banks', banco)

  return response.data
}

export const alterar = async (banco: Banco): Promise<Banco | ErrorData> => {
  const response = await Api.put<Banco>('/api/banks', banco)

  return response.data
}

export const deletar = async (banco: Banco): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/banks', {
    params: {
      id: banco.id,
    },
  })

  return response.data
}
