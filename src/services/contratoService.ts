import { Empresa } from '@types'
import { NumeroParcelas } from '@utils'
import { number } from '~/components/elements/input/mask'
import { Contrato, ContratoFiltro } from '../types/models/contrato'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  contrato: Contrato,
): Promise<Contrato | ErrorData> => {
  const response = await Api.post<Contrato>('/api/contratos', contrato)

  return response.data
}

export const alterar = async (
  contrato: Contrato
): Promise<Contrato | ErrorData> => {
  const response = await Api.put<Contrato>('/api/contratos', contrato)

  return response.data
}

export const deletar = async (
  contrato: Contrato
): Promise<boolean | ErrorData> => {
  const response = await Api.put<boolean>('/api/contratos/apagar',
    {
      idContrato: contrato.id,
    },
  )

  return response.data
}

export const gerarParcelasContratoReceber = async (
  empresa: number,
  cliente: number,
  // fornecedor: number,
  contrato: number,
  valor: any,
  dtEmissao: Date,
  dtVencimento: Date,
  nParcelas: number,
  valorParcela: any,
  metodo: string
  
): Promise<Contrato | ErrorData> => {
  const response = await Api.post<Contrato>('/api/' +metodo, {
    empresa,
    cliente,
    // fornecedor,
    contrato,
    valor,
    dtEmissao,
    dtVencimento,
    nParcelas,
    valorParcela
  })

  return response.data
}

export const gerarParcelasContratoPagar = async (
  empresa: number,
  // cliente: number,
  fornecedor: number,
  contrato: number,
  valor: any,
  dtEmissao: Date,
  dtVencimento: Date,
  nParcelas: number,
  valorParcela: any,
  metodo: string
  
): Promise<Contrato | ErrorData> => {
  const response = await Api.post<Contrato>('/api/' +metodo, {
    empresa,
    // cliente,
    fornecedor,
    contrato,
    dtEmissao,
    dtVencimento,
    valor,
    nParcelas,
    valorParcela
  })

  return response.data
}

export const consultar = async (
  contrato: ContratoFiltro
): Promise<Contrato[] | ErrorData > => {
  const response = await Api.post<Contrato>('/api/contratos/consultar', contrato)

  return response.data as Contrato[];
}