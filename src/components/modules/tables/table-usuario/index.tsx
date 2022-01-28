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
import { Usuario, UsuarioPagination } from '../../../../types/models/usuario'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import ContextMenu from '../../../elements/context-menu'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TableHeader from '../../../elements/table-header/index'
import TablePagination from '../../../elements/table-pagination'
import { columns } from './columns'
import ContextMenuUsuario from './context-menu'

type QueryPageUsuarios = {
  page?: string
  size?: string
}

const TableUsuario: React.FC<InitialData<UsuarioPagination>> = ({
  data: initialData,
}) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<Usuario>(
    ModalEnum.createUsuario
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16

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
  } = useTable<Usuario>(
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
  } = useFetch<UsuarioPagination>(
    `/api/usuarios?page=${pageIndex + 1}&size=${pageSize}`,
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

  const updateRouteData = (usuarios: Usuario[]) => {
    mutate(data => ({ ...data, data: usuarios }), false)
    globalMutate(`/api/usuarios`, data => ({ ...data, data: usuarios }))
  }

  const deleteUsuario = React.useCallback(
    (id, usuario: Usuario) => {
      const usuarios =
        dataFetch?.data?.filter(p => p.idUsuario !== usuario.idUsuario) || []
      updateRouteData(usuarios)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuUsuario<Usuario>({
    onItemClick: deleteUsuario,
  })

  managerModal.on<Usuario>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const usuario = dataFetch?.data?.find(
          p => p.idUsuario === newValues.props.idUsuario
        )
        const tempData = dataFetch?.data || []
        let usuarios = []

        if (!usuario) {
          usuarios = [...tempData, newValues.props]
          usuarios = _orderBy(usuarios, ['id'], ['desc'])
        } else {
          usuarios = tempData.map(user => {
            if (user.idUsuario === newValues.props.idUsuario) {
              return newValues.props
            }
            return user
          })
        }

        updateRouteData(usuarios)
        updateComponent()
      }
    },
    ModalEnum.createUsuario,
    'aaa'
  )

  useEffect(() => {
    if (dataFetch) {
      ;(dataFetch?.data || []).map(row => {
        row.dataCadastro = new Date(row.dataCadastro)
        return row
      })
      console.log(dataFetch)
      setData(dataFetch?.data)
      setPageCount(dataFetch?.pagination?.pageCount)
      setTotalItems(dataFetch?.pagination?.total)
    }
  }, [dataFetch])

  const updateRouter = ({ page, size }: QueryPageUsuarios) => {
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
            openModal(ModalEnum.createUsuario, null, { action: 'create' })
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

export default TableUsuario