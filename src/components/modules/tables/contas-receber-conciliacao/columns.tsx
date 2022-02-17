import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import React, { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import { ICON_LIBRARY } from '../../../../types/icon'
import { ContasReceber } from '../../../../types/models/contasReceber'
import { formatMoney, leftPad } from '../../../../util/stringUtil'
import Icon from '../../../elements/icon'
import ContextMenuContasReceber from './context-menu'
import { MainIcons } from './styles'

const EventClick = (props: CellProps<ContasReceber, ContasReceber>) => {
  const { displayMenu } = ContextMenuContasReceber<ContasReceber>({
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

export const columns = (): Column<ContasReceber>[] =>
  useMemo<Column<ContasReceber>[]>(
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
        Header: 'Cliente',
        accessor: data => data.cliente?.nome,
        id: 'cliente',
      },
      {
        Header: 'Data Vencimento',
        accessor: data =>
          format(data.dtVencimento as Date, 'dd/MM/yyyy', { locale: pt }),
      },
      // {
      //   Header: 'Valor Original',
      //   accessor: data => data.valor && formatMoney(data.valor as number),
      // },
      {
        Header: 'Valor Parcela',
        accessor: data =>
          data.valorParcela && formatMoney(data.valorParcela as number),
      },
      {
        Header: 'Valor Recebido',
        accessor: data =>
          data.valorBaixa && formatMoney(data.valorBaixa as number),
      },
      {
        Header: 'Data Recebimento',
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
      //   Header: 'Emitida',
      //   accessor: 'emitido',
      // },
      // {
      //   Header: 'Natureza',
      //   accessor: data => data.planoContas?.descricao,
      //   id: 'natureza',
      // },
      // {
      //   Header: 'Contrato',
      //   accessor: data => leftPad(data?.contrato?.id, 6),
      //   id: 'idContrato',
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
      //   Header: 'Parcela',
      //   accessor: data => leftPad(data.nParcelas, 2),
      // },
      // {
      //   Header: 'Data Pagamento',
      //   // accessor: data =>
      //   //   format(data.dtEmissao, 'dd/MM/yyyy hh:mm:ss', { locale: pt }),
      // },
      // {
      //   Header: 'Valor Recebido',
      //   accessor: data => data.valor && formatMoney(data.valor as number),
      // },
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
      //   Header: 'Agência',
      //   accessor: data => leftPad(data?.contaBancaria?.agencia, 4),
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
function handleItemClick(): React.MouseEventHandler<HTMLButtonElement> {
  throw new Error('Function not implemented.')
}
