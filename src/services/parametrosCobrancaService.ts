import { ParametrosCobranca } from '../types/models/parametrosCobranca'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  parametrosCobranca: ParametrosCobranca
): Promise<ParametrosCobranca | ErrorData> => {
  const response = await Api.post<ParametrosCobranca>(
    '/api/parametroscobranca',
    parametrosCobranca
  )

  return response.data
}

export const alterar = async (
  parametrosCobranca: ParametrosCobranca
): Promise<ParametrosCobranca | ErrorData> => {
  const response = await Api.put<ParametrosCobranca>(
    '/api/parametroscobranca',
    parametrosCobranca
  )

  return response.data
}

export const deletar = async (
  parametrosCobranca: ParametrosCobranca
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/parametroscobranca', {
    params: {
      id: parametrosCobranca.id,
    },
  })

  return response.data
}
