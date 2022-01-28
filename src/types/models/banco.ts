import { DataPagination } from '../dataPagination'

export type Banco = {
  id?: number
  name?: string
  bankId?: number
}

export type BancoFiltros = {
  name?: string
  bankId?: number
}

export type BancoPagination = {
  pagination: DataPagination
  data: Banco[]
}
