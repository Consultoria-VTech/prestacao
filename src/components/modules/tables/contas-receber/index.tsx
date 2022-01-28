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
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { InitialData } from '../../../../types/initialData'
import {
  ContasReceber,
  ContasReceberFiltro,
  ContasReceberPagination,
} from '../../../../types/models/contasReceber'
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
import ContextMenuContasReceber from './context-menu'

type QueryPage = {
  page?: string
  size?: string
  contasReceberFiltros?: ContasReceberFiltro
}

const TableContasReceber: React.FC<InitialData<ContasReceberPagination>> = ({
  data: initialData,
}) => {
  const idModal = ModalEnum.createContasReceber
  const idModalFilter = ModalEnum.filterContasReceber

  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<ContasReceber>(idModal)

  const { openModal: openModalFiltro } = useModal<ContasReceberFiltro>(
    ModalEnum.filterContasReceber
  )

  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16

  const idEmpresa = Number(router.query.idEmpresa) || null
  const idPlanoContas = Number(router.query.idPlanoContas) || null
  const idCliente = Number(router.query.idCliente) || null
  const idContrato = Number(router.query.idContrato) || null

  const status = (router.query.status as string) || null
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

  const [filtros, setFiltros] = useState<ContasReceberFiltro>({
    idEmpresa,
    idPlanoContas,
    idCliente,
    idContrato,
    status,
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
  } = useTable<ContasReceber>(
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
  } = useFetch<ContasReceberPagination>(
    `/api/contasreceber?${params}&page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const updateRouter = ({ page, size, contasReceberFiltros }: QueryPage) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const filtrosTemp = contasReceberFiltros || filtros
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

  const updateRouteData = (contasReceber: ContasReceber[]) => {
    mutate(data => ({ ...data, data: contasReceber }), false)
    globalMutate(`/api/contasreceber`, data => ({
      ...data,
      data: contasReceber,
    }))
  }

  const deleteBanco = React.useCallback(
    (id, contaReceber: ContasReceber) => {
      const contasReceber =
        dataFetch?.data?.filter(p => p.id !== contaReceber.id) || []
      updateRouteData(contasReceber)
    },
    [dataFetch]
  )

  const { displayMenu, items } = ContextMenuContasReceber<ContasReceber>({
    onItemClick: deleteBanco,
  })

  // EVENTO EXECUTADO APÓS A MODAL DE CADASTRO SER FECHADA
  managerModal.on<ContasReceber>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const contaReceber = dataFetch?.data?.find(
          p => p.id === newValues.props.id
        )
        const tempData = dataFetch?.data || []
        let contasReceber = []

        if (!contaReceber) {
          contasReceber = [...tempData, newValues.props]
          contasReceber = _orderBy(contasReceber, ['id'], ['desc'])
        } else {
          contasReceber = tempData.map(contaReceber => {
            if (contaReceber.id === newValues.props.id) {
              return newValues.props
            }
            return contaReceber
          })
        }

        updateRouteData(contasReceber)
        updateComponent()
      }
    },
    idModal,
    'contas_receber_id'
  )

  // EVENTO EXECUTADO APÓS A MODAL DE BAIXAR CONTA SER FECHADA
  managerModal.on<ContasReceber>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const tempData = dataFetch?.data || []
        let contasReceber = []

        contasReceber = tempData.map(contaReceber => {
          if (contaReceber.id === newValues.props.id) {
            return newValues.props
          }
          return contaReceber
        })

        updateRouteData(contasReceber)
        updateComponent()
      }
    },
    ModalEnum.baixarContasReceber,
    'contas_receber_baixar_conta'
  )

  managerModal.on<ContasReceber>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const tempData = dataFetch?.data || []
        let contasReceber = []

        contasReceber = tempData.map(contaReceber => {
          if (contaReceber.id === newValues.props.id) {
            return newValues.props
          }
          return contaReceber
        })

        updateRouteData(contasReceber)
        updateComponent()
      }
    },
    ModalEnum.renegociarContasReceber,
    'contas_receber_renegociar_conta'
  )

  // EVENTO EXECUTADO APÓS A MODAL DE FILTRO SER FECHADA
  managerModal.on<ContasReceberFiltro>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        updateRouter({ contasReceberFiltros: newValues.props })
        setFiltros(newValues.props)
        updateComponent()
      }
    },
    ModalEnum.filterContasReceber,
    'contas_receber_filtro_id'
  )

  useEffect(() => {
    if (!_isEmpty(dataFetch)) {
      ;(dataFetch?.data || []).map(row => {
        row.dtEmissao = new Date(row.dtEmissao)
        row.dtVencimento = new Date(row.dtVencimento)

        if (row.dtBaixa) row.dtBaixa = new Date(row.dtBaixa)
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
        <Button
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
        </Button>
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

      <ContextMenu id={ContextMenuEnum.menuContasReceber} items={items} />

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

export default TableContasReceber
