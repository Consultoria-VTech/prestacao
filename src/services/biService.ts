import { Bi } from '../types/models/bi'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  bi: Bi
): Promise<Bi | ErrorData> => {
  const response = await Api.post<Bi>('/api/bi', bi)

  return response.data
}

export const alterar = async (
  bi: Bi
): Promise<Bi | ErrorData> => {
  const response = await Api.put<Bi>('/api/bi', bi)

  return response.data
}

export const deletar = async (
  bi: Bi
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/bi', {
    params: {
      id: bi.id,
    },
  })

  return response.data
}