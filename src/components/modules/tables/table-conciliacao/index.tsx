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
  Conciliacao,
  ConciliacaoFiltros,
  ConciliacaoPagination,
} from '../../../../types/models/conciliacao'
import { isExpandModalFilter } from '../../../../util/constants'
import { objectToQueryUrl } from '../../../../util/objectToQueryUrl'
import { removeKeyValuesNullObject } from '../../../../util/removeKeyValuesNullObject'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import ContextMenu from '../../../elements/context-menu'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TableHeader from '../../../elements/table-header/index'
import TablePagination from '../../../elements/table-pagination'
import { columns } from './columns'
import ContextMenuConciliacao from './context-menu'

type QueryPage = {
  page?: string
  size?: string
  conciliacao?: ConciliacaoFiltros
}

const TableConciliacao: React.FC<InitialData<ConciliacaoPagination>> = ({
  data: initialData,
}) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<Conciliacao>(
    ModalEnum.createConciliacao
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16

  const filters: ConciliacaoFiltros = router.query
  const [filtros, setFiltros] = useState<ConciliacaoFiltros>(filters)

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
  } = useTable<Conciliacao>(
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
  } = useFetch<ConciliacaoPagination>(
    `/api/conciliacao?${params}&page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (conciliacaos: Conciliacao[]) => {
    mutate(data => ({ ...data, data: conciliacaos }), false)
    globalMutate(`/api/conciliacao`, data => ({ ...data, data: conciliacaos }))
  }

  const updateRouter = ({ page, size, conciliacao }: QueryPage) => {
    const params = removeKeyValuesNullObject(conciliacao || filtros)

    router.push({
      query: { ...params, page, size },
    })
  }

  const deleteConciliacao = React.useCallback(
    (id, conciliacao: Conciliacao) => {
      const conciliacaos =
        dataFetch?.data?.filter(p => p.id !== conciliacao.id) || []
      updateRouteData(conciliacaos)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } =
    ContextMenuConciliacao<Conciliacao>({
      onItemClick: deleteConciliacao,
    })

  managerModal.on<Conciliacao>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const conciliacao = dataFetch?.data?.find(
          p => p.id === newValues.props.id
        )
        const tempData = dataFetch?.data || []
        let conciliacaos = []

        if (!conciliacao) {
          conciliacaos = [...tempData, newValues.props]
          conciliacaos = _orderBy(conciliacaos, ['bankId'], ['desc'])
        } else {
          conciliacaos = tempData.map(conciliacao => {
            if (conciliacao.id === newValues.props.id) {
              return newValues.props
            }
            return conciliacao
          })
        }

        updateRouteData(conciliacaos)
        updateComponent()
      }
    },
    ModalEnum.createConciliacao,
    'bank_id'
  )

  managerModal.on<ConciliacaoFiltros>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        setFiltros(newValues.props)
        updateRouter({ conciliacao: newValues.props })
        updateComponent()
      }
    },
    ModalEnum.filterConciliacao,
    'bank_filtro_id'
  )

  useEffect(() => {
    if (!_isEmpty(dataFetch)) {
      ;(dataFetch?.data || []).map(row => {
        row.dataCadastro = new Date(row.dataCadastro)
        return row
      })

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
            openModal(ModalEnum.createConciliacao, null, { action: 'create' })
          }>
          <BiPlusMedical />
          Cadastro Rápido
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModal(ModalEnum.filterConciliacao, filtros, {
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

export default TableConciliacao
