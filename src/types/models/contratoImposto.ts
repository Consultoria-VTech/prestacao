import { DataPagination } from '../dataPagination'
import { Contrato } from './contrato'
import { Imposto } from './imposto'

export type ContratoImposto = {
  id?: number
  contrato?: Contrato
  imposto?: Imposto
  percentual?: number | string
}

export type ContratoImpostoFiltro = {
  idContrato?: number
  idImposto?: number
}

export type ContratoImpostoPagination = {
  pagination: DataPagination
  data: Imposto[]
}
