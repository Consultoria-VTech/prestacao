import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { useMemo } from 'react'
import { Column } from 'react-table'
import { ContasReceber } from '../../../../types/models/contasReceber'
import { leftPad } from '../../../../util/stringUtil'
import { formatMoney } from './../../../../util/stringUtil'

export const columns = (): Column<ContasReceber>[] =>
  useMemo<Column<ContasReceber>[]>(
    () => [
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
        id: 'id',
        style: {
          width: 100,
        },
      },
      {
        Header: 'Cliente',
        accessor: data => data.cliente?.nome,
        id: 'cliente',
      },
      {
        Header: 'Natureza',
        accessor: data => data.planoContas?.descricao,
        id: 'natureza',
      },
      {
        Header: 'Contrato',
        accessor: data => leftPad(data?.contrato?.id, 6),
        id: 'idContrato',
      },
      {
        Header: 'Tipo documento',
        accessor: data => data.tipoDoc,
      },
      {
        Header: 'Documento',
        accessor: data => data.nDoc,
      },
      {
        Header: 'Valor',
        accessor: data => data.valor && formatMoney(data.valor as number),
      },
      {
        Header: 'Parcela',
        accessor: data => leftPad(data.nParcelas, 2),
      },
      {
        Header: 'Emissão',
        accessor: data =>
          format(data.dtEmissao as Date, 'dd/MM/yyyy hh:mm:ss', { locale: pt }),
      },
      {
        Header: 'Vencimento',
        accessor: data =>
          format(data.dtVencimento as Date, 'dd/MM/yyyy', { locale: pt }),
      },
      {
        Header: 'Data Baixa',
        accessor: data =>
          data.dtBaixa
            ? format(data.dtBaixa as Date, 'dd/MM/yyyy hh:mm:ss', { locale: pt })
            : '',
      },
      {
        Header: 'Valor Baixa',
        accessor: data => data.valorBaixa && formatMoney(data.valorBaixa),
      },

      {
        Header: 'Banco',
        accessor: data =>
          data.contaBancaria &&
          `${data?.contaBancaria?.banco?.bankId} - ${data?.contaBancaria?.banco?.name}`,
      },
      {
        Header: 'Agência',
        accessor: data => data?.contaBancaria?.agencia,
      },
      {
        Header: 'Conta',
        accessor: data => data?.contaBancaria?.conta,
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Renegociado',
        accessor: data => (data.renegociacao === true ? 'Sim' : 'Não'),
        id: 'renegociacao',
      },
      {
        Header: 'Possui Comprovante',
        accessor: data => (data.possuiComprovante === true ? 'Sim' : 'Não'),
        id: 'possuiComprovante',
      },
    ],
    []
  )
