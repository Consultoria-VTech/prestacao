import { ProjetoResponsavel } from '@types'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  responsavel: ProjetoResponsavel
): Promise<ProjetoResponsavel | ErrorData> => {
  const response = await Api.post<ProjetoResponsavel>(
    '/api/projetoresponsavel',
    responsavel
  )

  return response.data
}

export const alterar = async (
  responsavel: ProjetoResponsavel
): Promise<ProjetoResponsavel | ErrorData> => {
  const response = await Api.put<ProjetoResponsavel>(
    '/api/projetoresponsavel',
    responsavel
  )

  return response.data
}

export const deletar = async (
  responsavel: ProjetoResponsavel
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/projetoresponsavel', {
    params: {
      id: responsavel.id,
    },
  })

  return response.data
}