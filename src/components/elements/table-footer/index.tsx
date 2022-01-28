/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { QuantidadeTotalItensPorPagina } from '../../../util/constants'
import Pagination from './../../elements/pagination/index'
import Button, { BUTTON_STATE } from './../button/index'
import { TableFooterStyled } from './styles'

type TableFooterProps = {
  loading?: boolean
  pageSize?: number
  pageCount?: number
  totalItems?: number
  totalRecords?: number
  pageIndex: number
  onPageChanged: (arg) => void
  onPageSizeChange?: (value: number) => void
  showPagination?: boolean
  showPageSizeSelection?: boolean
}

const TableFooter: React.FC<TableFooterProps> = ({
  loading,
  pageSize,
  pageCount = 0,
  totalItems,
  totalRecords,
  pageIndex,
  onPageChanged,
  onPageSizeChange,
  showPagination = true,
  showPageSizeSelection = true,
  children,
}) => {
  return (
    <TableFooterStyled>
      {children && <div>{children}</div>}
      <div>
        {loading ? (
          <span>
            <Button state={BUTTON_STATE.LOADING} buttonSize="md" />
          </span>
        ) : (
          <span>
            Exibindo{' '}
            {pageSize != null && (
              <>
                <b>{pageSize > totalItems ? totalItems : pageSize}</b> de
              </>
            )}{' '}
            <b>{totalItems}</b> Resultados
          </span>
        )}

        {showPagination && (
          <Pagination
            totalRecords={totalRecords}
            pageLimit={pageSize}
            pageNeighbours={5}
            currentPage={pageIndex}
            onPageChanged={onPageChanged}
          />
        )}

        {showPageSizeSelection && (
          <span className="d-flex align-items-center justify-content-end gx-2">
            Página
            <b className="px-1">{pageIndex || 0} </b> de{' '}
            <b className="px-1">{pageCount} </b>
            {pageCount > 1 && (
              <select
                value={pageSize}
                className="ms-2 form-control form-control form-control-sm"
                style={{ width: '100px' }}
                onChange={e => onPageSizeChange(Number(e.target.value))}>
                {QuantidadeTotalItensPorPagina.map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Exibir {pageSize}
                  </option>
                ))}
              </select>
            )}
          </span>
        )}
      </div>
    </TableFooterStyled>
  )
}

export default TableFooter
