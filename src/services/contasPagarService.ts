import { ContasPagar } from '../types/models/contasPagar'
import { Empresa } from '../types/models/empresa'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  contasPagar: FormData
): Promise<ContasPagar | ErrorData> => {
  const response = await Api.post<ContasPagar>(
    '/api/contaspagar',
    contasPagar,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )

  return response.data
}

export const alterar = async (
  contasPagar: FormData
): Promise<ContasPagar | ErrorData> => {
  const response = await Api.post<ContasPagar>(
    '/api/contaspagar/update',
    contasPagar,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )

  return response.data
}

export const deletar = async (
  contasPagar: ContasPagar,
  empresa: number
): Promise<boolean | ErrorData> => {
  const response = await Api.put<boolean>('/api/contaspagar/apagar', {
    params: {
      idContaPagar: contasPagar.id,
      idEmpresa: empresa
    },
  })

  return response.data
}

export const baixarComprovanteContasPagar = async (
  idContasPagar: number
): Promise<any | ErrorData> => {
  return await Api.get<any>('/api/contaspagar/comprovante', {
    params: {
      id: idContasPagar,
    },
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const baixarContasPagar = async (
  idempresa: number,
  idcp: number,
  idcontabancaria: number,
  valor: number,
  dtbaixa: string | Date,
  situacao: string,
  idplanodecontas: number,
  valorResto: number

): Promise<ContasPagar | ErrorData> => {
  const response = await Api.post<ContasPagar>('/api/cadastrarbaixapagar', {
    idempresa,
    idcp,
    idcontabancaria,
    valor,
    dtbaixa,
    situacao,
    idplanodecontas,
    valorResto
  })

  return response.data
}

export const renegociarContasPagar = async (
  idContaPagar: number,
  idParametroCobranca: number,
  valor: number
): Promise<ContasPagar | ErrorData> => {
  const response = await Api.post<ContasPagar>('/api/contaspagar/renegociar', {
    idContaPagar,
    idParametroCobranca,
    valor,
  })

  return response.data
}

export const estornarContasPagar = async (
  id: number,
  idcp: number,
  idcontabancaria: number,
  dtbaixa: string | Date
): Promise<ContasPagar | ErrorData> => {
  const response = await Api.put<ContasPagar>(
    '/api/contaspagarbaixa/estornar',
    {
      id,
      idcp,
      idcontabancaria,
      dtbaixa,
    }
  )

  return response.data
}

export const emitirBordero = async (
  idContaPagar: number
  // idContaBancaria: number,
): Promise<ContasPagar | ErrorData> => {
  const response = await Api.put<ContasPagar>('/api/contaspagar/bordero', {
    idContaPagar,
    // idContaBancaria
  })

  return response.data
}
