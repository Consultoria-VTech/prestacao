import { getPrestacaoContasSituacao, PrestacaoContas } from '@types'
import { formatMoney, leftPad } from '@utils'
import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import ContextMenuPrestacaoContas from './context-menu'
import Icon from '../../../elements/icon'
import { ICON_LIBRARY } from '../../../../types/icon'
import { MainIcons } from './styles'
import ContextMenuPrestacaoDespesa from './context-menu'


const EventClick = (props: CellProps<PrestacaoContas, PrestacaoContas>) => {
  const { displayMenu } = ContextMenuPrestacaoContas<PrestacaoContas>({
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

export const columns = (): Column<PrestacaoContas>[] =>
  useMemo<Column<PrestacaoContas>[]>(
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
        Header: 'Projeto',
        accessor: data => data?.projeto?.descricao,
        id: 'projeto',
      },
      {
        Header: 'Funcionário',
        accessor: data => data.funcionario.nome,
        id: 'funcionario',
      },
      {
        Header: 'Data Emissão',
        accessor: data =>
        format(data.dtEmissao as Date, 'dd/MM/yyyy', {
          locale: pt,
        }),
      },
      {
        Header: 'Valor Total',
        accessor: data => data.valorCotacao && formatMoney(data.valorCotacao as number) || 0,
        id: 'valorCotacao',
      },
      {
        Header: 'Situação',
        accessor: data => getPrestacaoContasSituacao(data.situacao),
      },
    ],
    []
  )