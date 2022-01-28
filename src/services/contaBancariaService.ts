import { ContaBancaria } from '../types/models/contaBancaria'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  contabancaria: ContaBancaria
): Promise<ContaBancaria | ErrorData> => {
  const response = await Api.post<ContaBancaria>(
    '/api/contasbancarias',
    contabancaria
    // { headers: { 'Content-Type': 'multipart/form-data' } }
  )

  return response.data
}

export const alterar = async (
  contabancaria: ContaBancaria
): Promise<ContaBancaria | ErrorData> => {
  const response = await Api.put<ContaBancaria>(
    '/api/contasbancarias',
    contabancaria
    // { headers: { 'Content-Type': 'multipart/form-data' } }
  )

  return response.data
}

export const deletar = async (
  contabancaria: ContaBancaria
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/contasbancarias', {
    params: {
      id: contabancaria.id,
    },
  })

  return response.data
}
