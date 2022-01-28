import { DataPagination } from '../dataPagination'
import { ContaBancaria } from './contaBancaria'
import { Empresa } from './empresa'

export type ConciliacaoTipo = 'Crédito' | 'Débito'

export type Conciliacao = {
  id?: number
  empresa?: Empresa
  contaBancaria?: ContaBancaria
  dataCadastro?: string | Date
  valor?: number | string
  tipo?: ConciliacaoTipo
  dataPagamento?: string | Date,
  dataConciliacao?: string | Date,
}

export type ConciliacaoFiltros = {
  id?: number
  idempresa?: number
  idContaBancaria?: number
  dataCadastroInicial?: Date
  dataCadastroFinal?: Date
  tipo?: ConciliacaoTipo | null
  checked?: boolean
}

export type ConciliacaoPagination = {
  pagination: DataPagination
  data: Conciliacao[]
}
