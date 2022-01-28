import { DataPagination } from '../dataPagination'
import { Empresa } from './empresa'

export type EmpresaTipo = {
  id?: number
  razao: string
}

export type Bi = {
  id?: string
  empresa?: EmpresaTipo
  link?: string
  descricao?: string
  aplicacao?: string
  workspace?: string
  report?: string
  datacadastro?: Date
  ativo?: boolean
}

export type BiPagination = {
  pagination: DataPagination
  data: Bi[]
}
