import { Fornecedor } from '../types/models/fornecedor'
import Api, { ErrorData } from './api/api'
import { ApiFornecedor } from './api/fornecedor'

export const consultarFornecedor = async (
  page?: number,
  size?: number
): Promise<any> => {
  const response: any = await ApiFornecedor.consultar(page, size)

  if (response.error) return response.error
  else if (!response.data) return 'Erro ao consultar fornecedores'

  return response.data
}

type Error = {
  mensagem: string
  data: any
  status: number
}

export const cadastrar = async (
  fornecedor: Fornecedor
): Promise<Fornecedor | ErrorData> => {
  const response = await Api.post<Fornecedor>('/api/fornecedores', fornecedor)

  return response.data
}

export const alterar = async (
  fornecedor: Fornecedor
): Promise<Fornecedor | ErrorData> => {
  const response = await Api.put<Fornecedor>('/api/fornecedores', fornecedor)

  return response.data
}

export const deletar = async (
  fornecedor: Fornecedor
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/fornecedores', {
    params: {
      id: fornecedor.id,
    },
  })

  return response.data
}
