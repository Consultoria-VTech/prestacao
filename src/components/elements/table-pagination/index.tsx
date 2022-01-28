import React, { useCallback, useState } from 'react'
import {
  Cell,
  ColumnInstance,
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  TableCellProps,
  TableHeaderProps,
  TablePropGetter,
  TableProps as ReactTableProps,
} from 'react-table'
import { TablePaginationStyled, TrStyled } from './styles'

export interface TableProps<T extends object = {}> {
  // eslint-disable-next-line no-unused-vars
  getTableProps: (propGetter?: TablePropGetter<T>) => ReactTableProps
  // eslint-disable-next-line no-unused-vars
  getTableBodyProps: (propGetter?: TableBodyPropGetter<T>) => TableBodyProps
  // eslint-disable-next-line no-unused-vars
  prepareRow: (row: Row<T>) => void
  // eslint-disable-next-line no-unused-vars
  headerGroups: HeaderGroup<T>[]
  // eslint-disable-next-line no-unused-vars
  onRowClick?: (e: React.MouseEvent<HTMLElement>, row: Row<T>) => void
  // eslint-disable-next-line no-unused-vars
  onMenuContext?: (e: React.MouseEvent<HTMLElement>, row: Row<T>) => void
  page: Row<T>[]

  getColumnProps?: (column: ColumnInstance<T>) => TableHeaderProps
  getCellProps?: (cell: Cell<T>) => TableCellProps
  getHeaderProps?: (header: HeaderGroup<any>) => TableHeaderProps
}

const defaultPropGetter = (): TableHeaderProps => ({ key: 0 })

const TablePagination = <T extends object = {}>({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  page,
  onRowClick,
  onMenuContext,
  getColumnProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  getHeaderProps = defaultPropGetter,
}: TableProps<T>): JSX.Element => {
  const [selected, setSelected] = useState([])

  const handleRowClick = useCallback(
    (e: React.MouseEvent<HTMLElement>, row: Row<T>) => {
      const a = selected.indexOf(row.index)
      if (a === -1) {
        setSelected([row.index])
      }

      const array = selected

      if (a !== -1) {
        array.splice(a, 1)
        setSelected(array)
      }

      if (onRowClick) onRowClick(e, row)
      if (onMenuContext && e.type === 'contextmenu') onMenuContext(e, row)
    },
    []
  )

  return (
    <TablePaginationStyled
      className="table align-items-center table-flush"
      {...getTableProps()}>
      <thead>
        {(headerGroups || []).map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {(headerGroup.headers || []).map(column => (
              <th
                scope="col"
                {...column.getHeaderProps([
                  {
                    className: column?.className,
                    style: column?.style,
                  },
                  getColumnProps(column),
                  getHeaderProps(column),
                  // column.getSortByToggleProps(),
                ])}
                key={column.id}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {(page || []).map(row => {
          prepareRow(row)
          return (
            <TrStyled
              selected={selected.indexOf(row.index) !== -1}
              {...row.getRowProps()}
              key={row.id}
              onClick={e => handleRowClick(e, row)}
              onContextMenu={e => handleRowClick(e, row)}>
              {(row.cells || []).map(cell => {
                return (
                  <td
                    // {...cell.getCellProps()}
                    {...cell.getCellProps([
                      {
                        className: cell.column?.className,
                        style: cell.column?.style,
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ])}
                    key={cell.getCellProps().key}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </TrStyled>
          )
        })}
      </tbody>
    </TablePaginationStyled>
  )
}

export default TablePagination
