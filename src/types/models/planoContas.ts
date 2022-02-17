import { DataPagination } from '../dataPagination'
import { Empresa } from './empresa'

export type PlanoContas = {
  id?: number
  idPlanoContasSintetica?: string
  root?: boolean
  planoContasSintetica?: PlanoContas
  subPlanoContasSintetica?: PlanoContas
  planoContasAnalitica?: PlanoContas[]
  hierarquia?: string
  nivel?: number
  descricao?: string
  empresa?: Empresa
  receitaOuDespesa?: boolean | 0 | 1
  ativo?: boolean
  nconta?: string
  observacao?: string
  isNatureza?: boolean
}

export type PlanoContasFiltro = {
  descricao?: string
}

export type PlanoContasPagination = {
  pagination: DataPagination
  data: PlanoContas[]
}
