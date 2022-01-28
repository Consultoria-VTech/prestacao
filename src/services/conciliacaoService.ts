import { Conciliacao } from '../types/models/conciliacao'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  conciliacao: Conciliacao,

): Promise<Conciliacao | ErrorData> => {
  const response = await Api.post<Conciliacao>('/api/conciliacao', conciliacao)

  return response.data
}

export const alterar = async (
  conciliacao: Conciliacao,

): Promise<Conciliacao | ErrorData> => {
  const response = await Api.put<Conciliacao>('/api/conciliacao',  conciliacao)

  return response.data
}

export const deletar = async (
  conciliacao: Conciliacao
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/conciliacao', {
    params: {
      id: conciliacao.id,
    },
  })

  return response.data
}
