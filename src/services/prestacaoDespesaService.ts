import { DataForm, PrestacaoDespesa } from '@types'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  prestacao: FormData,
): Promise<PrestacaoDespesa | ErrorData> => {
  const response = await Api.post<PrestacaoDespesa>(
    '/api/prestacaodespesas',
    prestacao,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )

  return response.data
}

export const alterar = async (
  prestacao: FormData
): Promise<PrestacaoDespesa | ErrorData> => {
  const response = await Api.post<PrestacaoDespesa>(
    '/api/prestacaodespesas/update',
    prestacao,
    {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    }
  )
  return response.data
}

export const deletar = async (
  prestacao: PrestacaoDespesa
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/prestacaodespesas', {
    params: {
      id: prestacao.id,
    },
  })

  return response.data
}

export const alterarSituacao = async (
  idPrestacaoDespesa: number,
  idNovaSituacao: number
): Promise<PrestacaoDespesa | ErrorData> => {
  const response = await Api.post<PrestacaoDespesa>(
    '/api/prestacaodespesas/situacao',
    {
      idPrestacaoDespesa,
      idNovaSituacao,
    }
  )
  
  return response.data
}

export const baixarComprovantePrestacaoDespesa = async (
  idDespesa: number
): Promise<any | ErrorData> => {
  return await Api.get<any>(`api/prestacaodespesas/comprovante/${idDespesa}`, {
    params: {
      id: idDespesa,
    },
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}