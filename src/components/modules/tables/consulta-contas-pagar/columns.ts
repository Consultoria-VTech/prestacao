import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { useMemo } from 'react'
import { Column } from 'react-table'
import { ContasPagar } from '../../../../types/models/contasPagar'
import { formatMoney, leftPad } from '../../../../util/stringUtil'

export const columns = (): Column<ContasPagar>[] =>
  useMemo<Column<ContasPagar>[]>(
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
        Header: 'Fornecedor',
        accessor: data => data.fornecedor.razao,
        id: 'fornecedor',
      },
      // {
      //   Header: 'Natureza',
      //   accessor: data => data.planoContas.descricao,
      //   id: 'planoContas',
      // },
      {
        Header: 'Contrato',
        accessor: data => leftPad(data?.contrato?.id, 6)
      },
      // {
      //   Header: 'Centro de Custo',
      //   accessor: data => data?.centroCusto?.descricao,
      //   id: 'centroCusto',
      // },
      // {
      //   Header: 'Tipo documento',
      //   accessor: data => data.tipoDoc,
      // },
      // {
      //   Header: 'Documento',
      //   accessor: data => data.nDoc,
      // },
      {
        Header: 'Valor',
        accessor: data => data.valor && formatMoney(data.valor as number),
        id: 'valor',
      },
      // {
      //   Header: 'Parcela',
      //   accessor: data => leftPad(data.nParcelas, 2),
      // },
      // {
      //   Header: 'Emissão',
      //   accessor: data =>
      //     format(data.dtEmissao, 'dd/MM/yyyy hh:mm:ss', { locale: pt }),
      // },
      {
        Header: 'Vencimento',
        accessor: data =>
          format(data.dtVencimento as Date, 'dd/MM/yyyy', { locale: pt }),
      },
      // {
      //   Header: 'Data Baixa',
      //   accessor: data =>
      //     data.dtBaixa
      //       ? format(data.dtBaixa, 'dd/MM/yyyy hh:mm:ss', { locale: pt })
      //       : '',
      // },
      // {
      //   Header: 'Valor Baixa',
      //   accessor: data => data.valorBaixa && formatMoney(data.valorBaixa),
      //   id: 'valorBaixa',
      // },
      // {
      //   Header: 'Banco',
      //   accessor: data =>
      //     `${data?.contaBancaria?.banco?.bankId} - ${data?.contaBancaria?.banco?.name}`,
      // },
      // {
      //   Header: 'Agência',
      //   accessor: data => data?.contaBancaria?.agencia,
      // },
      // {
      //   Header: 'Conta',
      //   accessor: data => data?.contaBancaria?.conta,
      // },
      {
        Header: 'Status',
        accessor: 'status',
      },
      // {
      //   Header: 'Possui Comprovante',
      //   accessor: data => (data.possuiComprovante === true ? 'Sim' : 'Não'),
      //   id: 'possuiComprovante',
      // },
    ],
    []
  )
