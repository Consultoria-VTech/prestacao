import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiPlusMedical } from 'react-icons/bi'
import { RiFilter2Fill } from 'react-icons/ri'
import { usePagination, useSortBy, useTable } from 'react-table'
import { mutate as globalMutate } from 'swr'
import { useFetch } from '../../../../hooks/useFetch'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { InitialData } from '../../../../types/initialData'
import {
  TimeSheet,
  TimeSheetFiltro,
  TimeSheetPagination,
} from '../../../../types/models/timeSheet'
import { isExpandModalFilter } from '../../../../util/constants'
import { objectToQueryUrl } from '../../../../util/objectToQueryUrl'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import ContextMenu from '../../../elements/context-menu'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TableHeader from '../../../elements/table-header/index'
import TablePagination from '../../../elements/table-pagination'
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { removeKeyValuesNullObject } from './../../../../util/removeKeyValuesNullObject'
import { columns } from './columns'
import ContextMenuTimeSheet from './context-menu'

type QueryPage = {
  page?: string
  size?: string
  timeSheetFiltros?: TimeSheetFiltro
}

const TableContasPagar: React.FC<InitialData<TimeSheetPagination>> = ({
  data: initialData,
}) => {
  const idModal = ModalEnum.createTimeSheet
  const idModalFilter = ModalEnum.filterTimeSheet

  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<TimeSheet>(idModal)

  const { openModal: openModalFiltro } = useModal<TimeSheetFiltro>(
    ModalEnum.filterTimeSheet
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16

  const tarefa = { id: Number(router.query.empresa) } || null
  const projetos = { id: Number(router.query.projetos) } || null

  const [filtros, setFiltros] = useState<TimeSheetFiltro>({
    projetos,
    tarefa,
  })

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
  } = useTable<TimeSheet>(
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

  const params = objectToQueryUrl(filtros)
  const {
    data: dataFetch,
    error,
    mutate,
    isValidating,
  } = useFetch<TimeSheetPagination>(
    `/api/apuracaohoras?${params}&page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const updateRouter = ({ page, size, timeSheetFiltros }: QueryPage) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const filtrosTemp = timeSheetFiltros || filtros

    let params = removeKeyValuesNullObject(filtrosTemp)
    params = {
      ...params,
    }
    params = removeKeyValuesNullObject(params)

    router.push({ query: { ...params, page, size } })
  }

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (timeSheet: TimeSheet[]) => {
    mutate(data => ({ ...data, data: timeSheet }), false)
    globalMutate(`/api/apuracaohoras`, data => ({
      ...data,
      data: timeSheet,
    }))
  }

  const deleteTimeSheet = React.useCallback(
    (_, timeSheet: TimeSheet) => {
      const timeSheetList =
        dataFetch?.data?.filter(p => p.id !== timeSheet.id) || []
      updateRouteData(timeSheetList)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } =
    ContextMenuTimeSheet<TimeSheet>()

  useEffect(() => {
    if (!_isEmpty(dataFetch)) {
      ;(dataFetch?.data || []).map(row => row)
      // setData(dataFetch?.data || [])

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
            openModal(ModalEnum.createTimeSheet, null, { action: 'create' })
          }>
          <BiPlusMedical />
          Cadastrar
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModalFiltro(ModalEnum.filterTimeSheet, filtros, {
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

export default TableContasPagar