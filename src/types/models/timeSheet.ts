import { DataPagination } from '../dataPagination'

interface Empresa {
  id: number
  razao?: string
}
export interface Tarefas {
  id: number
  nome?: string
  descricao?: string
}
interface Funcionario {
  id: string
  nome?: string
}
interface Projeto {
  id: number
  nome?: string
}


export type TimeSheet = {
  id?: number
  empresa: Empresa
  tarefas: Tarefas
  projetos: Projeto
  funcionario: Funcionario
  data: string
  qtdHoras: number
  hora?: string
  minuto?: string
}

export type TimeSheetFiltro = {
  tarefa: Tarefas
  projetos: Projeto
}

export type TimeSheetPagination = {
  pagination: DataPagination
  data: TimeSheet[]
  dataExtra: {
    total: number
  }
}