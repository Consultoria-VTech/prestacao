import { Imposto } from '../types/models/imposto'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  imposto: Imposto
): Promise<Imposto | ErrorData> => {
  const response = await Api.post<Imposto>('/api/impostos', imposto)

  return response.data
}

export const alterar = async (
  imposto: Imposto
): Promise<Imposto | ErrorData> => {
  const response = await Api.put<Imposto>('/api/impostos', imposto)

  return response.data
}

export const deletar = async (
  imposto: Imposto
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/impostos', {
    params: {
      id: imposto.id,
    },
  })

  return response.data
}
