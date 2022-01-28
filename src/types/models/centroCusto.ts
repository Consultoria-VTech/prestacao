import { DataPagination } from '../dataPagination'
import { Empresa } from './empresa'

export type CentroCusto = {
  id?: number
  descricao?: string
  ativo?: boolean
  observacao?: string
  empresa?: Empresa
}

export type CentroCustoFiltro = {
  idEmpresa?: number
  id?: number
  descricao?: string
  ativo?: boolean | 0 | 1 | -1 | null
}

export type CentroCustoPagination = {
  pagination: DataPagination
  data: CentroCusto[]
}
