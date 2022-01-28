import { format } from 'date-fns'
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
  ContasPagar,
  ContasPagarFiltro,
  ContasPagarPagination,
} from '../../../../types/models/contasPagar'
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
import ContextMenuContasPagar from './context-menu'

type QueryPage = {
  page?: string
  size?: string
  contasPagarFiltros?: ContasPagarFiltro
}

const TableContasPagar: React.FC<InitialData<ContasPagarPagination>> = ({
  data: initialData,
}) => {
  const idModal = ModalEnum.createContasPagar
  const idModalFilter = ModalEnum.filterContasPagar

  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<ContasPagar>(idModal)

  const { openModal: openModalFiltro } = useModal<ContasPagarFiltro>(
    ModalEnum.filterContasPagar
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16

  const idEmpresa = Number(router.query.idEmpresa) || null
  const idNatureza = Number(router.query.idNatureza) || null
  const idFornecedor = Number(router.query.idFornecedor) || null
  const idStatus = Number(router.query.idStatus) || null
  const nDoc = (router.query.nDoc as string) || null
  const tipoDoc = (router.query.tipoDoc as string) || null
  const dtEmissaoInicial =
    (router.query.dtEmissaoInicial &&
      new Date(
        new Date(router.query.dtEmissaoInicial as string)?.toISOString()
      )) ||
    null
  const dtEmissaoFinal =
    ((router.query.dtEmissaoFinal as string) &&
      new Date(
        new Date(router.query.dtEmissaoFinal as string).toISOString()
      )) ||
    null
  const dtVencimentoInicial =
    ((router.query.dtVencimentoInicial as string) &&
      new Date(
        new Date(router.query.dtVencimentoInicial as string).toISOString()
      )) ||
    null
  const dtVencimentoFinal =
    ((router.query.dtVencimentoFinal as string) &&
      new Date(
        new Date(router.query.dtVencimentoFinal as string).toISOString()
      )) ||
    null

  const [filtros, setFiltros] = useState<ContasPagarFiltro>({
    idEmpresa,
    idNatureza,
    idFornecedor,
    idStatus,
    dtEmissaoInicial,
    dtEmissaoFinal,
    dtVencimentoInicial,
    dtVencimentoFinal,
    tipoDoc,
    nDoc,
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
  } = useTable<ContasPagar>(
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

  const params = objectToQueryUrl(filtros, (key, val) => {
    if (
      key === 'dtEmissaoInicial' ||
      key === 'dtEmissaoFinal' ||
      key === 'dtVencimentoInicial' ||
      key === 'dtVencimentoFinal'
    ) {
      return `${key}=${format(val as Date, 'yyyy-MM-dd')}`
    }
  })
  const {
    data: dataFetch,
    error,
    mutate,
    isValidating,
  } = useFetch<ContasPagarPagination>(
    `/api/contaspagar?${params}&page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const updateRouter = ({ page, size, contasPagarFiltros }: QueryPage) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const filtrosTemp = contasPagarFiltros || filtros
    const dtEmissaoInicial =
      filtrosTemp.dtEmissaoInicial &&
      format(filtrosTemp.dtEmissaoInicial as Date, 'yyyy-MM-dd')
    const dtEmissaoFinal =
      filtrosTemp.dtEmissaoFinal &&
      format(filtrosTemp.dtEmissaoFinal as Date, 'yyyy-MM-dd')
    const dtVencimentoInicial =
      filtrosTemp.dtVencimentoInicial &&
      format(filtrosTemp.dtVencimentoInicial as Date, 'yyyy-MM-dd')
    const dtVencimentoFinal =
      filtrosTemp.dtVencimentoFinal &&
      format(filtrosTemp.dtVencimentoFinal as Date, 'yyyy-MM-dd')

    let params = removeKeyValuesNullObject(filtrosTemp)
    params = {
      ...params,
      dtEmissaoInicial,
      dtEmissaoFinal,
      dtVencimentoInicial,
      dtVencimentoFinal,
    }
    params = removeKeyValuesNullObject(params)

    router.push({ query: { ...params, page, size } })
  }

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (contasPagar: ContasPagar[]) => {
    mutate(data => ({ ...data, data: contasPagar }), false)
    globalMutate(`/api/contaspagar`, data => ({
      ...data,
      data: contasPagar,
    }))
  }

  const deleteContaPagar = React.useCallback(
    (id, contasPagar: ContasPagar) => {
      const contasPagarList =
        dataFetch?.data?.filter(p => p.id !== contasPagar.id) || []
      updateRouteData(contasPagarList)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } =
    ContextMenuContasPagar<ContasPagar>({
      onItemClick: deleteContaPagar,
    })

  // EVENTO EXECUTADO APÓS A MODAL DE CADASTRO SER FECHADA
  managerModal.on<ContasPagar>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const contaPagar = dataFetch?.data?.find(
          p => p.id === newValues.props.id
        )
        const tempData = dataFetch?.data || []
        let contasPagar = []

        if (!contaPagar) {
          contasPagar = [...tempData, newValues.props]
          contasPagar = _orderBy(contasPagar, ['id'], ['desc'])
        } else {
          contasPagar = tempData.map(contaPagar => {
            if (contaPagar.id === newValues.props.id) {
              return newValues.props
            }
            return contaPagar
          })
        }

        updateRouteData(contasPagar)
        updateComponent()
      }
    },
    idModal,
    'contas_pagar_id'
  )

  // EVENTO EXECUTADO APÓS A MODAL DE BAIXAR CONTA SER FECHADA
  managerModal.on<ContasPagar>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const tempData = dataFetch?.data || []
        let contasPagar = []

        contasPagar = tempData.map(contasPagar => {
          if (contasPagar.id === newValues.props.id) {
            return newValues.props
          }
          return contasPagar
        })

        updateRouteData(contasPagar)
        updateComponent()
      }
    },
    ModalEnum.baixarContasPagar,
    'contas_pagar_baixar_conta'
  )

  // EVENTO EXECUTADO APÓS A MODAL DE FILTRO SER FECHADA
  managerModal.on<ContasPagarFiltro>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        updateRouter({ contasPagarFiltros: newValues.props })
        setFiltros(newValues.props)
        updateComponent()
      }
    },
    ModalEnum.filterContasPagar,
    'contas_pagar_filtro_id'
  )

  managerModal.on<ContasPagar>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const tempData = dataFetch?.data || []
        let contasPagar = []

        contasPagar = tempData.map(contasPagar => {
          if (contasPagar.id === newValues.props.id) {
            return newValues.props
          }
          return contasPagar
        })

        updateRouteData(contasPagar)
        updateComponent()
      }
    },
    ModalEnum.renegociarContasPagar,
    'contas_pagar_renegociar_conta'
  )

  useEffect(() => {
    if (!_isEmpty(dataFetch)) {
      var pagination = dataFetch?.pagination
      let dataFetchFiltered = (dataFetch?.data || [])
        .filter(row => {
          if (row.status == 'PAGO') {
            pagination.total--
            return false
          }
          return true
        })
        .map(row => {
          row.dtEmissao = new Date(row.dtEmissao)
          row.dtVencimento = new Date(row.dtVencimento)

          if (row.dtBaixa) {
            row.dtBaixa = new Date(row.dtBaixa)
          }
          return row
        })
      setData(dataFetchFiltered)
      if (pagination) {
        setPageCount(pagination?.pageCount)
        setTotalItems(pagination?.total)
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
        {/* <DivMainContent> */}
        <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => openModal(idModal, null, { action: 'create' })}>
          <BiPlusMedical />
          Cadastro Rápido
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModalFiltro(ModalEnum.filterContasReceber, filtros, {
              action: 'filter',
              showButtonExpand: isExpandModalFilter,
            })
          }>
          <RiFilter2Fill />
          Filtrar
        </Button> */}
        {/* </DivMainContent> */}
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

export default TableContasPagar
