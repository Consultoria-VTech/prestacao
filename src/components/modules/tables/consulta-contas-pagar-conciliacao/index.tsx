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
  ContasPagar,
  ContasPagarFiltro,
  ContasPagarPagination,
} from '../../../../types/models/contasPagar'
import ContextMenu from '../../../elements/context-menu'
import { ContasReceberFiltroAlternativo } from '../../../../types/models/contasReceber'
import { isExpandModalFilter } from '../../../../util/constants'
import { objectToQueryUrl } from '../../../../util/objectToQueryUrl'
import { removeKeyValuesNullObject } from '../../../../util/removeKeyValuesNullObject'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TablePagination from '../../../elements/table-pagination'
import { columns } from './columns'
import ContextMenuEstornarContasPagar from './context-menu'

type QueryPage = {
  page?: string
  size?: string
  contasPagarFiltros?: ContasPagarFiltro
}
type TableConsultaContasPagarProps = InitialData<ContasPagarPagination> & {
  onChangeValorTotal?: (valorTotal: number) => void
  dtVenInicial?: Date
  dtVenFinal?: Date
  isEmAtraso?: boolean
}
const TableConsultaContasPagar: React.FC<TableConsultaContasPagarProps> = ({
  data: initialData,
  onChangeValorTotal,
  dtVenInicial,
  dtVenFinal,
  isEmAtraso,
}) => {
  // const idModal = ModalEnum.createContasPagar
  const idModalFilter = ModalEnum.filterContasPagar

  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<ContasPagar>(idModalFilter)

  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16

  const idEmpresa = Number(router.query.idEmpresa) || null
  const idNatureza = Number(router.query.idNatureza) || null
  const idFornecedor = Number(router.query.idFornecedor) || null
  const idStatus = Number(router.query.idStatus) || null
  const nDoc = (router.query.nDoc as string) || null
  const tipoDoc = (router.query.tipoDoc as string) || null
  const emAtraso =
    (router.query.emAtrasoCr as string)?.toLowerCase() === 'true' || null

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
    new Date()
  const dtVencimentoFinal =
    ((router.query.dtVencimentoFinal as string) &&
      new Date(
        new Date(router.query.dtVencimentoFinal as string).toISOString()
      )) ||
    new Date()
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
    `/api/contaspagarbaixa?${params}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  useEffect(() => {
    onChangeValorTotal && onChangeValorTotal(dataFetch?.dataExtra?.total || 0)
  }, [dataFetch])

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (contasPagar: ContasPagar[]) => {
    mutate(data => ({ ...data, data: contasPagar }), false)
    globalMutate(`/api/contaspagarbaixa`, data => ({
      ...data,
      data: contasPagar,
    }))
  }

  const deleteBanco = React.useCallback(
    (id, contaPagar: ContasPagar) => {
      const contasPagar =
        dataFetch?.data?.filter(p => p.id !== contaPagar.id) || []
      updateRouteData(contasPagar)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuEstornarContasPagar<ContasPagar>({
    onItemClick: deleteBanco,
  })

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
    ModalEnum.estornarContasPagar,
    'contas_pagar_baixar_conta'
  )

  // EVENTO EXECUTADO APÓS A MODAL DE FILTRO SER FECHADA
  // managerModal.on<ContasPagarFiltro>(
  //   'afterClose',
  //   newValues => {
  //     if (newValues.props) {
  //       updateRouter({ contasPagarFiltros: newValues.props })
  //       setFiltros(newValues.props)
  //       updateComponent()
  //     }
  //   },
  //   idModalFilter,
  //   'contas_pagar_consulta_filtro_id'
  // )

  useEffect(() => {
    if (!_isEmpty(dataFetch)) {
      var pagination = dataFetch?.pagination
      let dataFetchFiltered =  (dataFetch?.data || []).filter(row => {
        if(row.situacao == 'CANCELADO') {
          pagination.total--
          return false
        }
        return true
      })
        .map(row => {
        row.dtEmissao = new Date(row.dtEmissao)
        row.dtVencimento = new Date(row.dtVencimento)
        
        if (row.dtBaixa) {row.dtBaixa = new Date(row.dtBaixa)}
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

  const updateRouter = ({ page, size }: QueryPage) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    // const filtrosTemp = contasPagarFiltros || filtros
    // const dtEmissaoInicial =
    //   filtrosTemp.dtEmissaoInicial &&
    //   format(filtrosTemp.dtEmissaoInicial as Date, 'yyyy-MM-dd')
    // const dtEmissaoFinal =
    //   filtrosTemp.dtEmissaoFinal &&
    //   format(filtrosTemp.dtEmissaoFinal as Date, 'yyyy-MM-dd')
    // const dtVencimentoInicial =
    //   filtrosTemp.dtVencimentoInicial &&
    //   format(filtrosTemp.dtVencimentoInicial as Date, 'yyyy-MM-dd')
    // const dtVencimentoFinal =
    //   filtrosTemp.dtVencimentoFinal &&
    //   format(filtrosTemp.dtVencimentoFinal as Date, 'yyyy-MM-dd')

    // let params = removeKeyValuesNullObject(filtrosTemp)
    // params = {
    //   ...params,
    //   dtEmissaoInicial,
    //   dtEmissaoFinal,
    //   dtVencimentoInicial,
    //   dtVencimentoFinal,
    // }
    // params = removeKeyValuesNullObject(params)

    // const filtrosContasReceber: ContasReceberFiltroAlternativo = query
    // Object.entries(filtrosTemp).forEach(([key]) => {
    //   if (Object.entries(filtrosContasReceber).find(([k]) => k === key)) {
    //     filtrosContasReceber[key] = null
    //   }
    // })

    // const paramsContasReceber = removeKeyValuesNullObject(filtrosContasReceber)
    // console.log('CP', { ...params, ...paramsContasReceber })

    // const querys = query
    // const retorno = _pickBy(query, p => arrayKey.find(q => q === p))
    // console.log(arrayKey, querys, retorno)

    router.push({ query: { page, size } })
  }

  useEffect(() => {
    if (!dtVenInicial || !dtVenFinal || isValidating) return

    const novosFiltros = {
      ...filtros,
      dtVencimentoInicial: dtVenInicial,
      dtVencimentoFinal: dtVenFinal,
      emAtraso: isEmAtraso,
    }
    updateRouter({ contasPagarFiltros: novosFiltros })
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
          Contas a Pagar
        </div>

        <div className="text-end align-self-end col-sm-6 align-items-center">
          {/* <Button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() =>
              openModal(ModalEnum.filterContasPagar, filtros, {
                action: 'filter',
                showButtonExpand: isExpandModalFilter,
              })
            }>
            <RiFilter2Fill />
            Filtrar
          </Button> */}
        </div>
      </div>
      {/* <TableHeader> */}
      {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => openModal(idModal, null, { action: 'create' })}>
          <BiPlusMedical />
          Cadastrar
        </Button> */}
      {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModal(ModalEnum.filterContasPagar, null, {
              action: 'filter',
              showButtonExpand: isExpandModalFilter,
            })
          }>
          <RiFilter2Fill />
          Filtrar
        </Button> */}
      {/* </TableHeader> */}

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

export default TableConsultaContasPagar