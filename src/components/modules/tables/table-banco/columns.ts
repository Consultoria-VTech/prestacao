import { useMemo } from 'react'
import { Column } from 'react-table'
import { Banco } from '../../../../types/models/banco'

export const columns = (): Column<Banco>[] =>
  useMemo<Column<Banco>[]>(
    () => [
      // {
      //   Header: 'Código',
      //   accessor: data => leftPad(data.id, 6),
      //   id: 'id',
      //   style: {
      //     width: 100,
      //   },
      // },
      {
        Header: 'Código banco',
        accessor: 'bankId',
        style: {
          width: 80,
        },
      },
      {
        Header: 'Nome',
        accessor: 'name',
      },
    ],
    []
  )
