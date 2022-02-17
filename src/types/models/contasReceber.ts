import { DataPagination } from '../dataPagination'
import { Cliente } from './cliente'
import { ContaBancaria, idcontaBancaria } from './contaBancaria'
import { Contrato } from './contrato'
import { Empresa } from './empresa'
import { PlanoContas } from './planoContas'
import { CentroCusto } from './centroCusto'

export type ContasReceberSituacao = 'PAGO' | 'ABERTO' | 'CANCELADO'
export type EmitirNfsContasReceberSituacao = 'SIM' | 'NAO'

export type ContasReceberBaixa = {
  id?: number
}

export type ContasReceber = {
  id?: number
  empresa?: Empresa
  planoContas?: PlanoContas
  centroCusto?: CentroCusto
  cliente?: Cliente
  contrato?: Contrato
  valor?: number | string
  valorBaixa?: number
  dtEmissao?: Date | string
  dtVencimento?: Date | string
  dtBaixa?: string | Date
  contaBancaria?: ContaBancaria
  tipoDoc?: string
  nDoc?: string
  status?: ContasReceberSituacao
  nParcelas?: string | number
  renegociacao?: boolean
  comprovante?: any
  possuiComprovante?: boolean
  emitido?: EmitirNfsContasReceberSituacao
  contasreceber?: ContasReceber
  situacao?: ContasReceberSituacao
  idcrbaixa?: ContasReceberBaixa
  idcontaBancaria?: idcontaBancaria
  valorConciliado?: number | string
  valorParcela?: number
  idplanodecontas?: number
  idcentrocusto?: number
}

export type ContasReceberFiltro = {
  idEmpresa?: number
  idPlanoContas?: number
  idCliente?: number
  idContrato?: number
  status?: string
  dtEmissaoInicial?: Date
  dtEmissaoFinal?: Date
  dtVencimentoInicial?: Date
  dtVencimentoFinal?: Date
  tipoDoc?: string
  nDoc?: string
  emAtraso?: boolean
}

export type ContasReceberFiltroAlternativo = {
  idEmpresaCr?: number
  idPlanoContasCr?: number
  idClienteCr?: number
  idContratoCr?: number
  statusCr?: string
  dtEmissaoInicialCr?: Date
  dtEmissaoFinalCr?: Date
  dtVencimentoInicialCr?: Date
  dtVencimentoFinalCr?: Date
  tipoDocCr?: string
  nDocCr?: string
  emAtrasoCr?: boolean
}

export type ContasReceberPagination = {
  pagination: DataPagination
  data: ContasReceber[]
  dataExtra: {
    total: number
  }
}
