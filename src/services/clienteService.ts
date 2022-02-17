import { Cliente, ClienteFiltro } from './../types/models/cliente'
import Api, { ErrorData } from './api/api'
import { ApiCliente } from './api/cliente'

export const consultarCliente = async (
  page?: number,
  size?: number
): Promise<any> => {
  const response: any = await ApiCliente.consultar(page, size)

  if (response.error) return response.error
  else if (!response.data) return 'Erro ao consultar clientes'

  return response.data
}

type Error = {
  mensagem: string
  data: any
  status: number
}

export const cadastrar = async (
  cliente: Cliente
): Promise<Cliente | ErrorData> => {
  const response = await Api.post<Cliente>('/api/clientes', cliente)

  // if (response.error) return response.error
  // else if (response.data.mensagem) throw new Error('Erro ao cadastrar cliente')

  return response.data
}

export const alterar = async (
  cliente: Cliente
): Promise<Cliente | ErrorData> => {
  const response = await Api.put<Cliente>('/api/clientes', cliente)

  // if (response.error) return response.error
  // else if (response.data.mensagem) throw new Error('Erro ao alterar cliente')

  return response.data
}

export const deletar = async (
  cliente: Cliente
): Promise<boolean | ErrorData> => {
  const response = await Api.put<boolean>('/api/clientes/apagar', 
    {
      id: cliente.id,
    },
  )

  // if (response.error) return response.error
  // else if (response.data.mensagem) throw new Error('Erro ao excluir cliente')

  return response.data
}

export const consultar = async (
  cliente: ClienteFiltro
): Promise<Cliente[] | ErrorData > => {
  const response = await Api.post<Cliente>('/api/clientes/consultar', cliente)

  return response.data as Cliente[];
}