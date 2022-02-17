import { PlanoContas, PlanoContasFiltro } from '../types/models/planoContas'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  planoContas: PlanoContas
): Promise<PlanoContas | ErrorData> => {
  const response = await Api.post<PlanoContas>('/api/planocontas', planoContas)

  return response.data
}

export const consultar = async (
  planoContas: PlanoContasFiltro
): Promise<PlanoContas | ErrorData> => {
  const response = await Api.post<PlanoContas>('/api/planocontas/consultar', planoContas)

  return response.data
}

export const alterar = async (
  planoContas: PlanoContas
): Promise<PlanoContas | ErrorData> => {
  const response = await Api.put<PlanoContas>('/api/planocontas', planoContas)

  return response.data
}

export const deletar = async (
  planoContas: PlanoContas
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/planocontas', {
    params: {
      id: planoContas.id,
    },
  })

  return response.data
}
