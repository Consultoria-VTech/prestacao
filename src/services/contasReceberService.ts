import { ContasReceber, ContasReceberSituacao } from '../types/models/contasReceber'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  contasReceber: FormData
): Promise<ContasReceber | ErrorData> => {
  const response = await Api.post<ContasReceber>(
    '/api/contasreceber',
    contasReceber,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )

  return response.data
}

export const alterar = async (
  contasReceber: FormData
): Promise<ContasReceber | ErrorData> => {
  const response = await Api.post<ContasReceber>(
    '/api/contasreceber/update',
    contasReceber,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )

  return response.data
}

export const deletar = async (
  contasReceber: ContasReceber,
  empresa: number
): Promise<boolean | ErrorData> => {
  const response = await Api.put<boolean>('/api/contasreceber/apagar', {
    params: {
      idContaReceber: contasReceber.id,
      idEmpresa: empresa
    },
  })

  return response.data
}

export const baixarContasReceber = async (
    idempresa: number,
    idcr: number,
    idcontabancaria: number,
    valor: number | string,
    dtbaixa: string | Date,
    situacao: string,
    idplanodecontas: number,
    valorResto: number

): Promise<ContasReceber | ErrorData> => {
  const response = await Api.post<ContasReceber>('/api/cadastrarbaixa', {
    idempresa,
    idcr,
    idcontabancaria,
    valor,
    dtbaixa,
    situacao,
    idplanodecontas,
    valorResto
  })

  return response.data
}

export const baixarComprovanteContasReceber = async (
  idContaReceber: number
): Promise<any | ErrorData> => {
  return await Api.get<any>('/api/contasreceber/comprovante', {
    params: {
      id: idContaReceber,
    },
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const renegociarContasReceber = async (
  idContaReceber: number,
  idParametroCobranca: number,
  valor: number
): Promise<ContasReceber | ErrorData> => {
  const response = await Api.post<ContasReceber>(
    '/api/contasreceber/renegociar',
    {
      idContaReceber,
      idParametroCobranca,
      valor,
    }
  )

  return response.data
}

export const estornarContasReceber = async (
  id: number,
  idcr: number,
  idcontabancaria: number,
  dtbaixa: string | Date

): Promise<ContasReceber | ErrorData> => {  
  const response = await Api.put<ContasReceber>('/api/contasreceberbaixa/estornar', {
    id,
    idcr,
    idcontabancaria,
    dtbaixa
  })

  return response.data
}

export const emitirNfsContasReceber = async (
  idContaReceber: number,
  idContaBancaria: number,

): Promise<ContasReceber | ErrorData> => {  
  const response = await Api.put<ContasReceber>('/api/contasreceber/emitir', {
    idContaReceber,
    idContaBancaria,
  })

  return response.data
}