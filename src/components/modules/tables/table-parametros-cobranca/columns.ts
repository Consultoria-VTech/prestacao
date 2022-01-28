import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { useMemo } from 'react'
import { Column } from 'react-table'
import { ParametrosCobranca } from '../../../../types/models/parametrosCobranca'
import { formatMoney, leftPad } from '../../../../util/stringUtil'

export const columns = (): Column<ParametrosCobranca>[] =>
  useMemo<Column<ParametrosCobranca>[]>(
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
        Header: 'Tipo',
        accessor: data => (data.tipo ? 'Receita' : 'Despeza'),
      },
      {
        Header: 'Taxa',
        accessor: data => data.taxa && formatMoney(data.taxa as number),
        id: 'taxa',
      },
      {
        Header: 'Ativo',
        accessor: data => (data.ativo === true ? 'Ativo' : 'Inativo'),
        id: 'ativo',
      },

      {
        Header: 'Data Cadastro',
        accessor: data =>
          format(data.dataCadastro, 'dd/MM/yyyy hh:mm:ss', { locale: pt }),
      },
    ],
    []
  )
