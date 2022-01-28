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
  Funcionario,
  FuncionarioPagination,
} from '../../../../types/models/funcionario'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import ContextMenu from '../../../elements/context-menu'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TableHeader from '../../../elements/table-header/index'
import TablePagination from '../../../elements/table-pagination'
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { columns } from './columns'
import ContextMenuFuncionario from './context-menu'

type QueryPageFuncionarios = {
  page?: string
  size?: string
}

const TableFuncionario: React.FC<InitialData<FuncionarioPagination>> = ({
  data: initialData,
}) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<Funcionario>(
    ModalEnum.createFuncionario
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
  } = useTable<Funcionario>(
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
  const {
    data: dataFetch,
    error,
    mutate,
    isValidating,
  } = useFetch<FuncionarioPagination>(
    `/api/funcionarios?page=${pageIndex + 1}&size=${pageSize}`,
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

  const updateRouteData = (funcionarios: Funcionario[]) => {
    mutate(data => ({ ...data, data: funcionarios }), false)
    globalMutate(`/api/funcionarios`, data => ({ ...data, data: funcionarios }))
  }

  const deleteFuncionario = React.useCallback(
    (id, funcionario: Funcionario) => {
      const funcionarios =
        dataFetch?.data?.filter(p => p.id !== funcionario.id) || []
      updateRouteData(funcionarios)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } =
    ContextMenuFuncionario<Funcionario>({
      onItemClick: deleteFuncionario,
    })

  managerModal.on<Funcionario>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const funcionario = dataFetch?.data?.find(
          p => p.id === newValues.props.id
        )
        const tempData = dataFetch?.data || []
        let funcionarios = []

        if (!funcionario) {
          funcionarios = [...tempData, newValues.props]
          funcionarios = _orderBy(funcionarios, ['id'], ['desc'])
        } else {
          funcionarios = tempData.map(user => {
            if (user.id === newValues.props.id) {
              return newValues.props
            }
            return user
          })
        }

        updateRouteData(funcionarios)
        updateComponent()
      }
    },
    ModalEnum.createFuncionario,
    'aaa'
  )

  useEffect(() => {
    if (dataFetch) {
      ;(dataFetch?.data || []).map(row => {
        row.dtAdmissao = new Date(row.dtAdmissao)
        if (row.dtDemissao) row.dtDemissao = new Date(row.dtDemissao)
        return row
      })

      console.log(dataFetch)
      setData(dataFetch?.data)
      setPageCount(dataFetch?.pagination?.pageCount)
      setTotalItems(dataFetch?.pagination?.total)
    }
  }, [dataFetch])

  const updateRouter = ({ page, size }: QueryPageFuncionarios) => {
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
            openModal(ModalEnum.createFuncionario, null, { action: 'create' })
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

export default TableFuncionario
