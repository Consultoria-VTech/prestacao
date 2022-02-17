import { DataPagination } from '../dataPagination'
import { Banco } from './banco'
import { Empresa } from './empresa'

export type ContaBancaria = {
  id?: number
  agencia?: number
  agenciaDv?: number
  ativo?: boolean
  banco?: Banco
  conta?: number
  contaDv?: number
  empresa?: Empresa
  observacao?: string
  tipo?: string
  tipo_pessoa?: string
  saldoinicial?: number | string
  saldo?: number | string
}
export type idcontaBancaria = {
  id?: number
  agencia?: number
  agenciaDv?: number
  ativo?: boolean
  banco?: Banco
  conta?: number
  contaDv?: number
  empresa?: Empresa
  observacao?: string
  tipo?: string
  saldoinicial?: number | string
  saldo?: number | string
}

export type ContaBancariaFiltro = {
  id?: number
  agencia?: number
  agenciaDv?: number
  ativo?: boolean
  idBanco?: number
  conta?: number
  contaDv?: number
  idEmpresa?: number
  tipo?: string
}

export type ContaBancariaPagination = {
  pagination: DataPagination
  data: ContaBancaria[]
}
