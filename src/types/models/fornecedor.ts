import { DataPagination } from '../dataPagination'
import { Empresa } from './empresa'
export type Fornecedor = {
  empresa?: Empresa
  id?: number
  razao?: string
  cnpj?: string
  cep?: string
  endereco?: string
  cidade?: string
  estado?: string
  numero?: number
  bairro?: string
  complemento?: string
  telefone?: string
  email?: string
  telefone2?: string
  email2?: string
  telefone3?: string
  email3?: string
  observacao?: string
  ativo?: boolean
  filial?: string
  idpessoa?: number
}

export type FornecedorFiltro = {
  idEmpresa?: number
  id?: number
  razao?: string
  cnpj?: string
  ativo?: boolean | 0 | 1 | -1 | null
}

export type FornecedorPagination = {
  pagination: DataPagination
  data: Fornecedor[]
}