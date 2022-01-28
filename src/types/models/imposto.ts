import { DataPagination } from '../dataPagination'
import { Empresa } from './empresa'

export type Imposto = {
  id?: number
  descricao?: string
  empresa?: Empresa
}

export type ImpostoFiltros = {
  id?: number
  descricao?: string
  idEmpresa?: number
}

export type ImpostoPagination = {
  pagination: DataPagination
  data: Imposto[]
}
