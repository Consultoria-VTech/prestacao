import { PrestacaoContas } from '@types'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  prestacao: PrestacaoContas
): Promise<PrestacaoContas | ErrorData> => {
  const response = await Api.post<PrestacaoContas>(
    '/api/prestacaocontas',
    prestacao
  )

  return response.data
}

export const alterar = async (
  prestacao: PrestacaoContas
): Promise<PrestacaoContas | ErrorData> => {
  const response = await Api.put<PrestacaoContas>(
    '/api/prestacaocontas',
    prestacao
  )

  return response.data
}

export const alterarSituacao = async (
  idPrestacao: number,
  idNovaSituacao: number
): Promise<PrestacaoContas | ErrorData> => {
  const response = await Api.post<PrestacaoContas>(
    '/api/prestacaocontas/situacao',
    {
      idPrestacao,
      idNovaSituacao,
    }
  )

  return response.data
}

export const deletar = async (
  prestacao: PrestacaoContas
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/prestacaocontas', {
    params: {
      id: prestacao.id,
    },
  })

  return response.data
}

export const gerarpdf = async (
  prestacao: PrestacaoContas
): Promise<any | ErrorData> => {
  return await Api.get<any>(`/api/prestacaoPDF/${prestacao.id}`, {
    params: {
      id: prestacao.id,
    },
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}