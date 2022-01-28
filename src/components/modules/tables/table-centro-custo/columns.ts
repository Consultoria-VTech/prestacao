import { useMemo } from 'react'
import { Column } from 'react-table'
import { CentroCusto } from '../../../../types/models/centroCusto'
import { leftPad } from '../../../../util/stringUtil'

export const columns = (): Column<CentroCusto>[] =>
  useMemo<Column<CentroCusto>[]>(
    () => [
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
        id: 'id',
        style: {
          width: 100,
        },
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
      {
        Header: 'Ativo',
        accessor: data => (data.ativo === true ? 'Ativo' : 'Inativo'),
        id: 'ativo',
      },
      {
        Header: 'Observação',
        accessor: 'observacao',
      },
    ],
    []
  )
