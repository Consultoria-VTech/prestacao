import _isEqual from 'lodash/isEqual'
import _orderBy from 'lodash/orderBy'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiPlusMedical } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { RiFilter2Fill } from 'react-icons/ri'
import { usePagination, useSortBy, useTable } from 'react-table'
import { mutate as globalMutate } from 'swr'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { managerModal, useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { InitialData } from '../../../../types/initialData'
import {
  Projeto,
  ProjetoFiltro,
  ProjetoPagination,
} from '../../../../types/models/projeto'
import {
  isExpandModalFilter,
  TOAST_CONTAINER,
} from '../../../../util/constants'
import { objectToQueryUrl } from '../../../../util/objectToQueryUrl'
import { removeKeyValuesNullObject } from '../../../../util/removeKeyValuesNullObject'
import Alert, { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import ContextMenu from '../../../elements/context-menu'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TableHeader from '../../../elements/table-header/index'
import TablePagination from '../../../elements/table-pagination'
import { columns } from './columns'
import ContextMenuProjeto from './context-menu'

type QueryPageProjetoes = {
  page?: string
  size?: string
  projetoFiltros?: ProjetoFiltro
}

const TableProjeto: React.FC<InitialData<ProjetoPagination>> = ({
  data: initialData,
}) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<Projeto>(
    ModalEnum.createProjeto
  )
  const { openModal: openModalFiltro } = useModal<ProjetoFiltro>(
    ModalEnum.filterProjeto
  )
  const router = useRouter()

  const [idProjetoSelecionado, setIdProjetoSelecionado] = useState<number>(null)

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  const idempresa = Number(router.query.idEmpresa) || null
  const id = Number(router.query.id) || null
  const idCliente = Number(router.query.idCliente) || null
  const idCentroCusto = Number(router.query.idCentroCusto) || null
  const status = (router.query.status as string) || null

  const [filtros, setFiltros] = useState<ProjetoFiltro>({
    id,
    idempresa,
    idCliente,
    idCentroCusto,
    status,
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
  } = useTable<Projeto>(
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
  } = useFetch<ProjetoPagination>(
    `/api/projetos?${params}&page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (projetos: Projeto[]) => {
    mutate(data => ({ ...data, data: projetos }), false)
    globalMutate(`/api/projetos`, data => ({ ...data, data: projetos }))
  }

  const deleteProjeto = React.useCallback(
    (id, projeto: Projeto) => {
      const projetos = dataFetch?.data?.filter(p => p.id !== projeto.id) || []
      updateRouteData(projetos)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuProjeto<Projeto>({
    onItemClick: deleteProjeto,
  })

  managerModal.on<Projeto>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const projeto = dataFetch?.data?.find(p => p.id === newValues.props.id)
        const tempData = dataFetch?.data || []
        let projetos = []

        if (!projeto) {
          projetos = [...tempData, newValues.props]
          projetos = _orderBy(projetos, ['id'], ['desc'])
        } else {
          projetos = tempData.map(user => {
            if (user.id === newValues.props.id) {
              return newValues.props
            }
            return user
          })
        }

        updateRouteData(projetos)
        updateComponent()
      }
    },
    ModalEnum.createProjeto,
    'aaa'
  )

  managerModal.on<ProjetoFiltro>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        updateRouter({ projetoFiltros: newValues.props })
        setFiltros(newValues.props)
        updateComponent()
      }
    },
    ModalEnum.filterProjeto,
    'projeto_filtro_id'
  )

  useEffect(() => {
    if (dataFetch) {
      ;(dataFetch?.data || []).map(row => {
        row.dtInicio = new Date(row.dtInicio)
        row.dtFinalizacao = new Date(row.dtFinalizacao)
        return row
      })

      console.log(dataFetch?.data)
      setData(dataFetch.data || [])
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

  const updateRouter = ({ page, size, projetoFiltros }: QueryPageProjetoes) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const params = removeKeyValuesNullObject(projetoFiltros || filtros)

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
        <Link href={`projetos/${idProjetoSelecionado}/responsaveis`}>
          <a
            className="btn btn-sm btn-light btn-light-custom"
            onClick={e => {
              if (!idProjetoSelecionado) {
                e.preventDefault()
                Alert({
                  title: 'Atenção',
                  body: 'Selecione um registro antes de continuar',
                  type: 'warning',
                  option: {
                    containerId: TOAST_CONTAINER.app,
                  },
                })
              }
            }}>
            <FaUsers style={{ marginRight: '.2rem' }} />
            Responsáveis
          </a>
        </Link>
        <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModal(ModalEnum.createProjeto, null, { action: 'create' })
          }>
          <BiPlusMedical />
          Cadastrar
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModalFiltro(ModalEnum.filterProjeto, filtros, {
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
          onRowClick={(_, row) => {
            setIdProjetoSelecionado(row.original.id)
          }}
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

export default TableProjeto