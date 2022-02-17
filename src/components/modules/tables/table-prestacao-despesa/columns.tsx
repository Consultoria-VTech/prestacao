import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import {
    PrestacaoDespesa,
    PrestacaoDespesaStatus,
    PrestacaoDespesaTipoReembolso,
  } from '@types'
  import { formatMoney, leftPad , DateFormatEnum, formatDate} from '@utils'
  import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import Icon from '../../../elements/icon'
import { ICON_LIBRARY } from '../../../../types/icon'
import React from 'react'
import { MainIcons } from './styles'
import ContextMenuPrestacaoDespesa from './context-menu'


const EventClick = (props: CellProps<PrestacaoDespesa, PrestacaoDespesa>) => {
  const { displayMenu } = ContextMenuPrestacaoDespesa<PrestacaoDespesa>({
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

  export const columns = (): Column<PrestacaoDespesa>[] =>
    useMemo<Column<PrestacaoDespesa>[]>(
      () => [
        {
          Header: ' ',
          id: 'icone',
          Cell: EventClick
        },
        {
          Header: 'Código',
          accessor: data => leftPad(data.id, 5),
          id: 'id',
        },
        {
          Header: 'Tipo Despesa',
          accessor: 'descricao',
        },
        {
          Header: 'Tipo Reembolso',
          accessor: data => PrestacaoDespesaTipoReembolso[data.tipoReembolso],
          id: 'tipoReembolso',
        },
        {
          Header: 'Data Despesa',
          accessor: data => 
          format(data.dtDespesa as Date, 'dd/MM/yyyy', { locale: pt }),
        },
        {
          Header: 'Valor',
          accessor: data => data.valor && formatMoney(data.valor as number),
        },
        // {
        //   Header: 'Limite/KM',
        //   accessor: data => data.quilometragem
        // },
        {
          Header: 'Status',
          accessor: data => PrestacaoDespesaStatus[data.status],
        },
        {
          Header: 'observacao',
          accessor: 'observacao',
        },
      ],
      []
    )