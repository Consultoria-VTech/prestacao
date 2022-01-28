import { useMemo } from 'react'
import { Column } from 'react-table'
import { ContratoResponsavel } from '../../../../types/models/contratoResponsavel'
import { formatPercent, leftPad } from '../../../../util/stringUtil'

export const columns = (): Column<ContratoResponsavel>[] =>
  useMemo<Column<ContratoResponsavel>[]>(
    () => [
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
        id: 'id',
      },
      {
        Header: 'Responsável',
        accessor: data => data.funcionario.nome,
      },
      {
        Header: 'Percentual',
        accessor: data =>
          data.percentual && formatPercent((data.percentual as number) / 100.0),
        id: 'percentual',
      },
      {
        Header: 'Administrador',
        accessor: data => (data.admin ? 'Sim' : 'Não'),
      },
    ],
    []
  )
