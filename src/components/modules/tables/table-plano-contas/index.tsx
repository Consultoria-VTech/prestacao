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
  PlanoContas,
  PlanoContasFiltro,
  PlanoContasPagination,
} from '../../../../types/models/planoContas'
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
  planoContasFiltro?: PlanoContasFiltro
}

const TablePlanoContas: React.FC<InitialData<PlanoContasPagination>> = ({
  data: initialData,
}) => {
  const idModal = ModalEnum.createPlanoContas

  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<PlanoContas>(idModal)
  const { openModal: openModalFiltro } = useModal<PlanoContasFiltro>(
    ModalEnum.filterPlanoContas
  )

  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  const idEmpresa = Number(router.query.idEmpresa) || null
  const id = Number(router.query.id) || null
  const idPlanoContasSintetica =
    Number(router.query.idPlanoContasSintetica) || null
  const descricao = (router.query.descricao as string) || null
  const ativo = (router.query.ativo as string)?.toLowerCase() === 'true' || null
  const receitaOuDespesa =
    (router.query.receitaOuDespesa as string)?.toLowerCase() === 'true' || null

  const [filtros, setFiltros] = useState<PlanoContasFiltro>({
    idEmpresa,
    id,
    idPlanoContasSintetica,
    descricao,
    ativo,
    receitaOuDespesa,
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
  } = useTable<PlanoContas>(
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
  } = useFetch<PlanoContasPagination>(`/api/planocontas?${params}`, {
    initialData,
    revalidateOnReconnect: true,
  })

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (planoContas: PlanoContas[]) => {
    mutate(data => ({ ...data, data: planoContas }), false)
    globalMutate(`/api/planocontas`, data => ({ ...data, data: planoContas }))
  }

  const deleteBanco = React.useCallback(
    (_, plano: PlanoContas) => {
      const planoContas = dataFetch?.data?.filter(p => p.id !== plano.id) || []
      updateRouteData(planoContas)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuBanco<PlanoContas>({
    onItemClick: deleteBanco,
  })

  managerModal.on<PlanoContas>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const plano = dataFetch?.data?.find(p => p.id === newValues.props.id)
        const tempData = dataFetch?.data || []
        let planoContas = []

        if (!plano) {
          planoContas = [...tempData, newValues.props]
          planoContas = _orderBy(planoContas, ['id'], ['desc'])
        } else {
          planoContas = tempData.map(plano => {
            if (plano.id === newValues.props.id) {
              return newValues.props
            }
            return plano
          })
        }

        updateRouteData(planoContas)
        updateComponent()
      }
    },
    idModal,
    'plano_contas_id'
  )

  managerModal.on<PlanoContasFiltro>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        updateRouter({ planoContasFiltro: newValues.props })
        setFiltros(newValues.props)
        updateComponent()
      }
    },
    ModalEnum.filterPlanoContas,
    'plano_contas_filtro_id'
  )

  useEffect(() => {
    if (!_isEmpty(dataFetch)) {
      const planos = (dataFetch?.data || []).filter(p => !p.root)
      // const planos = (dataFetch).filter(p => !p.root)
      setData(planos || [])

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

  const updateRouter = ({ planoContasFiltro }: QueryPage) => {
    const params = removeKeyValuesNullObject(planoContasFiltro || filtros)
    router.push({
      query: { ...params },
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
            openModalFiltro(ModalEnum.filterPlanoContas, filtros, {
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
            className:
              cellInfo.column.id === 'hierarquia' ||
              (cellInfo.column.id === 'descricao' &&
                cellInfo.row.cells.filter(p => p.column.id === 'nivel')[0]
                  .value < 2)
                ? 'fw-bold'
                : '',
          })}
        />
      </TableContent>

      <ContextMenu id={idContextMenu} items={items} />

      <TableFooter
        loading={(!dataFetch && !error) || isValidating}
        // pageSize={pageSize}
        pageSize={null}
        pageCount={pageOptions.length}
        totalItems={totalItems}
        totalRecords={pageCount * pageSize}
        pageIndex={pageIndex + 1}
        onPageChanged={onPageChanged}
        onPageSizeChange={onPageSizeChange}
        showPageSizeSelection={false}
        showPagination={false}
      />
    </>
  )
}

export default TablePlanoContas
