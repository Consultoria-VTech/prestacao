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
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { managerModal, useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { InitialData } from '../../../../types/initialData'
import {
  ContaBancaria,
  ContaBancariaFiltro,
  ContaBancariaPagination,
} from '../../../../types/models/contaBancaria'
import {
  isExpandModalFilter,
  TOAST_CONTAINER,
} from '../../../../util/constants'
import { objectToQueryUrl } from '../../../../util/objectToQueryUrl'
import { removeKeyValuesNullObject } from '../../../../util/removeKeyValuesNullObject'
import { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import ContextMenu from '../../../elements/context-menu'
import TableContent from '../../../elements/table-content/index'
import TableFooter from '../../../elements/table-footer/index'
import TableHeader from '../../../elements/table-header/index'
import TablePagination from '../../../elements/table-pagination'
import { columns } from './columns'
import ContextMenuBanco from './context-menu'

type QueryPage = {
  page?: string
  size?: string
  contaBancariaFiltro?: ContaBancariaFiltro
}

const TableContaBancaria: React.FC<InitialData<ContaBancariaPagination>> = ({
  data: initialData,
}) => {
  const idModal = ModalEnum.createContaBancaria

  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { openModal, updateComponent } = useModal<ContaBancaria>(idModal)
  const { openModal: openModalFiltro } = useModal<ContaBancariaFiltro>(
    ModalEnum.filterContaBancaria
  )
  const router = useRouter()

  const pageCurrent = router.query.page ? Number(router.query.page) - 1 : 0
  const pageSizeUrl = router.query.size ? Number(router.query.size) : 16

  const idEmpresa = Number(router.query.idEmpresa) || null
  const id = Number(router.query.id) || null
  const agencia = Number(router.query.agencia) || null
  const agenciaDv = Number(router.query.agenciaDv) || null
  const conta = Number(router.query.conta) || null
  const contaDv = Number(router.query.contaDv) || null
  const idBanco = Number(router.query.idBanco) || null
  const tipo = (router.query.tipo as string) || null
  const ativo = (router.query.ativo as string)?.toLowerCase() === 'true' || null

  const [filtros, setFiltros] = useState<ContaBancariaFiltro>({
    idEmpresa,
    id,
    agencia,
    agenciaDv,
    conta,
    contaDv,
    idBanco,
    ativo,
    tipo,
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
  } = useTable<ContaBancaria>(
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
  } = useFetch<ContaBancariaPagination>(
    `/api/contasbancarias?${params}&page=${pageIndex + 1}&size=${pageSize}`,
    {
      initialData,
      revalidateOnReconnect: true,
    }
  )

  const { immutableValue: errorPrev, updateValue } = useImmutableValue(error)

  const updateRouteData = (contasBancarias: ContaBancaria[]) => {
    mutate(data => ({ ...data, data: contasBancarias }), false)
    globalMutate(`/api/contasbancarias`, data => ({
      ...data,
      data: contasBancarias,
    }))
  }

  const deleteBanco = React.useCallback(
    (id, contaBancaria: ContaBancaria) => {
      const contasBancarias =
        dataFetch?.data?.filter(p => p.id !== contaBancaria.id) || []
      updateRouteData(contasBancarias)
    },
    [dataFetch]
  )

  const { idContextMenu, displayMenu, items } = ContextMenuBanco<ContaBancaria>(
    {
      onItemClick: deleteBanco,
    }
  )

  managerModal.on<ContaBancaria>(
    'afterClose',
    newValues => {
      if (newValues.props && dataFetch) {
        const contaBancaria = dataFetch?.data?.find(
          p => p.id === newValues.props.id
        )
        const tempData = dataFetch?.data || []
        let contasBancarias = []

        if (!contaBancaria) {
          contasBancarias = [...tempData, newValues.props]
          contasBancarias = _orderBy(contasBancarias, ['id'], ['desc'])
        } else {
          contasBancarias = tempData.map(contaBancaria => {
            if (contaBancaria.id === newValues.props.id) {
              return newValues.props
            }
            return contaBancaria
          })
        }

        updateRouteData(contasBancarias)
        updateComponent()
      }
    },
    idModal,
    'conta_bancaria_id'
  )

  managerModal.on<ContaBancariaFiltro>(
    'afterClose',
    newValues => {
      if (newValues.props) {
        updateRouter({ contaBancariaFiltro: newValues.props })
        setFiltros(newValues.props)
        updateComponent()
      }
    },
    ModalEnum.filterContaBancaria,
    'conta_bancaria_filtro_id'
  )

  useEffect(() => {
    if (!_isEmpty(dataFetch)) {
      setData(dataFetch?.data || [])
      console.log('antes -> ', dataFetch)
      if (dataFetch?.pagination) {
        setPageCount(dataFetch.pagination?.pageCount)
        setTotalItems(dataFetch.pagination?.total)
      }
    }
  }, [dataFetch])

  useEffect(() => {
    if (error && !_isEqual(error, errorPrev)) {
      alertError(error, TOAST_CONTAINER.app)
      updateValue(error)
      setData([])
      setPageCount(0)
      setTotalItems(0)
      setPageSize(0)
    }
  }, [error])

  const updateRouter = ({ page, size, contaBancariaFiltro }: QueryPage) => {
    const query = router.query
    page = page ?? (query.page as string)
    size = size ?? ((query.size as string) || String(pageSize) || '16')

    const params = removeKeyValuesNullObject(contaBancariaFiltro || filtros)

    router.push({ query: { ...params, page, size } })
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
          onClick={() => openModal(idModal, null, { action: 'create' })}>
          <BiPlusMedical />
          Cadastrar
        </Button>
        {/* <Button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() =>
            openModalFiltro(ModalEnum.filterContaBancaria, filtros, {
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

export default TableContaBancaria
