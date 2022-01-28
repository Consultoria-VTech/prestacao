import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { useMemo } from 'react'
import { Column } from 'react-table'
import { Bi } from '../../../../types/models/bi'

export const columns = (): Column<Bi>[] =>
  useMemo<Column<Bi>[]>(
    () => [
      {
        Header: 'Link',
        accessor: data => data.link,
        id: 'link',
      },
      {
        Header: 'Descrição',
        accessor: data => data.descricao,
        id: 'descricao',
      },      {
        Header: 'Aplicação',
        accessor: data => data.aplicacao,
        id: 'aplicacao',
      },
      {
        Header: 'Data de Cadastro',
        accessor:  data =>
        format(data.datacadastro as Date, 'dd/MM/yyyy', { locale: pt }),
        id: 'datacadastro',
      },
      {
        Header: 'Ativo',
        accessor: data => (data.ativo === true ? 'Ativo' : 'Inativo'),
        id: 'ativo',
      },
    ],
    []
  )