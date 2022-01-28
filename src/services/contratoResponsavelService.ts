import { ContratoResponsavel } from '../types/models/contratoResponsavel'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  responsavel: ContratoResponsavel
): Promise<ContratoResponsavel | ErrorData> => {
  const response = await Api.post<ContratoResponsavel>(
    '/api/contratoresponsavel',
    responsavel
  )

  return response.data
}

export const alterar = async (
  responsavel: ContratoResponsavel
): Promise<ContratoResponsavel | ErrorData> => {
  const response = await Api.put<ContratoResponsavel>(
    '/api/contratoresponsavel',
    responsavel
  )

  return response.data
}

export const deletar = async (
  responsavel: ContratoResponsavel
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/contratoresponsavel', {
    params: {
      id: responsavel.id,
    },
  })

  return response.data
}
