import {
    getPrestacaoContasSituacao,
    PrestacaoContas,
    PrestacaoContasSituacaoEnum,
    PrestacaoDespesa,
    PrestacaoDespesaFiltro,
    PrestacaoDespesaPagination,
    PrestacaoDespesaStatus,
  } from '@types'
  import _isEmpty from 'lodash/isEmpty';
  import { leftPad, TOAST_CONTAINER } from '@utils'
  import _isEqual from 'lodash/isEqual'
  import _orderBy from 'lodash/orderBy'
  import { useRouter } from 'next/router'
  import React, { useCallback, useEffect, useState } from 'react'
  import { BiPlusMedical } from 'react-icons/bi'
  import { usePagination, useSortBy, useTable } from 'react-table'
  import { mutate as globalMutate } from 'swr'
  import { ErrorData } from '~/services/api/api'
  import { alterarSituacao } from '~/services/prestacaoContasService'
  import { useFetch } from '../../../../hooks/useFetch'
  import { useImmutableValue } from '../../../../hooks/useImmutableValue'
  import { managerModal, useModal } from '../../../../hooks/useModal'
  import { ModalEnum } from '../../../../types/enum/modalEnum'
  import { InitialData } from '../../../../types/initialData'
  import { objectToQueryUrl } from '../../../../util/objectToQueryUrl'
  import { removeKeyValuesNullObject } from '../../../../util/removeKeyValuesNullObject'
  import { alertError, alertUpdateSuccess } from '../../../elements/alert'
  import Button from '../../../elements/button/index'
  import ContextMenu from '../../../elements/context-menu'
  import TableContent from '../../../elements/table-content/index'
  import TableFooter from '../../../elements/table-footer/index'
  import TablePagination from '../../../elements/table-pagination'
  import { columns } from './columns'
  import ContextMenuPrestacaoDespesa from './context-menu'
  import moment from 'moment'
import Link from 'next/link'

  type QueryPagePrestacaoDespesaes = {
    page?: string
    size?: string
    prestacaoDespesaFiltros?: PrestacaoDespesaFiltro
  }
  
  type TablePrestacaoDespesaProps = InitialData<PrestacaoDespesaPagination> & {}
  
  export const TablePrestacaoDespesa = ({
    data: initialData,
  }: TablePrestacaoDespesaProps) => {
    const [data, setData] = useState([])
    const [situacao, setSituacao] = useState([])
    const [statusData, setStatusData] = useState(false)
    const [statusSituacao, setStatusSituacao] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const { openModal, updateComponent } = useModal<PrestacaoDespesa>(
      ModalEnum.createPrestacaoDespesa
    )
    const { openModal: openModalFiltro } = useModal<PrestacaoDespesaFiltro>(
      ModalEnum.filterPrestacaoDespesa
    )
    const router = useRouter()
  
    const [prestacaoDespesaSelecionado, setPrestacaoDespesaSelecionado] =
      useState<PrestacaoDespesa>(null)
  
    const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
    const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
    const idempresa = Number(router.query.idEmpresa) || null
    const id = Number(router.query.id) || null
    const idCliente = Number(router.query.idCliente) || null
    const idCentroCusto = Number(router.query.idCentroCusto) || null
    const status = (router.query.status as string) || null
  
    const [filtros, setFiltros] = useState<PrestacaoDespesaFiltro>({
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
    } = useTable<PrestacaoDespesa>(
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
    } = useFetch<PrestacaoDespesaPagination>(
      `/api/despesasporprestacao/${id}`,
      {
        initialData,
        revalidateOnReconnect: true,
      }
    )

    const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)
  
    const updateRouteData = (prestacaoDespesa: PrestacaoDespesa[]) => {
      mutate(data => ({ ...data, data: prestacaoDespesa }), false)
      globalMutate(`/api/prestacaodespesas`, data => ({
        ...data,
        data: prestacaoDespesa,
      }))
    }
  
    const deletePrestacaoDespesa = React.useCallback(
      (id, prestacaoDespesa: PrestacaoDespesa) => {
        const prestacao =
          dataFetch?.data?.filter(p => p.id !== prestacaoDespesa.id) || []
        updateRouteData(prestacao)
      },
      [dataFetch]
    )
  
    const { idContextMenu, displayMenu, items } =
      ContextMenuPrestacaoDespesa<PrestacaoDespesa>({
        onItemClick: deletePrestacaoDespesa,
        tipo:
          situacao.length > 0 &&
          situacao[0].prestacaoContas?.situacao,
      })
  
    managerModal.on<PrestacaoDespesa>(
      'afterClose',
      newValues => {
        if (newValues.props && dataFetch) {
          const prestacaoConta = dataFetch?.data?.find(
            p => p.id === newValues.props.id
          )
          const tempData = dataFetch?.data || []
          let prestacaoDespesa = []
          if (!prestacaoConta) {
            prestacaoDespesa = [...tempData, newValues.props]
            prestacaoDespesa = _orderBy(prestacaoDespesa, ['id'], ['desc'])
          } else {
            prestacaoDespesa = tempData.map(user => {
              if (user.id === newValues.props.id) {
                return newValues.props
              }
              return user
            })
          }
  
          updateRouteData(prestacaoDespesa)
          updateComponent()
        }
      },
      ModalEnum.createPrestacaoDespesa,
      'aaa'
    )
  
    managerModal.on<PrestacaoDespesaFiltro>(
      'afterClose',
      newValues => {
        if (newValues.props) {
          updateRouter({ prestacaoDespesaFiltros: newValues.props })
          setFiltros(newValues.props)
          updateComponent()
        }
      },
      ModalEnum.filterPrestacaoDespesa,
      'prestacaoDespesa_filtro_id'
    )
  
    useEffect(() => {
      if (dataFetch) {
        if (dataFetch.data) {
          (dataFetch.data || []).map(row => {
          const dateDespesa = row.dtDespesa as Date;
            row.dtDespesa = new Date(dateDespesa.toString().replace(/-/g, '\/'));
            return row
          })
        setData(dataFetch.data || [])
        setSituacao(dataFetch.data || [])
        setPageCount(dataFetch.pagination?.pageCount)
        setTotalItems(dataFetch.pagination?.total) 
        Aprovadoounao();
        Situacaostatus();  
        }
      }
    }, [dataFetch])

    function Aprovadoounao(){
        dataFetch.data.filter((item, indice) => {
          if (item.prestacaoContas?.id === id){
            if(item.status === PrestacaoDespesaStatus.Reprovado){
              return setStatusData(true)
            }
          }
        })
      }

    
    function Situacaostatus(){
        dataFetch.data.filter((item, indice) => {
          if (item.prestacaoContas?.id === id){
            if(item.prestacaoContas.situacao != PrestacaoContasSituacaoEnum.Aberto){
              return setStatusSituacao(true)
            }
          }
        })
      }  

  
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
      prestacaoDespesaFiltros,
    }: QueryPagePrestacaoDespesaes) => {
      const query = router.query
      page = page ?? (query.page as string)
      size = size ?? ((query.size as string) || String(pageSize) || '16')
  
      const params = removeKeyValuesNullObject(prestacaoDespesaFiltros || filtros)
  
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
    const [prestacao, setPrestacao] = useState<PrestacaoContas>(null)
    const alterarSituacaoPrestacao = useCallback(
      async (novaSituacao: number) => {
        const resultEnvio = confirm('Realmente alterar a situação da prestação?')
  
        if (resultEnvio === true) {
          await alterarSituacao(Number(router.query?.id), novaSituacao)
            .then(data => {
              alertUpdateSuccess(
                TOAST_CONTAINER.app,
                'Registro atualizado com sucesso!'
              )
              setPrestacao(data as PrestacaoContas)
            })
            .catch((e: ErrorData) => alertError(e))
        }
      },
      [router.query?.id]
    )
    const situacaoPrestacao = 
    situacao.length > 0 && !prestacao
        ? getPrestacaoContasSituacao(
            situacao[0]?.prestacaoContas?.situacao
          )
        : getPrestacaoContasSituacao(prestacao?.situacao)
    return (
      <>
        <div className="py-3 px-3 d-flex">
          <h2
            className="flex-grow-1 m-0 col-sm-6"
            style={{ fontSize: '1.125rem', color: '#6a3890', fontWeight: 500 }}>
            Prestação de Contas {leftPad(Number(router.query.id), 6)}
            {situacaoPrestacao && (
              <>
                {' '}
                - Situação: <b>{situacaoPrestacao}</b>
              </>
            )}
          </h2>
          <div className="text-end align-self-end col-sm-6">
            {situacao?.length > 0 &&
              situacao[0]?.prestacaoContas?.situacao ===
                PrestacaoContasSituacaoEnum.Aberto}
            {situacao?.length > 0 &&
              situacao[0]?.prestacaoContas?.situacao ===
                PrestacaoContasSituacaoEnum.AprovacaoAdministrador &&
                (
                <>
                  <Button
                    type="button"
                    className="btn btn-sm btn-primary"
                    disabled={statusData}
                    onClick={() =>
                      alterarSituacaoPrestacao(
                        PrestacaoContasSituacaoEnum.Aprovado
                      )
                    }>
                    Aprovar
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      alterarSituacaoPrestacao(
                        PrestacaoContasSituacaoEnum.Reprovado
                      )
                    }>
                    Reprovar
                  </Button>
                </>
              )}
              <Link
              href={`/gestao/cadastros/prestacaocontas/minhasprestacoes`}>
                <a
                  className="btn btn-sm btn-primary"> Voltar
                </a>
              </Link>

              <Button
                  type="button"
                  className="btn btn-sm btn-primary"
                  disabled={statusSituacao}
                  onClick={() =>
                    openModal(
                      ModalEnum.createPrestacaoDespesa,
                      {
                        prestacaoContas: { id: Number(router.query?.id) },
                        status: PrestacaoDespesaStatus.Aberta,
                      },
                      {
                        action: 'create',
                      }
                    )
                  }>
                  <BiPlusMedical />
                  Cadastrar
                </Button>
            {/* <Button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() =>
                openModalFiltro(ModalEnum.filterPrestacaoDespesa, filtros, {
                  action: 'filter',
                  showButtonExpand: isExpandModalFilter,
                })
              }>
              <RiFilter2Fill />
              Filtrar
            </Button> */}
          </div>
        </div>
  
        <TableContent>
          <TablePagination
            onMenuContext={(e, row) => displayMenu({ e, data: row })}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            prepareRow={prepareRow}
            page={page}
            onRowClick={(_, row) => {
              setPrestacaoDespesaSelecionado(row.original)
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