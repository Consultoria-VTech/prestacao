import { ContratoImposto } from '../types/models/contratoImposto'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  imposto: ContratoImposto
): Promise<ContratoImposto | ErrorData> => {
  const response = await Api.post<ContratoImposto>(
    '/api/contratosimpostos',
    imposto
  )

  return response.data
}

export const alterar = async (
  imposto: ContratoImposto
): Promise<ContratoImposto | ErrorData> => {
  const response = await Api.put<ContratoImposto>(
    '/api/contratosimpostos',
    imposto
  )

  return response.data
}

export const deletar = async (
  imposto: ContratoImposto
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/contratosimpostos', {
    params: {
      id: imposto.id,
    },
  })

  return response.data
}
