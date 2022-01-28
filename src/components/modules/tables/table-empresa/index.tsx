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
import { Empresa, EmpresaPagination } from '../../../../types/models/empresa'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import ContextMenu from '../../../elements/context-menu'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TableHeader from '../../../elements/table-header/index'
import TablePagination from '../../../elements/table-pagination'
import { columns } from './columns'
import ContextMenuEmpresa from './context-menu'

type QueryPageEmpresas = {
  page?: string
  size?: string
}

const TableEmpresa: React.FC<InitialData<EmpresaPagination>> = ({
  data: initialData,
}) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<Empresa>(
    ModalEnum.createEmpresa
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  // const isOpenModal = router.query.openModal
  //   ? Boolean(router.query.openModal)
  //   : false

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    // canPreviousPage,
    // canNextPage,
    pageOptions,
    // pageCount,
    gotoPage,
    // nextPage,
    // previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<Empresa>(
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
  } = useFetch<EmpresaPagination>(
    `/api/empresas?page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (empresas: Empresa[]) => {
    mutate(data => ({ ...data, data: empresas }), false)
    globalMutate(`/api/empresas`, data => ({ ...data, data: empresas }))
  }

  const deleteEmpresa = React.useCallback(
    (id, empresa: Empresa) => {
      const empresas = dataFetch?.data?.filter(p => p.id !== empresa.id) || []
      updateRouteData(empresas)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuEmpresa<Empresa>({
    onItemClick: deleteEmpresa,
  })

  managerModal.on<Empresa>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const empresa = dataFetch?.data?.find(p => p.id === newValues.props.id)
        const tempData = dataFetch?.data || []
        let empresas = []

        if (!empresa) {
          empresas = [...tempData, newValues.props]
          empresas = _orderBy(empresas, ['id'], ['desc'])
        } else {
          empresas = tempData.map(user => {
            if (user.id === newValues.props.id) {
              return newValues.props
            }
            return user
          })
        }

        updateRouteData(empresas)
        updateComponent()
      }
    },
    ModalEnum.createEmpresa,
    'aaa'
  )

  useEffect(() => {
    if (dataFetch) {
      setData(dataFetch.data)
      setPageCount(dataFetch.pagination.pageCount)
      setTotalItems(dataFetch.pagination.total)
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

  const updateRouter = ({ page, size }: QueryPageEmpresas) => {
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
            openModal(ModalEnum.createEmpresa, null, { action: 'create' })
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

export default TableEmpresa
