import { ActionEnum } from '@types'
import _isEqual from 'lodash/isEqual'
import _orderBy from 'lodash/orderBy'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiPlusMedical, BiTrendingDown } from 'react-icons/bi'
import { RiFilter2Fill } from 'react-icons/ri'
import { usePagination, useSortBy, useTable } from 'react-table'
import { mutate as globalMutate } from 'swr'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { managerModal, useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { InitialData } from '../../../../types/initialData'
import {
  PrestacaoContas,
  PrestacaoContasFiltro,
  PrestacaoContasPagination,
  PrestacaoContasSituacaoEnum,
  PrestacaoContasTipoEnum,
} from '../../../../types/models/prestacaoContas'
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
import ContextMenuPrestacaoContas from './context-menu'

type QueryPagePrestacaoContases = {
  page?: string
  size?: string
  prestacaoContasFiltros?: PrestacaoContasFiltro
}

type TablePrestacaoContasProps = InitialData<PrestacaoContasPagination> & {
  tipo: PrestacaoContasTipoEnum
}

const TablePrestacaoContas = ({
  data: initialData,
  tipo,
}: TablePrestacaoContasProps) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<PrestacaoContas>(
    ModalEnum.createPrestacaoContas
  )
  const { openModal: openModalFiltro } = useModal<PrestacaoContasFiltro>(
    ModalEnum.filterPrestacaoContas
  )
  const router = useRouter()

  const [prestacaoContasSelecionado, setPrestacaoContasSelecionado] =
    useState<PrestacaoContas>(null)

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  const pageAp = router.pathname
  const idempresa = Number(router.query.idEmpresa) || null
  const id = Number(router.query.id) || null
  const idCliente = Number(router.query.idCliente) || null
  const idCentroCusto = Number(router.query.idCentroCusto) || null
  const status = (router.query.status as string) || null

  const [filtros, setFiltros] = useState<PrestacaoContasFiltro>({})

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
  } = useTable<PrestacaoContas>(
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

  if(pageAp === '/gestao/cadastros/prestacaocontas/aprovacaofinanceira'){
    tipo = 3
  }

  if(pageAp === '/gestao/cadastros/prestacaocontas/minhasprestacoes'){
    tipo = 1
  }

  const params = objectToQueryUrl(filtros)
  const getTipoSituacao = () => {
    switch (tipo) {
      case PrestacaoContasTipoEnum.MinhasPrestacoes:
        return "/api/prestacaocontas?${params}&idSituacao=&"
      case PrestacaoContasTipoEnum.AprovacaoAdministrador:
        return "/api/prestacaocontas?${params}&idSituacao=2&"
      case PrestacaoContasTipoEnum.AprovacaoFinanceira:
        return "/api/prestacaocontas/aprovados?"
      default: null;
    }
  }
  console.log(getTipoSituacao());
  const {
    data: dataFetch,
    error,
    mutate,
    isValidating,
  } = useFetch<PrestacaoContasPagination>(
    `${getTipoSituacao()}page=${
      pageIndex + 1
    }&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (prestacaoContas: PrestacaoContas[]) => {
    mutate(data => ({ ...data, data: prestacaoContas }), false)
    globalMutate(`/api/prestacaocontas`, data => ({
      ...data,
      data: prestacaoContas,
    }))
  }

  const deletePrestacaoContas = React.useCallback(
    (action, prestacaoConta: PrestacaoContas) => {
      let prestacaoList = null
      if (action === ActionEnum.delete) {
        prestacaoList =
          dataFetch?.data?.filter(p => p.id !== prestacaoConta.id) || []
      } else {
        const tempData = dataFetch?.data || []

        prestacaoList = tempData.map(p => {
          if (p.id === prestacaoConta.id) {
            return prestacaoConta
          }
          return p
        })
      }

      updateRouteData(prestacaoList)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } =
    ContextMenuPrestacaoContas<PrestacaoContas>({
      onItemClick: deletePrestacaoContas,
      tipo,
    })

  managerModal.on<PrestacaoContas>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const prestacaoConta = dataFetch?.data?.find(
          p => p.id === newValues.props.id
        )
        const tempData = dataFetch?.data || []
        let prestacaoContas = []

        if (!prestacaoConta) {
          prestacaoContas = [...tempData, newValues.props]
          prestacaoContas = _orderBy(prestacaoContas, ['id'], ['desc'])
        } else {
          prestacaoContas = tempData.map(user => {
            if (user.id === newValues.props.id) {
              return newValues.props
            }
            return user
          })
        }

        updateRouteData(prestacaoContas)
        updateComponent()
      }
    },
    ModalEnum.createPrestacaoContas,
    'aaa'
  )

  managerModal.on<PrestacaoContasFiltro>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        updateRouter({ prestacaoContasFiltros: newValues.props })
        setFiltros(newValues.props)
        updateComponent()
      }
    },
    ModalEnum.filterPrestacaoContas,
    'prestacaoContas_filtro_id'
  )

  useEffect(() => {
    if (dataFetch) {
      ;(dataFetch?.data || []).map(row => {
        row.dtEmissao = new Date(row.dtEmissao.toString().replace(/-/g, '\/'))
        return row
        
      })
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

  const updateRouter = ({
    page,
    size,
    prestacaoContasFiltros,
  }: QueryPagePrestacaoContases) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const params = removeKeyValuesNullObject(prestacaoContasFiltros || filtros)

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
        {/* <Link
          href={`/gestao/cadastros/prestacaocontas/${prestacaoContasSelecionado?.id}/despesas`}>
          <a
            className="btn btn-sm btn-light btn-light-custom"
            onClick={e => {
              if (!prestacaoContasSelecionado?.id) {
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
            {tipo === PrestacaoContasTipoEnum.MinhasPrestacoes && (
              <BiTrendingDown style={{ marginRight: '.2rem' }} />
            )}
            {tipo === PrestacaoContasTipoEnum.AprovacaoAdministrador
              ? 'Aprovar'
              : 'Despesas'}
          </a>
        </Link> */}
        {tipo === PrestacaoContasTipoEnum.MinhasPrestacoes && (
          <Button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() =>
              openModal(ModalEnum.createPrestacaoContas, null, {
                action: 'create',
              })
            }>
            <BiPlusMedical />
            Cadastrar
          </Button>
        )}
        {/* {tipo === PrestacaoContasTipoEnum.AprovacaoAdministrador && (
          <Button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() =>
              openModal(
                ModalEnum.createPrestacaoContas,
                prestacaoContasSelecionado,
                {
                  action: 'update',
                }
              )
            }>
            <BiPlusMedical />
            Alterar
          </Button>
        )} */}
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModalFiltro(ModalEnum.filterPrestacaoContas, filtros, {
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
            setPrestacaoContasSelecionado(row.original)
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

export default TablePrestacaoContas