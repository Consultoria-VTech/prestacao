import { DataPagination } from '../dataPagination'
import { CentroCusto } from './centroCusto'
import { Cliente } from './cliente'
import { Empresa } from './empresa'
import { Fornecedor } from './fornecedor'
import { PlanoContas } from './planoContas'

export type ContratoStatus = 'Aberto' | 'Finalizado' | 'Excluido'
export enum ContratoTipoEnum {
  CR = 'CR',
  CP = 'CP',
}

export type Contrato = {
  id?: number
  empresa?: Empresa
  centroCusto?: CentroCusto
  cliente?: Cliente
  fornecedor?: Fornecedor
  dtEmissao?: Date | string
  dtVencimento?: Date | string
  valor?: any
  status?: ContratoStatus
  nparcelas?: number
  idcentrocusto?: number
  observacao?: string
  tipo?: ContratoTipoEnum
  valorParcela?: number | string
  parcelas?: string
}

export type ContratoFiltro = {
  id?: number
  idempresa?: number
  idCliente?: number
  idFornecedor?: number
  idCentroCusto?: number
  status?: ContratoStatus
  tipo?: ContratoTipoEnum
}

export type ContratoPagination = {
  pagination: DataPagination
  data: Contrato[]
}
