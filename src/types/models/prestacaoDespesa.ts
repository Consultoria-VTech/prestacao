import { DataPagination } from '../dataPagination'
import { Empresa } from './empresa'
import { PrestacaoContas } from './prestacaoContas'

export enum PrestacaoDespesaTipoReembolso {
  Empresa = 1,
  Funcionário = 2,
}
export enum PrestacaoDespesaStatus {
  Aberta = 1,
  Aprovado = 2,
  Reprovado = 3,
  Pago = 4,
  Finalizado = 5,
}

export type PrestacaoDespesa = {
  id?: number
  descricao?: string
  empresa?: Empresa
  prestacaoContas?: PrestacaoContas
  tipoReembolso?: PrestacaoDespesaTipoReembolso
  valor?: number | string
  dtDespesa?: Date
  comprovante?: any
  possuiComprovante?: boolean
  status?: PrestacaoDespesaStatus
  observacao?: string
  quilometragem?: string
}
   
export type PrestacaoDespesaFiltro = {}

export type PrestacaoDespesaPagination = {
  pagination: DataPagination
  data: PrestacaoDespesa[]
}
export type PrestacaoDespesaValorTotal = {
  somaValorDespesa?: number
}