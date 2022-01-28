import { DataPagination } from '../dataPagination'
import { Funcionario } from './funcionario'
import { Projeto } from './projeto'

export type ProjetoResponsavel = {
  id?: number
  projeto?: Projeto
  funcionario?: Funcionario
}
export type ProjetoResponsavelFiltro = {
  id?: number
  idProjeto?: number
  idFuncionario?: number
}

export type ProjetoResponsavelPagination = {
  pagination: DataPagination
  data: ProjetoResponsavel[]
}