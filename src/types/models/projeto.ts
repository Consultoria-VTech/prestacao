import { DataPagination } from '../dataPagination'
import { Contrato } from './contrato'
import { Empresa } from './empresa'

export enum ProjetoSituacaoEnum {
  Aberto = 1,
}

export type Projeto = {
  id?: number
  empresa?: Empresa
  contrato?: Contrato
  descricao?: string
  dtInicio?: Date
  dtFinalizacao?: Date
  limiteKm?: number | string
  limiteAlmoco?: number | string
  situacao?: ProjetoSituacaoEnum
}

export type ProjetoFiltro = {}

export type ProjetoPagination = {
  pagination: DataPagination
  data: Projeto[]
}