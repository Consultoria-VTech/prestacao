import { ProjetoResponsavel } from '@types'
import { leftPad } from '@utils'
import { useMemo } from 'react'
import { Column } from 'react-table'

export const columns = (): Column<ProjetoResponsavel>[] =>
  useMemo<Column<ProjetoResponsavel>[]>(
    () => [
      {
        Header: 'Código',
        accessor: data => leftPad(data.funcionario.id, 6),
        id: 'id',
      },
      {
        Header: 'Responsável',
        accessor: data => data.funcionario.nome,
      },
    ],
    []
  )