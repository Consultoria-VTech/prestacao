import { DataPagination } from '../dataPagination'
import { Contrato } from './contrato'
import { Empresa } from './empresa'
import { Funcionario } from './funcionario'

export type ContratoResponsavel = {
  id?: number
  empresa?: Empresa
  contrato?: Contrato
  funcionario?: Funcionario
  percentual?: number | string
  admin?: boolean
}

export type ContratoResponsavelFiltro = {
  idFuncionario?: number
  idContrato?: number
  admin?: boolean
}

export type ContratoResponsavelPagination = {
  pagination: DataPagination
  data: ContratoResponsavel[]
}
