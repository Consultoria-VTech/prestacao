import { Projeto, ProjetoSituacaoEnum } from '@types'
import { DateFormatEnum, formatDate, formatMoney, leftPad } from '@utils'
import { useMemo } from 'react'
import { Column } from 'react-table'

export const columns = (): Column<Projeto>[] =>
  useMemo<Column<Projeto>[]>(
    () => [
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
        id: 'id',
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
      {
        Header: 'Contrato',
        accessor: data => leftPad(data?.contrato?.id, 6),  
        id: 'idContrato',
      },
      {
        Header: 'Nome Cliente',
        accessor: data => data?.contrato?.cliente?.nome, 
      },
      {
        Header: 'Data Inicio',
        accessor: data =>
          formatDate(data.dtInicio, DateFormatEnum.OnlyDatePtBRFormat),
      },
      {
        Header: 'Data Finalização',
        accessor: data =>
          formatDate(data.dtFinalizacao, DateFormatEnum.OnlyDatePtBRFormat),
      },
      {
        Header: 'Limite Km',
        accessor: data => formatMoney(data.limiteKm as number),
      },
      {
        Header: 'Limite almoço',
        accessor: data => formatMoney(data.limiteAlmoco as number),
      },
      {
        Header: 'Situação',
        accessor: data => ProjetoSituacaoEnum[data.situacao],
      },
    ],
    []
  )