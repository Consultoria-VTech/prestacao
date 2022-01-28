import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import { Contrato } from '../../../../types/models/contrato'
import { leftPad } from '../../../../util/stringUtil'
import Icon from '../../../elements/icon'
import { formatMoney } from '../../../../util/stringUtil'
import { ICON_LIBRARY } from '../../../../types/icon'
import React from 'react'
import { MainIcons } from './styles'
import ContextMenuContrato from './context-menu'

const EventClick = (props: CellProps<Contrato, Contrato>) =>  {
  const { displayMenu } = ContextMenuContrato<Contrato>({
    onItemClick: null,
  })

  return (
        <MainIcons onClick={(e) => displayMenu({e, data: props.row})}>
        <span className="btn-Edit" >
        <Icon icon="FaEdit" iconLibrary={ICON_LIBRARY.FONT_AWESOME} />
        </span>
        </MainIcons>
  )}

export const columns = (): Column<Contrato>[] =>
  useMemo<Column<Contrato>[]>(
    () => [
      {
        Header: ' ',
        id: 'icone',
        Cell: EventClick
      },
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
        id: 'id',
      },
      {
        Header: 'Cliente / Fornecedor',
        accessor: data => data.cliente?.nome || data.fornecedor.razao,
        id: 'clienteOuFornecedor',
      },
      // {
      //   Header: 'Cliente',
      //   accessor: data => data.cliente?.nome,
      //   id: 'cliente',
      // },
      // {
      //   Header: 'Fornecedor',
      //   accessor: data => data.fornecedor?.razao,
      //   id: 'fornecedor',
      // },
      {
        Header: 'Tipo',
        accessor: data => data.tipo,
        // data.tipo === 'CP' ? 'Contas a pagar' : 'Contas a receber',
        id: 'tipo',
      },
      {
        Header: 'Centro de custo',
        accessor: data => data.centroCusto?.descricao,
        id: 'centroCusto',
      },
      {
        Header: 'Valor',
        accessor: data => data.valor && formatMoney(data.valor as number),
      },
      {
        Header: 'Qtd. Parcelas',
        accessor: data => leftPad(data.nparcelas, 2),
      },
      {
        Header: 'Emissão',
        accessor: data =>
          format(data.dtEmissao as Date, 'dd/MM/yyyy', { locale: pt }),
      },
      {
        Header: 'Vencimento',
        accessor: data =>
          format(data.dtVencimento as Date, 'dd/MM/yyyy', { locale: pt }),
      },
      {
        Header: 'status',
        accessor: 'status',
      },
      {
        Header: 'Observação',
        accessor: 'observacao',
      },
    ],
    []
  )
