import _isEqual from 'lodash/isEqual'
import _orderBy from 'lodash/orderBy'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiPlusMedical } from 'react-icons/bi'
import { RiFilter2Fill } from 'react-icons/ri'
import { usePagination, useSortBy, useTable } from 'react-table'
import { mutate as globalMutate } from 'swr'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { managerModal, useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { InitialData } from '../../../../types/initialData'
import { Bi, BiPagination } from '../../../../types/models/bi'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import ContextMenu from '../../../elements/context-menu'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TableHeader from '../../../elements/table-header/index'
import TablePagination from '../../../elements/table-pagination'
import { columns } from './columns'
import ContextMenuBi from './context-menu'

type QueryPageBi = {
  page?: string
  size?: string
}

const TableBi: React.FC<InitialData<BiPagination>> = ({
  data: initialData,
}) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<Bi>(
    ModalEnum.createBi
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16

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
  } = useTable<Bi>(
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
  } = useFetch<BiPagination>(
    `/api/bi?page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
      onError: error => {
        if (error && !_isEqual(error, errorPrev)) {
          alertError(error)
          updateValue(error)
          setData([])
          setPageCount(0)
          setTotalItems(0)
          setPageSize(0)
        }
      },
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (bi: Bi[]) => {
    mutate(data => ({ ...data, data: bi }), false)
    globalMutate(`/api/bi`, data => ({ ...data, data: bi }))
  }

  const deleteBi = React.useCallback(
    (id, bi: Bi) => {
      const bis =
        dataFetch?.data?.filter(p => p.id !== bi.id) || []
      updateRouteData(bis)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuBi<Bi>({
    onItemClick: deleteBi,
  })

  managerModal.on<Bi>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const bi = dataFetch?.data?.find(
          p => p.id === newValues.props.id
        )
        const tempData = dataFetch?.data || []
        let bis = []

        if (!bi) {
          bis = [...tempData, newValues.props]
          bis = _orderBy(bis, ['id'], ['desc'])
        } else {
          bis = tempData.map(user => {
            if (user.id === newValues.props.id) {
              return newValues.props
            }
            return user
          })
        }

        updateRouteData(bis)
        updateComponent()
      }
    },
    ModalEnum.createBi,
    'aaa'
  )

  useEffect(() => {
    if (dataFetch) {
      (dataFetch?.data || []).map(row => {
        row.datacadastro = new Date(row.datacadastro)
        return row
      })
      setData(dataFetch.data || [])
      setPageCount(dataFetch.pagination?.pageCount)
      setTotalItems(dataFetch.pagination?.total)
    }
  }, [dataFetch])

  const updateRouter = ({ page, size }: QueryPageBi) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    router.push({ query: { ...query, page, size } })
  }
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
            openModal(ModalEnum.createBi, null, { action: 'create' })
          }>
          <BiPlusMedical />
          Cadastrar
        </Button>
        {/* <Button type="button" className="btn btn-sm btn-primary">
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
            className: cellInfo.column.id === 'id' ? 'fw-bold' : '',
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

export default TableBi