import { useMemo } from 'react'
import { Column } from 'react-table'
import { Imposto } from '../../../../types/models/imposto'

export const columns = (): Column<Imposto>[] =>
  useMemo<Column<Imposto>[]>(
    () => [
      {
        Header: 'Código',
        accessor: 'id',
        style: {
          width: 80,
        },
      },
      {
        Header: 'Decrição',
        accessor: 'descricao',
      },
    ],
    []
  )
