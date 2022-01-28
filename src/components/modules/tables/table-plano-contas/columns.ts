import { useMemo } from 'react'
import { Column } from 'react-table'
import { PlanoContas } from '../../../../types/models/planoContas'
import { leftSpace } from '../../../../util/stringUtil'

export const columns = (): Column<PlanoContas>[] =>
  useMemo<Column<PlanoContas>[]>(
    () => [
      {
        Header: 'Hierarquia',
        accessor: data => data.hierarquia || data.hierarquia,
        id: 'hierarquia',
        style: {
          width: 200,
        },
      },
      {
        Header: 'Nível',
        accessor: data => data.nivel,
        id: 'nivel',

        style: {
          width: 200,
          display: 'none',
        },
      },
      {
        Header: 'Descrição',
        accessor: data =>
          leftSpace(data.descricao, data.nivel >= 2 ? data.nivel * 2 : 0),
        id: 'descricao',
      },
      {
        Header: 'Número Contabil',
        accessor: data =>  data.nconta,
        id: 'nconta',
      },
      {
        Header: 'Receita/Despesa',
        accessor: data => (data.receitaOuDespesa ? 'Receita' : 'Despesa'),
        // style: {
        //   width: 200,
        // },
      },
      {
        Header: 'Ativo',
        accessor: data => (data.ativo === true ? 'Ativo' : 'Inativo'),
        style: {
          maxWidth: 100,
        },
      },
      {
        Header: 'Observação',
        accessor: 'observacao',
      },
    ],
    []
  )
