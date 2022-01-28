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
  idEmpresa?: number
  id?: number
  idPlanoContasSintetica?: number
  descricao?: string
  receitaOuDespesa?: boolean | 0 | 1 | -1 | null
  ativo?: boolean | 0 | 1 | -1 | null
}

export type PlanoContasPagination = {
  pagination: DataPagination
  data: PlanoContas[]
}
