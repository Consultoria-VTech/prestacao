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
  Fornecedor,
  FornecedorFiltro,
  FornecedorPagination,
} from '../../../../types/models/fornecedor'
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
import ContextMenuFornecedor from './context-menu'

type QueryPageFornecedores = {
  page?: string
  size?: string
  fornecedorFiltros?: FornecedorFiltro
}

const TableFornecedor: React.FC<InitialData<FornecedorPagination>> = ({
  data: initialData,
}) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<Fornecedor>(
    ModalEnum.createFornecedor
  )
  const { openModal: openModalFiltro } = useModal<FornecedorFiltro>(
    ModalEnum.filterFornecedor
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  const idEmpresa = Number(router.query.idEmpresa) || null
  const id = Number(router.query.id) || null
  const nome = (router.query.nome as string) || null
  const cnpj = (router.query.cnpj as string) || null
  const ativo = (router.query.ativo as string)?.toLowerCase() === 'true' || null

  const [filtros, setFiltros] = useState<FornecedorFiltro>({
    idEmpresa,
    id,
    nome,
    cnpj,
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
    state: { pageIndex, pageSize },
  } = useTable<Fornecedor>(
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
  const params = objectToQueryUrl(filtros)
  const {
    data: dataFetch,
    error,
    mutate,
    isValidating,
  } = useFetch<FornecedorPagination>(
    `/api/fornecedores?${params}&page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (fornecedores: Fornecedor[]) => {
    mutate(data => ({ ...data, data: fornecedores }), false)
    globalMutate(`/api/fornecedores`, data => ({ ...data, data: fornecedores }))
  }

  const deleteFornecedor = React.useCallback(
    (id, fornecedor: Fornecedor) => {
      const fornecedores =
        dataFetch?.data?.filter(p => p.id !== fornecedor.id) || []
      updateRouteData(fornecedores)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } =
    ContextMenuFornecedor<Fornecedor>({
      onItemClick: deleteFornecedor,
    })

  managerModal.on<Fornecedor>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const fornecedor = dataFetch?.data?.find(
          p => p.id === newValues.props.id
        )
        const tempData = dataFetch?.data || []
        let fornecedores = []

        if (!fornecedor) {
          fornecedores = [...tempData, newValues.props]
          fornecedores = _orderBy(fornecedores, ['id'], ['desc'])
        } else {
          fornecedores = tempData.map(user => {
            if (user.id === newValues.props.id) {
              return newValues.props
            }
            return user
          })
        }

        updateRouteData(fornecedores)
        updateComponent()
      }
    },
    ModalEnum.createFornecedor,
    'aaa'
  )

  managerModal.on<FornecedorFiltro>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        updateRouter({ fornecedorFiltros: newValues.props })
        setFiltros(newValues.props)
        updateComponent()
      }
    },
    ModalEnum.filterFornecedor,
    'fornecedor_filtro_id'
  )

  useEffect(() => {
    if (dataFetch) {
      setData(dataFetch.data)
      setPageCount(dataFetch.pagination?.pageCount)
      setTotalItems(dataFetch.pagination?.total)
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

  const updateRouter = ({
    page,
    size,
    fornecedorFiltros,
  }: QueryPageFornecedores) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const params = removeKeyValuesNullObject(fornecedorFiltros || filtros)

    router.push({
      query: { ...params, page, size },
    })
  }

  // const updateRouter = ({ page, size }: QueryPageFornecedores) => {
  //   const query = router.query
  //   page = page ?? (query.page as string)
  //   size = size ?? ((query.size as string) || String(pageSize) || '16')

  //   router.push({ query: { ...query, page, size } })
  // }
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
            openModal(ModalEnum.createFornecedor, null, { action: 'create' })
          }>
          <BiPlusMedical />
          Cadastrar
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModalFiltro(ModalEnum.filterFornecedor, filtros, {
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

export default TableFornecedor
