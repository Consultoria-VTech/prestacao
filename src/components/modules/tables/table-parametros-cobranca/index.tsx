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
  ParametrosCobranca,
  ParametrosCobrancaFiltros,
  ParametrosCobrancaPagination,
} from '../../../../types/models/parametrosCobranca'
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
import ContextMenuParametrosCobranca from './context-menu'

type QueryPageParametrosCobranca = {
  page?: string
  size?: string
  parametrosCobrancaFiltros?: ParametrosCobrancaFiltros
}

const TableParametrosCobranca: React.FC<
  InitialData<ParametrosCobrancaPagination>
> = ({ data: initialData }) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<ParametrosCobranca>(
    ModalEnum.createParametroCobranca
  )
  const { openModal: openModalFiltro } = useModal<ParametrosCobrancaFiltros>(
    ModalEnum.filterParametroCobranca
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  const idEmpresa = Number(router.query.idEmpresa) || null
  const id = Number(router.query.id) || null
  const descricao = (router.query.descricao as string) || null
  const ativo = (router.query.ativo as string)?.toLowerCase() === 'true' || null
  const tipo = (router.query.tipo as string)?.toLowerCase() === 'true' || null

  const [filtros, setFiltros] = useState<ParametrosCobrancaFiltros>({
    idEmpresa,
    id,
    descricao,
    tipo,
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
  } = useTable<ParametrosCobranca>(
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

  const updateRouter = ({
    page,
    size,
    parametrosCobrancaFiltros,
  }: QueryPageParametrosCobranca) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const params = removeKeyValuesNullObject(
      parametrosCobrancaFiltros || filtros
    )

    router.push({
      query: { ...params, page, size },
    })
  }

  const params = objectToQueryUrl(filtros)
  const {
    data: dataFetch,
    error,
    mutate,
    isValidating,
  } = useFetch<ParametrosCobrancaPagination>(
    `/api/parametroscobranca?${params}&page=${pageIndex + 1}&size=${pageSize}`,
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

  const updateRouteData = (parametrosCobranca: ParametrosCobranca[]) => {
    mutate(data => ({ ...data, data: parametrosCobranca }), false)
    globalMutate(`/api/parametroscobranca`, data => ({
      ...data,
      data: parametrosCobranca,
    }))
  }

  const deleteCliente = React.useCallback(
    (_, parametro: ParametrosCobranca) => {
      const parametrosCobranca =
        dataFetch?.data?.filter(p => p.id !== parametro.id) || []
      updateRouteData(parametrosCobranca)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } =
    ContextMenuParametrosCobranca<ParametrosCobranca>({
      onItemClick: deleteCliente,
    })

  managerModal.on<ParametrosCobranca>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const parametro = dataFetch?.data?.find(
          p => p.id === newValues.props.id
        )
        const tempData = dataFetch?.data || []
        let parametrosCobranca = []

        if (!parametro) {
          parametrosCobranca = [...tempData, newValues.props]
          parametrosCobranca = _orderBy(parametrosCobranca, ['id'], ['desc'])
        } else {
          parametrosCobranca = tempData.map(user => {
            if (user.id === newValues.props.id) {
              return newValues.props
            }
            return user
          })
        }

        updateRouteData(parametrosCobranca)
        updateComponent()
      }
    },
    ModalEnum.createParametroCobranca,
    'aaa'
  )

  managerModal.on<ParametrosCobrancaFiltros>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        updateRouter({ parametrosCobrancaFiltros: newValues.props })
        setFiltros(newValues.props)
        updateComponent()
      }
    },
    ModalEnum.filterParametroCobranca,
    'paramtro_cobranca_filtro_id'
  )

  useEffect(() => {
    if (dataFetch) {
      ;(dataFetch?.data || []).map(row => {
        row.dataCadastro = new Date(row.dataCadastro)

        return row
      })
      setData(dataFetch.data)
      setPageCount(dataFetch.pagination.pageCount)
      setTotalItems(dataFetch.pagination.total)
    }
  }, [dataFetch])

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
            openModal(ModalEnum.createParametroCobranca, null, {
              action: 'create',
            })
          }>
          <BiPlusMedical />
          Cadastrar
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModalFiltro(ModalEnum.filterParametroCobranca, filtros, {
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

export default TableParametrosCobranca
