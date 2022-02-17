import { Usuario } from '@types'
import { DataPagination } from '../dataPagination'
import { Empresa } from './empresa'

export type Funcionario = {
  empresa?: Empresa
  id?: number
  nome?: string
  cpf?: string
  cep?: string
  endereco?: string
  cidade?: string
  estado?: string
  numero?: number
  bairro?: string
  complemento?: string
  telefone?: string
  email?: string
  cargo?: string
  observacao?: string
  dtAdmissao?: Date | string
  dtDemissao?: Date | string
  fator?: number
  ativo?: boolean
  usuario?: Usuario
}

export type FuncionarioPagination = {
  pagination: DataPagination
  data: Funcionario[]
}
