import { Empresa } from '../types/models/empresa'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  empresa: Empresa
): Promise<Empresa | ErrorData> => {
  const response = await Api.post<Empresa>('/api/empresas', empresa)

  return response.data
}

export const alterar = async (
  empresa: Empresa
): Promise<Empresa | ErrorData> => {
  const response = await Api.put<Empresa>('/api/empresas', empresa)

  return response.data
}

export const deletar = async (
  empresa: Empresa
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/empresas', {
    params: {
      id: empresa.id,
    },
  })

  return response.data
}