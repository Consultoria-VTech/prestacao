import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { useMemo } from 'react'
import { Column } from 'react-table'
import { ContasReceber } from '../../../../types/models/contasReceber'
import { formatMoney, leftPad } from '../../../../util/stringUtil'

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
      // {
      //   Header: 'Natureza',
      //   accessor: data => data.planoContas?.descricao,
      //   id: 'natureza',
      // },
      // {
      //   Header: 'Centro de Custo',
      //   accessor: data => data?.centrocusto?.descricao,
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
      // },

      // {
      //   Header: 'Banco',
      //   accessor: data =>
      //     `${data?.contaBancaria?.banco?.bankId} - ${data?.contaBancaria?.banco?.name}`,
      // },
      // {
      //   Header: 'Agência',
      //   accessor: data => leftPad(data?.contaBancaria?.agencia, 4),
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
