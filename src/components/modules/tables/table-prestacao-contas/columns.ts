import { getPrestacaoContasSituacao, PrestacaoContas } from '@types'
import { formatMoney, leftPad } from '@utils'
import { useMemo } from 'react'
import { Column } from 'react-table'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'

export const columns = (): Column<PrestacaoContas>[] =>
  useMemo<Column<PrestacaoContas>[]>(
    () => [
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
        id: 'id',
      },
      {
        Header: 'Projeto',
        accessor: data => data?.projeto?.descricao,
        id: 'projeto',
      },
      {
        Header: 'Funcionário',
        accessor: data => data.funcionario.nome,
        id: 'funcionario',
      },
      {
        Header: 'Data Emissão',
        accessor: data =>
        format(data.dtEmissao as Date, 'dd/MM/yyyy', {
          locale: pt,
        }),
      },
      {
        Header: 'Valor Total',
        accessor: data => data.valorCotacao && formatMoney(data.valorCotacao as number) || 0,
        id: 'valorCotacao',
      },
      {
        Header: 'Situação',
        accessor: data => getPrestacaoContasSituacao(data.situacao),
      },
    ],
    []
  )