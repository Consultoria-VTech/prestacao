import _isEqual from 'lodash/isEqual'
import _orderBy from 'lodash/orderBy'
import _isEmpty from 'lodash/isEmpty'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiPlusMedical } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { RiFilter2Fill, RiPercentFill } from 'react-icons/ri'
import { usePagination, useSortBy, useTable } from 'react-table'
import { mutate as globalMutate } from 'swr'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { managerModal, useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { InitialData } from '../../../../types/initialData'
import {
  Contrato,
  ContratoFiltro,
  ContratoPagination,
  ContratoStatus,
} from '../../../../types/models/contrato'
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
import ContextMenuContrato from './context-menu'
import { consultar } from '../../../../services/contratoService'
import { ErrorData } from '~/services/api/api'


type QueryPageContratoes = {
  page?: string
  size?: string
  contratoFiltros?: ContratoFiltro
}

const TableContrato: React.FC<InitialData<ContratoPagination>> = ({
  data: initialData,
}) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<Contrato>(
    ModalEnum.createContrato
  )
  const { openModal: openModalFiltro } = useModal<ContratoFiltro>(
    ModalEnum.filterContrato
  )
  const router = useRouter()

  const [idContratoSelecionado, setIdContratoSelecionado] =
    useState<number>(null)

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  const idempresa = Number(router.query.idEmpresa) || null
  const id = Number(router.query.id) || null
  const idCliente = Number(router.query.idCliente) || null
  const idCentroCusto = Number(router.query.idCentroCusto) || null
  const status = (router.query.status as ContratoStatus) || null

  const [filtros, setFiltros] = useState<ContratoFiltro>({
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
  } = useTable<Contrato>(
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
  } = useFetch<ContratoPagination>(
    `/api/contratos?${params}&page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (contratos: Contrato[]) => {
    mutate(data => ({ ...data, data: contratos }), false)
    globalMutate(`/api/contratos`, data => ({ ...data, data: contratos }))
  }

  const deleteContrato = React.useCallback(
    (id, contrato: Contrato) => {
      const contratos = dataFetch?.data?.filter(p => p.id !== contrato.id) || []
      updateRouteData(contratos)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuContrato<Contrato>({
    onItemClick: deleteContrato,
  })

  const filterResultSetData = async (values) : Promise<Contrato[] | ErrorData> => {
    return await consultar(values)
  }

  managerModal.on<Contrato>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const contrato = dataFetch?.data?.find(p => p.id === newValues.props.id)
        const tempData = dataFetch?.data || []
        let contratos = []

        if (!contrato) {
          contratos = [...tempData, newValues.props]
          contratos = _orderBy(contratos, ['id'], ['desc'])
        } else {
          contratos = tempData.map(user => {
            if (user.id === newValues.props.id) {
              return newValues.props
            }
            return user
          })
        }

        updateRouteData(contratos)
        updateComponent()
      }
    },
    ModalEnum.createContrato,
    'aaa'
  )

  managerModal.on<ContratoFiltro>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        filterResultSetData(newValues.props).then((resultSetData : Contrato[]) => {
          if(resultSetData){
            setData(resultSetData)
          }
        })
        updateComponent()
      }
    },
    ModalEnum.filterContrato,
    'contrato_filtro_id'
  )

  useEffect(() => {
    if (!_isEmpty(dataFetch)) {
      ;(dataFetch?.data || []).map(row => {
        row.dtEmissao = new Date(row.dtEmissao)
        row.dtVencimento = new Date(row.dtVencimento)
        
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

  const updateRouter = ({
    page,
    size,
    contratoFiltros,
  }: QueryPageContratoes) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const params = removeKeyValuesNullObject(contratoFiltros || filtros)

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
        {/* <Link href={`contratos/${idContratoSelecionado}/impostos`}>
          <a
            className="btn btn-sm btn-light btn-light-custom"
            onClick={e => {
              if (!idContratoSelecionado) {
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
            <RiPercentFill style={{ marginRight: '.2rem' }} />
            Impostos
          </a>
        </Link> */}
        {/* <Link href={`contratos/${idContratoSelecionado}/responsaveis`}>
          <a
            className="btn btn-sm btn-light btn-light-custom"
            onClick={e => {
              if (!idContratoSelecionado) {
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
        </Link> */}
        <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModal(ModalEnum.createContrato, null, { action: 'create' })
          }>
          <BiPlusMedical />
          Cadastrar
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModalFiltro(ModalEnum.filterContrato, filtros, {
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
            setIdContratoSelecionado(row.original.id)
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

export default TableContrato
