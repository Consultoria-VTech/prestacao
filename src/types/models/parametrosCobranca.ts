import { DataPagination } from '../dataPagination'
import { Empresa } from './empresa'

export type ParametrosCobranca = {
  id?: number
  descricao?: string
  empresa?: Empresa
  taxa?: number | string
  dataCadastro?: Date
  ativo?: boolean
  tipo?: boolean | 0 | 1
}

export type ParametrosCobrancaFiltros = {
  id?: number
  descricao?: string
  idEmpresa?: number
  ativo?: boolean
  tipo?: boolean | 0 | 1 | -1 | null
}

export type ParametrosCobrancaPagination = {
  pagination: DataPagination
  data: ParametrosCobranca[]
}
