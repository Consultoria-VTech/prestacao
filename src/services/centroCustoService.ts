import { CentroCusto } from '../types/models/centroCusto'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  centroCusto: CentroCusto
): Promise<CentroCusto | ErrorData> => {
  const response = await Api.post<CentroCusto>('/api/centrocustos', centroCusto)

  return response.data
}

export const alterar = async (
  centroCusto: CentroCusto
): Promise<CentroCusto | ErrorData> => {
  const response = await Api.put<CentroCusto>('/api/centrocustos', centroCusto)

  return response.data
}

export const deletar = async (
  centroCusto: CentroCusto
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/centrocustos', {
    params: {
      id: centroCusto.id,
    },
  })

  return response.data
}
