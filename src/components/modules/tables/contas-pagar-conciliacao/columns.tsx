import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import React, { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import { ICON_LIBRARY } from '../../../../types/icon'
import { ContasPagar } from '../../../../types/models/contasPagar'
import { formatMoney, leftPad } from '../../../../util/stringUtil'
import Icon from '../../../elements/icon'
import { MainIcons } from '../contas-receber-conciliacao/styles'
import ContextMenuContasPagar from './context-menu'

const EventClick = (props: CellProps<ContasPagar, ContasPagar>) => {
  const { displayMenu } = ContextMenuContasPagar<ContasPagar>({
    onItemClick: null,
  })

  return (
    <MainIcons onClick={e => displayMenu({ e, data: props.row })}>
      <span className="btn-Edit">
        <Icon icon="FaEdit" iconLibrary={ICON_LIBRARY.FONT_AWESOME} />
      </span>
    </MainIcons>
  )
}

export const columns = (): Column<ContasPagar>[] =>
  useMemo<Column<ContasPagar>[]>(
    () => [
      {
        Header: ' ',
        id: 'icone',
        Cell: EventClick,
      },
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
      {
        Header: 'Data Vencimento',
        accessor: data =>
          format(data.dtVencimento, 'dd/MM/yyyy', { locale: pt }),
      },
      // {
      //   Header: 'Valor Original',
      //   accessor: data => data.valor && formatMoney(data.valor as number),
      // },
      {
        Header: 'Valor Parcela',
        accessor: data => data.valorParcela && formatMoney(data.valor as number),
      },
      {
        Header: 'Valor Pago',
        accessor: data => data.valorBaixa && formatMoney(data.valorBaixa),
      },
      {
        Header: 'Data Pagamento',
        accessor: data =>
          data.dtBaixa
            ? format(data.dtBaixa as Date, 'dd/MM/yyyy', { locale: pt })
            : '',
      },
      {
        Header: 'Banco',
        accessor: data =>
          data.contaBancaria &&
          `${data?.contaBancaria?.banco?.bankId} - ${data?.contaBancaria?.banco?.name}`,
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      // {
      //   Header: 'Natureza',
      //   accessor: data => data.planoContas.descricao,
      //   id: 'planoContas',
      // },
      // {
      //   Header: 'Tipo documento',
      //   accessor: data => data.tipoDoc,
      // },
      // {
      //   Header: 'Documento',
      //   accessor: data => data.nDoc,
      // },
      // {
      //   Header: 'Data Pagamento',
      //   // accessor: data =>
      //   //   format(data.dtEmissao, 'dd/MM/yyyy hh:mm:ss', { locale: pt }),
      // },
      // {
      //   Header: 'Valor Original',
      //   accessor: data => data.valor && formatMoney(data.valor as number),
      // },
      // {
      //   Header: 'Parcela',
      //   accessor: data => leftPad(data.nParcelas, 2),
      // },
      // {
      //   Header: 'Emissão',
      //   accessor: data =>
      //     format(data.dtEmissao, 'dd/MM/yyyy hh:mm:ss', { locale: pt }),
      // },

      // {
      //   Header: 'Valor Baixa',
      //   accessor: data => data.valorBaixa && formatMoney(data.valorBaixa),
      //   id: 'valorBaixa',
      // },
      // {
      //   Header: 'Agência',
      //   accessor: data => data?.contaBancaria?.agencia,
      // },
      // {
      //   Header: 'Conta',
      //   accessor: data => data?.contaBancaria?.conta,
      // },
      // {
      //   Header: 'Renegociado',
      //   accessor: data => (data.renegociacao === true ? 'Sim' : 'Não'),
      //   id: 'renegociacao',
      // },
      // {
      //   Header: 'Possui Comprovante',
      //   accessor: data => (data.possuiComprovante === true ? 'Sim' : 'Não'),
      //   id: 'possuiComprovante',
      // },
    ],
    []
  )
