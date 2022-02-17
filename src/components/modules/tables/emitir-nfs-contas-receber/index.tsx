import { format } from 'date-fns'
import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaRegFilePdf } from 'react-icons/fa'
import { RiFileExcel2Line, RiFilter2Fill } from 'react-icons/ri'
import { usePagination, useSortBy, useTable } from 'react-table'
import { useFetch } from '../../../../hooks/useFetch'
import { mutate as globalMutate } from 'swr'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { managerModal, useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { InitialData } from '../../../../types/initialData'
import {
  ContasReceber,
  ContasReceberFiltro,
  ContasReceberFiltroAlternativo,
  ContasReceberPagination,
} from '../../../../types/models/contasReceber'
import { isExpandModalFilter, TOAST_CONTAINER } from '../../../../util/constants'
import { objectToQueryUrl } from '../../../../util/objectToQueryUrl'
import { removeKeyValuesNullObject } from '../../../../util/removeKeyValuesNullObject'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TablePagination from '../../../elements/table-pagination'
import { FiltroData } from '../../../templates/consultas'
import { columns } from './columns'
import ContextMenuEmitirNFSContasReceber from './context-menu'
import ContextMenu from '../../../elements/context-menu'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'

type QueryPage = {
  page?: string
  size?: string
  contasReceberFiltros?: ContasReceberFiltro
}
export interface dataFilterEmitirNfs {
  pagination: any
  data: any
}

type TableEmitirNFSContasReceberProps = InitialData<ContasReceberPagination> & {
  onChangeValorTotal?: (valorTotal: number) => void
  onChangeFiltroTipo?: (tipo: FiltroData) => void
  dtVenInicial?: Date
  dtVenFinal?: Date
  isEmAtraso?: boolean
}
const TableEmitirNFSContasReceber: React.FC<TableEmitirNFSContasReceberProps> = ({
  data: initialData,
  onChangeValorTotal,
  dtVenInicial,
  dtVenFinal,
  isEmAtraso,
}) => {
  // const idModal = ModalEnum.createContasReceber
  const idModalFilter = ModalEnum.filterContasReceber
  const [dataFilterEmitirNfs, setDataFilterEmitirNfs] = useState<dataFilterEmitirNfs>()

  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } =
    useModal<ContasReceberFiltro>(idModalFilter)

  const router = useRouter()

  const pageCurrent = router.query.pageCr ? Number(router.query.pageCr) - 1 : 0
  const pageSizeUrl = router.query.sizeCr ? Number(router.query.sizeCr) : 16

  const idEmpresa = Number(router.query.idEmpresaCr) || null
  const idPlanoContas = Number(router.query.idPlanoContasCr) || null
  const idCliente = Number(router.query.idClienteCr) || null
  const idContrato = Number(router.query.idContratoCr) || null
  const emAtraso =
    (router.query.emAtrasoCr as string)?.toLowerCase() === 'true' || null

  const status = (router.query.statusCr as string) || null
  const nDoc = (router.query.nDocCr as string) || null
  const tipoDoc = (router.query.tipoDocCr as string) || null
  const dtVencimentoInicial =
    ((router.query.dtVencimentoInicialCr as string) &&
      new Date(
        new Date(router.query.dtVencimentoInicialCr as string).toISOString()
      )) ||
    null
  const dtVencimentoFinal =
    ((router.query.dtVencimentoFinalCr as string) &&
      new Date(
        new Date(router.query.dtVencimentoFinalCr as string).toISOString()
      )) ||
    new Date()

  const [filtros, setFiltros] = useState<ContasReceberFiltro>({
    idEmpresa,
    idPlanoContas,
    idCliente,
    idContrato,
    status,
    dtVencimentoInicial,
    dtVencimentoFinal,
    tipoDoc,
    nDoc,
    emAtraso,
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

  // const params = objectToQueryUrl(filtros, (key, val) => {
  //   if (
  //     key === 'dtEmissaoInicial' ||
  //     key === 'dtEmissaoFinal' ||
  //     key === 'dtVencimentoInicial' ||
  //     key === 'dtVencimentoFinal'
  //   ) {
  //     return `${key}=${format(val as Date, 'yyyy-MM-dd')}`
  //   }
  // })
  let {
    data: dataFetch,
    error,
    mutate,
    isValidating,
  } = useFetch<ContasReceberPagination>(
    `/api/contasreceber?page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { data: today } = useFetch(`/api/receberhoje`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: sevenDays } = useFetch(`/api/setediasreceber`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: FifteenDays } = useFetch(`/api/quinzediasreceber`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: ThirtyDays } = useFetch(`/api/trintadiasreceber`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })
  const { data: overdue } = useFetch(`/api/recebergeral`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })

  useEffect(() => {
    
  })


  useEffect(() => {
    onChangeValorTotal && onChangeValorTotal(dataFetch?.dataExtra?.total || 0)
  }, [dataFetch])

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

  const { displayMenu, items } = ContextMenuEmitirNFSContasReceber<ContasReceber>({
    onItemClick: deleteBanco,
  })

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
    idModalFilter,
    'contas_receber_consulta_filtro_id'
  )

  function onChangeDateButtons(date) {
    switch (date) {
      case 'Hoje':
        setDataFilterEmitirNfs(today)
        break
      case '7 dias':
        setDataFilterEmitirNfs(sevenDays)
        break
      case '15 dias':
        setDataFilterEmitirNfs(FifteenDays)
        break
      case '30 dias':
        setDataFilterEmitirNfs(ThirtyDays)
        break
      case 'Em atraso':
        setDataFilterEmitirNfs(overdue)
        break
      case 'Total':
        setDataFilterEmitirNfs(dataFetch)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (!_isEmpty(dataFetch)) {
      var pagination = dataFetch?.pagination
      let dataFetchFiltered = (dataFetch?.data || [])
        .filter(row => {
          if (row.emitido == 'SIM') {
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
    if (!_isEmpty(dataFilterEmitirNfs)) {
      var pagination = dataFilterEmitirNfs?.pagination
      let dataFetchFiltered = (dataFilterEmitirNfs?.data || [])
        .filter(row => {
          if (row.emitida == 'SIM') {
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
  }, [dataFilterEmitirNfs])

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

  const updateRouter = ({ page, size, contasReceberFiltros }: QueryPage) => {
    const query = router.query
    const pageCr = page ?? (query.page as string)
    const sizeCr = size ?? ((query.size as string) || String(pageSize) || '16')

    const filtrosTemp = contasReceberFiltros || filtros
    const dtEmissaoInicialCr =
      filtrosTemp.dtEmissaoInicial &&
      format(filtrosTemp.dtEmissaoInicial as Date, 'yyyy-MM-dd')
    const dtEmissaoFinalCr =
      filtrosTemp.dtEmissaoFinal &&
      format(filtrosTemp.dtEmissaoFinal as Date, 'yyyy-MM-dd')
    const dtVencimentoInicialCr =
      filtrosTemp.dtVencimentoInicial &&
      format(filtrosTemp.dtVencimentoInicial as Date, 'yyyy-MM-dd')
    const dtVencimentoFinalCr =
      filtrosTemp.dtVencimentoFinal &&
      format(filtrosTemp.dtVencimentoFinal as Date, 'yyyy-MM-dd')

    const newObject: ContasReceberFiltroAlternativo = {}
    newObject.idClienteCr = filtrosTemp.idCliente
    newObject.idPlanoContasCr = filtrosTemp.idPlanoContas
    newObject.idContratoCr = filtrosTemp.idContrato
    newObject.statusCr = filtrosTemp.status
    newObject.dtEmissaoInicialCr = filtrosTemp.dtEmissaoInicial
    newObject.dtEmissaoFinalCr = filtrosTemp.dtEmissaoFinal
    newObject.dtVencimentoInicialCr = filtrosTemp.dtVencimentoInicial
    newObject.dtVencimentoFinalCr = filtrosTemp.dtVencimentoFinal
    newObject.tipoDocCr = filtrosTemp.tipoDoc
    newObject.nDocCr = filtrosTemp.nDoc
    newObject.emAtrasoCr = filtrosTemp.emAtraso

    let params = removeKeyValuesNullObject(newObject)
    params = {
      ...params,
      dtEmissaoInicialCr,
      dtEmissaoFinalCr,
      dtVencimentoInicialCr,
      dtVencimentoFinalCr,
    }
    params = removeKeyValuesNullObject(params)
    // const filtrosContasPagar: ContasPagarFiltro = {}
    // filtrosContasPagar.idEmpresa = query.idEmpresa && Number(query.idEmpresa)
    // filtrosContasPagar.idNatureza = query.idNatureza && Number(query.idNatureza)
    // filtrosContasPagar.idFornecedor =
    //   query.idFornecedor && Number(query.idFornecedor)
    // filtrosContasPagar.idStatus = query.idStatus && Number(query.idStatus)
    // filtrosContasPagar.dtEmissaoInicial =
    //   query.dtEmissaoInicial && new Date(query.dtEmissaoInicial.toString())
    // filtrosContasPagar.dtEmissaoFinal =
    //   query.dtEmissaoFinal && new Date(query.dtEmissaoFinal.toString())
    // filtrosContasPagar.dtVencimentoInicial =
    //   query.dtVencimentoInicial &&
    //   new Date(query.dtVencimentoInicial.toString())
    // filtrosContasPagar.dtVencimentoFinal =
    //   query.dtVencimentoFinal && new Date(query.dtVencimentoFinal.toString())
    // filtrosContasPagar.tipoDoc = query.tipoDoc && String(query.tipoDoc)
    // filtrosContasPagar.nDoc = query.nDoc && String(query.nDoc)
    // filtrosContasPagar.emAtraso = query.emAtraso && query.emAtraso === 'true'

    // Object.entries(filtrosContasPagar).forEach(([key]) => {
    //   if (key.endsWith('Cr')) {
    //     filtrosContasPagar[key] = null
    //   }
    // })
    // const paramsContasPagar = removeKeyValuesNullObject(filtrosContasPagar)
    // console.log({...params, paramsContasPagar})

    const filtrosContasPagar = query
    Object.entries(filtrosContasPagar).forEach(([key]) => {
      if (Object.entries(newObject).find(([k]) => k === key)) {
        filtrosContasPagar[key] = null
      }
    })

    const filtrosContasPagar2 = removeKeyValuesNullObject(filtrosContasPagar)
    router.push({
      query: { ...params, ...filtrosContasPagar2, pageCr, sizeCr },
    })
  }

  useEffect(() => {
    if (!dtVenInicial || !dtVenFinal || isValidating) return

    const novosFiltros = {
      ...filtros,
      dtVencimentoInicial: dtVenInicial,
      dtVencimentoFinal: dtVenFinal,
      emAtraso: isEmAtraso,
    }
    updateRouter({ contasReceberFiltros: novosFiltros })
    setFiltros(novosFiltros)
  }, [dtVenInicial, dtVenFinal, isEmAtraso])

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
      <div className="py-3 px-3 d-flex">
        <div className="flex-fill">
          <Button className="btn btn-sm btn-light m-0">
            <RiFileExcel2Line style={{ width: '1.25rem', height: '1.25rem' }} />
          </Button>
          {/* <span className="px-1">|</span> */}
          <Button className="btn btn-sm btn-light ">
            <FaRegFilePdf style={{ width: '1.25rem', height: '1.25rem' }} />
          </Button>
          Contas a Receber
        </div>

        <div className="text-end align-self-end col-sm-6 align-items-center">
          {/* <Button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() =>
              openModal(ModalEnum.filterContasReceber, filtros, {
                action: 'filter',
                showButtonExpand: isExpandModalFilter,
              })
            }>
            <RiFilter2Fill />
            Filtrar
          </Button> */}
          <div className="container-fluid p-0">
            <div className="row">
              <div className=" col-md-12 pb-3">
                <Button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => onChangeDateButtons('Hoje')}>
                  Hoje
                </Button>
                <Button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => onChangeDateButtons('7 dias')}>
                  7 dias
                </Button>
                <Button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => onChangeDateButtons('15 dias')}>
                  15 Dias
                </Button>
                <Button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => onChangeDateButtons('30 dias')}>
                  30 Dias
                </Button>
                <Button
                  type="button"
                  className="btn btn-sm btn-warning"
                  onClick={() => onChangeDateButtons('Em atraso')}>
                  Em atraso
                </Button>
                <Button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => onChangeDateButtons('Total')}>
                  Total
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <ContextMenu id={ContextMenuEnum.menuEmitirNFSContasReceber} items={items} />

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

export default TableEmitirNFSContasReceber
