import { Id } from 'react-toastify'
import { DataPagination } from '../dataPagination'
import { ContaBancaria, idcontaBancaria } from './contaBancaria'
import { Contrato } from './contrato'
import { Empresa } from './empresa'
import { Fornecedor } from './fornecedor'
import { PlanoContas } from './planoContas'
import { CentroCusto } from './centroCusto' 

export type ContasPagarSituacao = 'PAGO' | 'ABERTO'
export type EmitirBorderoSituacao = 'SIM' | 'NAO'



export type ContasPagarBaixa = {
  id?: number
}


export type ContasPagar = {
  id?: number
  empresa?: Empresa
  planoContas?: PlanoContas
  fornecedor?: Fornecedor
  contrato?: Contrato
  valor?: number | string
  valorBaixa?: number
  dtEmissao?: Date
  dtVencimento?: Date
  dtBaixa?: Date
  contaBancaria?: ContaBancaria
  tipoDoc?: string
  nDoc?: string
  status?: ContasPagarSituacao
  nParcelas?: string | number
  renegociacao?: boolean
  comprovante?: any
  possuiComprovante?: boolean
  checked?: boolean
  bordero?: string
  situacao?: string
  valorConciliado?: number
  valorParcela?: number
  contasPagar?: ContasPagar
  idcontaBancaria?: idcontaBancaria
  idcpbaixa?: ContasPagarBaixa
  centroCusto?: CentroCusto
  idcentrocusto?: number
  parcelas?: boolean
}

export type ContasPagarFiltro = {
  idEmpresa?: number
  idNatureza?: number
  idFornecedor?: number
  idStatus?: number
  idContrato?: number
  dtEmissaoInicial?: Date
  dtEmissaoFinal?: Date
  dtVencimentoInicial?: Date
  dtVencimentoFinal?: Date
  tipoDoc?: string
  nDoc?: string
  emAtraso?: boolean
  checked?: boolean
}

export type ContasPagarFiltroAlternativo = {
  idEmpresaCp?: number
  idPlanoContasCp?: number
  idNaturezaCp?: number
  idFornecedorCp?: number
  idContratoCp?: number
  statusCp?: string
  dtEmissaoInicialCp?: Date
  dtEmissaoFinalCp?: Date
  dtVencimentoInicialCp?: Date
  dtVencimentoFinalCp?: Date
  tipoDocCp?: string
  nDocCp?: string
  emAtrasoCp?: boolean
}

export type ContasPagarPagination = {
  pagination: DataPagination
  data: ContasPagar[]
  dataExtra: {
    total: number
  }
}
