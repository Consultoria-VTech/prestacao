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
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { managerModal, useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { InitialData } from '../../../../types/initialData'
import {
  Imposto,
  ImpostoFiltros,
  ImpostoPagination,
} from '../../../../types/models/imposto'
import { isExpandModalFilter } from '../../../../util/constants'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import ContextMenu from '../../../elements/context-menu'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TableHeader from '../../../elements/table-header/index'
import TablePagination from '../../../elements/table-pagination'
import { columns } from './columns'
import ContextMenuImposto from './context-menu'

type QueryPage = {
  page?: string
  size?: string
  imposto?: ImpostoFiltros
}

const TableImposto: React.FC<InitialData<ImpostoPagination>> = ({
  data: initialData,
}) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<Imposto>(
    ModalEnum.createImposto
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  const id = Number(router.query.id) || null
  const descricao = (router.query.descricao as string) || ''

  const [filtros, setFiltros] = useState<ImpostoFiltros>({ id, descricao })

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
  } = useTable<Imposto>(
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
  } = useFetch<ImpostoPagination>(
    `/api/impostos?page=${pageIndex + 1}&size=${pageSize}&id=${
      filtros?.id || ''
    }&descricao=${filtros?.descricao || ''}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (impostos: Imposto[]) => {
    mutate(data => ({ ...data, data: impostos }), false)
    globalMutate(`/api/impostos`, data => ({ ...data, data: impostos }))
  }

  const updateRouter = ({ page, size, imposto }: QueryPage) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const { id, descricao } = imposto || filtros || {}
    router.push({ query: { ...query, page, size, id, descricao } })
  }

  const deleteImposto = React.useCallback(
    (id, imposto: Imposto) => {
      const impostos = dataFetch?.data?.filter(p => p.id !== imposto.id) || []
      updateRouteData(impostos)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuImposto<Imposto>({
    onItemClick: deleteImposto,
  })

  managerModal.on<Imposto>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const imposto = dataFetch?.data?.find(p => p.id === newValues.props.id)
        const tempData = dataFetch?.data || []
        let impostos = []

        if (!imposto) {
          impostos = [...tempData, newValues.props]
          impostos = _orderBy(impostos, ['id'], ['desc'])
        } else {
          impostos = tempData.map(imposto => {
            if (imposto.id === newValues.props.id) {
              return newValues.props
            }
            return imposto
          })
        }

        updateRouteData(impostos)
        updateComponent()
      }
    },
    ModalEnum.createImposto,
    'bank_id'
  )

  managerModal.on<ImpostoFiltros>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        setFiltros(newValues.props)
        updateRouter({ imposto: newValues.props })
        updateComponent()
      }
    },
    ModalEnum.filterImposto,
    'imposto_filtro_id'
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
            openModal(ModalEnum.createImposto, null, { action: 'create' })
          }>
          <BiPlusMedical />
          Cadastrar
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModal(ModalEnum.filterImposto, filtros, {
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

export default TableImposto
