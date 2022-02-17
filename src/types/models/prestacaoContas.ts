import { DataPagination, Empresa, Funcionario, Projeto } from '@types'

export enum PrestacaoContasSituacaoEnum {
  Aberto = 1,
  AprovacaoAdministrador = 2,
  Aprovado = 3,
  Reprovado = 4,
  Finalizado = 5,
}

export const getPrestacaoContasSituacao = (
  situacao: PrestacaoContasSituacaoEnum
) => {
  switch (situacao) {
    case PrestacaoContasSituacaoEnum.Aberto:
      return 'Aberto'
    case PrestacaoContasSituacaoEnum.AprovacaoAdministrador:
      return 'Enviado para aprovação'
    case PrestacaoContasSituacaoEnum.Aprovado:
      return 'Aprovado'
    case PrestacaoContasSituacaoEnum.Reprovado:
      return 'Reprovado'
    case PrestacaoContasSituacaoEnum.Finalizado:
      return 'Pago'  
    default:
      break
  }
}

export enum PrestacaoContasTipoEnum {
  MinhasPrestacoes = 1,
  AprovacaoAdministrador = 2,
  AprovacaoFinanceira = 3,
}

export type PrestacaoContas = {
  id?: number
  empresa?: Empresa
  funcionario?: Funcionario
  projeto?: Projeto
  dtEmissao?: Date | string
  observacao?: string
  situacao?: PrestacaoContasSituacaoEnum
  valorCotacao?: number
}

export type PrestacaoContasFiltro = {
  tipo?: PrestacaoContasTipoEnum
}

export type PrestacaoContasPagination = {
  pagination: DataPagination
  data: PrestacaoContas[]
}