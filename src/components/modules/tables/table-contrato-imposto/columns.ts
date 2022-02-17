import { useMemo } from 'react'
import { Column } from 'react-table'
import { ContratoImposto } from '../../../../types/models/contratoImposto'
import { formatPercent, leftPad } from '../../../../util/stringUtil'

export const columns = (): Column<ContratoImposto>[] =>
  useMemo<Column<ContratoImposto>[]>(
    () => [
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
        id: 'id',
      },
      {
        Header: 'Alíquota',
        accessor: data => data.imposto.descricao,
      },
      {
        Header: 'Percentual',
        accessor: data =>
          data.percentual && formatPercent((data.percentual as number) / 100),
        id: 'percentual',
      },
    ],
    []
  )
