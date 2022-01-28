import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import Icon from '../../../elements/icon'
import React from 'react'
import { MainIcons } from './styles'
import { ICON_LIBRARY } from '../../../../types/icon'
import ContextMenuContasPagar from './context-menu'
import { ContasPagar } from '../../../../types/models/contasPagar'
import { formatMoney, leftPad } from '../../../../util/stringUtil'


const EventClick = (props: CellProps<ContasPagar, ContasPagar>) =>  {
  const { displayMenu } = ContextMenuContasPagar<ContasPagar>({
    onItemClick: null,
  })

  return (
        <MainIcons onClick={(e) => displayMenu({e, data: props.row})}>
        <span className="btn-Edit" >
        <Icon icon="FaEdit" iconLibrary={ICON_LIBRARY.FONT_AWESOME} />
        </span>
        </MainIcons>
  )}

export const columns = (): Column<ContasPagar>[] =>
  useMemo<Column<ContasPagar>[]>(
    () => [
      {
        Header: ' ',
        id: 'icone',
        Cell: EventClick
      },
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
      },
      {
        Header: 'Código CP',
        accessor: data => leftPad(data.contasPagar, 6),
      },
      {
        Header: 'Valor Pago',
        accessor: data => data.valor && formatMoney(data.valor as number),
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
        accessor: data => data.idcontaBancaria
      },
      {
        Header: 'Situação',
        accessor: 'situacao',
      },
      // {
      //   Header: 'Natureza',
      //   accessor: data => data.planoContas.descricao,
      //   id: 'planoContas',
      // },
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
      //   Header: 'Agência',
      //   accessor: data => data?.contaBancaria?.agencia,
      // },
      // {
      //   Header: 'Possui Comprovante',
      //   accessor: data => (data.possuiComprovante === true ? 'Sim' : 'Não'),
      //   id: 'possuiComprovante',
      // },
    ],
    []
  )