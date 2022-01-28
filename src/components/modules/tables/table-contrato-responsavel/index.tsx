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
import {
  ContratoResponsavel,
  ContratoResponsavelFiltro,
  ContratoResponsavelPagination,
} from '../../../../types/models/contratoResponsavel'
import { isExpandModalFilter } from '../../../../util/constants'
import { objectToQueryUrl } from '../../../../util/objectToQueryUrl'
import { removeKeyValuesNullObject } from '../../../../util/removeKeyValuesNullObject'
import { leftPad } from '../../../../util/stringUtil'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import ContextMenu from '../../../elements/context-menu'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TablePagination from '../../../elements/table-pagination'
import { columns } from './columns'
import ContextMenuContratoResponsavel from './context-menu'

type QueryPageContratoResponsaveles = {
  page?: string
  size?: string
  contratoResponsavelFiltros?: ContratoResponsavelFiltro
}

const TableContratoResponsavel: React.FC<
  InitialData<ContratoResponsavelPagination>
> = ({ data: initialData }) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<ContratoResponsavel>(
    ModalEnum.createContratoResponsavel
  )
  const { openModal: openModalFiltro } = useModal<ContratoResponsavelFiltro>(
    ModalEnum.filterContratoResponsavel
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16
  const idFuncionario = Number(router.query.idFuncionario) || null
  const admin = (router.query.admin as string) === 'true' || null
  const idContrato = Number(router.query.id) || null

  const [filtros, setFiltros] = useState<ContratoResponsavelFiltro>({
    idFuncionario,
    idContrato,
    admin,
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
  } = useTable<ContratoResponsavel>(
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
  } = useFetch<ContratoResponsavelPagination>(
    `/api/contratoresponsavel?${params}&page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (contratos: ContratoResponsavel[]) => {
    mutate(data => ({ ...data, data: contratos }), false)
    globalMutate(`/api/contratoresponsavel`, data => ({
      ...data,
      data: contratos,
    }))
  }

  const deleteContratoResponsavel = React.useCallback(
    (id, contrato: ContratoResponsavel) => {
      const contratos = dataFetch?.data?.filter(p => p.id !== contrato.id) || []
      updateRouteData(contratos)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } =
    ContextMenuContratoResponsavel<ContratoResponsavel>({
      onItemClick: deleteContratoResponsavel,
    })

  managerModal.on<ContratoResponsavel>(
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
    ModalEnum.createContratoResponsavel,
    'aaa'
  )

  managerModal.on<ContratoResponsavelFiltro>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        updateRouter({ contratoResponsavelFiltros: newValues.props })
        setFiltros(newValues.props)
        updateComponent()
      }
    },
    ModalEnum.filterContratoResponsavel,
    'contrato_responsavel_filtro_id'
  )

  useEffect(() => {
    if (dataFetch) {
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
    contratoResponsavelFiltros,
  }: QueryPageContratoResponsaveles) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const params = removeKeyValuesNullObject(
      contratoResponsavelFiltros || filtros
    )

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
      <div className="py-3 px-3 d-flex">
        <h2
          className="flex-grow-1 m-0 col-sm-6"
          style={{ fontSize: '1.125rem', color: '#6a3890', fontWeight: 500 }}>
          Contrato {leftPad(Number(router.query.id), 6)}
        </h2>
        <div className="text-end align-self-end col-sm-6">
          <Button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() =>
              openModal(ModalEnum.createContratoResponsavel, null, {
                action: 'create',
              })
            }>
            <BiPlusMedical />
            Cadastrar
          </Button>
          {/* <Button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() =>
              openModalFiltro(ModalEnum.filterContratoResponsavel, filtros, {
                action: 'filter',
                showButtonExpand: isExpandModalFilter,
              })
            }>
            <RiFilter2Fill />
            Filtrar
          </Button> */}
        </div>
      </div>
      {/* <TableHeader>
        <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModal(ModalEnum.createContratoResponsavel, null, {
              action: 'create',
            })
          }>
          <BiPlusMedical />
          Cadastrar
        </Button>
        <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModalFiltro(ModalEnum.filterContratoResponsavel, filtros, {
              action: 'filter',
              showButtonExpand: isExpandModalFilter,
            })
          }>
          <RiFilter2Fill />
          Filtrar
        </Button>
      </TableHeader> */}

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

export default TableContratoResponsavel
