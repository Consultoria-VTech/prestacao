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
  CentroCusto,
  CentroCustoFiltro,
  CentroCustoPagination,
} from '../../../../types/models/centroCusto'
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
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { columns } from './columns'
import ContextMenuBanco from './context-menu'

type QueryPage = {
  page?: string
  size?: string
  centroCustoFiltros?: CentroCustoFiltro
}

const TableCentroCusto: React.FC<InitialData<CentroCustoPagination>> = ({
  data: initialData,
}) => {
  const idModal = ModalEnum.createCentroCusto

  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<CentroCusto>(idModal)
  const { openModal: openModalFiltro } = useModal<CentroCustoFiltro>(
    ModalEnum.filterCentroCusto
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  const idEmpresa = Number(router.query.idEmpresa) || null
  const id = Number(router.query.id) || null
  const descricao = (router.query.descricao as string) || null
  const ativo = (router.query.ativo as string)?.toLowerCase() === 'true' || null

  const [filtros, setFiltros] = useState<CentroCustoFiltro>({
    idEmpresa,
    id,
    descricao,
    ativo,
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
  } = useTable<CentroCusto>(
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
  } = useFetch<CentroCustoPagination>(
    `/api/centrocustos?${params}&page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (centroCustos: CentroCusto[]) => {
    mutate(data => ({ ...data, data: centroCustos }), false)
    globalMutate(`/api/centrocustos`, data => ({ ...data, data: centroCustos }))
  }

  const deleteBanco = React.useCallback(
    (id, centroCusto: CentroCusto) => {
      const centroCustos =
        dataFetch?.data?.filter(p => p.id !== centroCusto.id) || []
      updateRouteData(centroCustos)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuBanco<CentroCusto>({
    onItemClick: deleteBanco,
  })

  managerModal.on<CentroCusto>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const centroCusto = dataFetch?.data?.find(
          p => p.id === newValues.props.id
        )
        const tempData = dataFetch?.data || []
        let centroCustos = []

        if (!centroCusto) {
          centroCustos = [...tempData, newValues.props]
          centroCustos = _orderBy(centroCustos, ['id'], ['desc'])
        } else {
          centroCustos = tempData.map(centroCusto => {
            if (centroCusto.id === newValues.props.id) {
              return newValues.props
            }
            return centroCusto
          })
        }

        updateRouteData(centroCustos)
        updateComponent()
      }
    },
    idModal,
    'centro_custo_id'
  )

  managerModal.on<CentroCustoFiltro>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        updateRouter({ centroCustoFiltros: newValues.props })
        setFiltros(newValues.props)
        updateComponent()
      }
    },
    ModalEnum.filterCentroCusto,
    'centroCusto_filtro_id'
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

  const updateRouter = ({ page, size, centroCustoFiltros }: QueryPage) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const params = removeKeyValuesNullObject(centroCustoFiltros || filtros)

    router.push({
      query: { ...params, page, size },
    })
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
          onClick={() => openModal(idModal, null, { action: 'create' })}>
          <BiPlusMedical />
          Cadastrar
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModalFiltro(ModalEnum.filterCentroCusto, filtros, {
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

export default TableCentroCusto
