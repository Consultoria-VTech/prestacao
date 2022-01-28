import { DataPagination } from '../dataPagination'
export type Empresa = {
  id?: number
  razao?: string
  cnpj?: string
  ie?: string
  cep?: string
  endereco?: string
  cidade?: string
  estado?: string
  numero?: number
  bairro?: string
  complemento?: string
  telefone?: string
  email?: string
  observacao?: string
  ativo?: boolean
}

export type EmpresaPagination = {
  pagination: DataPagination
  data: Empresa[]
}