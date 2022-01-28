import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import _orderBy from 'lodash/orderBy'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiPlusMedical } from 'react-icons/bi'
import { RiFilter2Fill } from 'react-icons/ri'
import { usePagination, useSortBy, useTable } from 'react-table'
import { mutate as globalMutate } from 'swr'
import { useFetch } from '../../../../hooks/useFetch'
import { managerModal, useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { InitialData } from '../../../../types/initialData'
import {
  Banco,
  BancoFiltros,
  BancoPagination,
} from '../../../../types/models/banco'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import ContextMenu from '../../../elements/context-menu'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TableHeader from '../../../elements/table-header/index'
import TablePagination from '../../../elements/table-pagination'
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { isExpandModalFilter } from './../../../../util/constants'
import { columns } from './columns'
import ContextMenuBanco from './context-menu'

type QueryPage = {
  page?: string
  size?: string
  banco?: BancoFiltros
}

const TableBanco: React.FC<InitialData<BancoPagination>> = ({
  data: initialData,
}) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<Banco>(ModalEnum.createBanco)
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  const bankId = Number(router.query.bankId) || null
  const name = (router.query.name as string) || ''

  const [filtros, setFiltros] = useState<BancoFiltros>({ bankId, name })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<Banco>(
    {
      columns: columns(),
      data,
      initialState: { pageIndex: pageCurrent, pageSize: pageSizeUrl },
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount: pageCount,
    },
    useSortBy,
    usePagination
  )

  const {
    data: dataFetch,
    error,
    mutate,
    isValidating,
  } = useFetch<BancoPagination>(
    `/api/banks?page=${pageIndex + 1}&size=${pageSize}&bankId=${
      filtros?.bankId || ''
    }&name=${filtros?.name || ''}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (bancos: Banco[]) => {
    mutate(data => ({ ...data, data: bancos }), false)
    globalMutate(`/api/banks`, data => ({ ...data, data: bancos }))
  }

  const updateRouter = ({ page, size, banco }: QueryPage) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const { bankId, name } = banco || filtros || {}
    router.push({ query: { ...query, page, size, bankId, name } })
  }

  const deleteBanco = React.useCallback(
    (id, banco: Banco) => {
      const bancos = dataFetch?.data?.filter(p => p.id !== banco.id) || []
      updateRouteData(bancos)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuBanco<Banco>({
    onItemClick: deleteBanco,
  })

  managerModal.on<Banco>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const banco = dataFetch?.data?.find(p => p.id === newValues.props.id)
        const tempData = dataFetch?.data || []
        let bancos = []

        if (!banco) {
          bancos = [...tempData, newValues.props]
          bancos = _orderBy(bancos, ['bankId'], ['desc'])
        } else {
          bancos = tempData.map(banco => {
            if (banco.id === newValues.props.id) {
              return newValues.props
            }
            return banco
          })
        }

        updateRouteData(bancos)
        updateComponent()
      }
    },
    ModalEnum.createBanco,
    'bank_id'
  )

  managerModal.on<BancoFiltros>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        setFiltros(newValues.props)
        updateRouter({ banco: newValues.props })
        updateComponent()
      }
    },
    ModalEnum.filterBanco,
    'bank_filtro_id'
  )

  useEffect(() => {
    if (!_isEmpty(dataFetch)) {
      setData(dataFetch?.data || [])

      if (dataFetch?.pagination) {
        setPageCount(dataFetch.pagination?.pageCount)
        setTotalItems(dataFetch.pagination?.total)
      }
    }
  }, [dataFetch])

  useEffect(() => {
    if (error && !_isEqual(error, errorPrev)) {
      alertError(error)
      updateValue(error)
      setData([])
      setPageCount(0)
      setTotalItems(0)
      setPageSize(0)
    }
  }, [error])

  const onPageChanged = data => {
    if (isValidating) return

    const { currentPage } = data
    if (currentPage !== 0) updateRouter({ page: currentPage })

    gotoPage(currentPage - 1)
  }

  const onPageSizeChange = (size: number) => {
    updateRouter({ page: '1', size: String(size) })
    setPageSize(size)
    gotoPage(0)
  }

  return (
    <>
      <TableHeader>
        <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModal(ModalEnum.createBanco, null, { action: 'create' })
          }>
          <BiPlusMedical />
          Cadastrar
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModal(ModalEnum.filterBanco, filtros, {
              action: 'filter',
              showButtonExpand: isExpandModalFilter,
            })
          }>
          <RiFilter2Fill />
          Filtrar
        </Button> */}
      </TableHeader>

      <TableContent>
        <TablePagination
          onMenuContext={(e, row) => displayMenu({ e, data: row })}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          prepareRow={prepareRow}
          page={page}
          getTableProps={getTableProps}
          getCellProps={cellInfo => ({
            key: cellInfo.column.id,
            className: cellInfo.column.id === 'bankId' ? 'fw-bold' : '',
          })}
        />
      </TableContent>

      <ContextMenu id={idContextMenu} items={items} />

      <TableFooter
        loading={(!dataFetch && !error) || isValidating}
        pageSize={pageSize}
        pageCount={pageOptions.length}
        totalItems={totalItems}
        totalRecords={pageCount * pageSize}
        pageIndex={pageIndex + 1}
        onPageChanged={onPageChanged}
        onPageSizeChange={onPageSizeChange}
      />
    </>
  )
}

export default TableBanco
