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
  Cliente,
  ClienteFiltro,
  ClientePagination,
} from '../../../../types/models/cliente'
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
import ContextMenuCliente from './context-menu'

type QueryPageClientes = {
  page?: string
  size?: string
  clienteFiltros?: ClienteFiltro
}

const TableCliente: React.FC<InitialData<ClientePagination>> = ({
  data: initialData,
}) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<Cliente>(
    ModalEnum.createCliente
  )
  const { openModal: openModalFiltro } = useModal<ClienteFiltro>(
    ModalEnum.filterCliente
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  const idEmpresa = Number(router.query.idEmpresa) || null
  const id = Number(router.query.id) || null
  const nome = (router.query.nome as string) || null
  const cnpj = (router.query.cnpj as string) || null
  const filial = (router.query.filial as string) || null
  const ativo = (router.query.ativo as string)?.toLowerCase() === 'true' || null

  const [filtros, setFiltros] = useState<ClienteFiltro>({
    idEmpresa,
    id,
    nome,
    cnpj,
    filial,
    ativo,
  })

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
    state: { pageIndex = 1, pageSize },
  } = useTable<Cliente>(
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

  // &order=${
  //   sortBy.length > 0 ? sortBy[0] : 'id'
  // }&desc=${sortBy.length > 0 ? sortBy[1] : 'desc'}

  const updateRouter = ({ page, size, clienteFiltros }: QueryPageClientes) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const params = removeKeyValuesNullObject(clienteFiltros || filtros)

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
  } = useFetch<ClientePagination>(
    `/api/clientes?${params}&page=${pageIndex + 1}&size=${pageSize}`,
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

  const updateRouteData = (clientes: Cliente[]) => {
    mutate(data => ({ ...data, data: clientes }), false)
    globalMutate(`/api/clientes`, data => ({ ...data, data: clientes }))
  }

  const deleteCliente = React.useCallback(
    (_, cliente: Cliente) => {
      const clientes = dataFetch?.data?.filter(p => p.id !== cliente.id) || []
      updateRouteData(clientes)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuCliente<Cliente>({
    onItemClick: deleteCliente,
  })

  managerModal.on<Cliente>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const cliente = dataFetch?.data?.find(p => p.id === newValues.props.id)
        const tempData = dataFetch?.data || []
        let clientes = []

        if (!cliente) {
          clientes = [...tempData, newValues.props]
          clientes = _orderBy(clientes, ['id'], ['desc'])
        } else {
          clientes = tempData.map(user => {
            if (user.id === newValues.props.id) {
              return newValues.props
            }
            return user
          })
        }

        updateRouteData(clientes)
        updateComponent()
      }
    },
    ModalEnum.createCliente,
    'aaa'
  )

  managerModal.on<ClienteFiltro>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        updateRouter({ clienteFiltros: newValues.props })
        setFiltros(newValues.props)
        updateComponent()
      }
    },
    ModalEnum.filterCliente,
    'cliente_filtro_id'
  )

  useEffect(() => {
    console.log('Antes', dataFetch.pagination)
    if (dataFetch) {
      setData(dataFetch.data)
      setPageCount(dataFetch.pagination?.pageCount)
      setTotalItems(dataFetch.pagination?.total)
    }
  }, [dataFetch, console.log('Depois', dataFetch.pagination)])

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
            openModal(ModalEnum.createCliente, null, { action: 'create' })
          }>
          <BiPlusMedical />
          Cadastrar
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModalFiltro(ModalEnum.filterCliente, filtros, {
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

export default TableCliente
