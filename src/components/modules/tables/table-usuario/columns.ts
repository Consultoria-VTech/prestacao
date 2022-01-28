import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { useMemo } from 'react'
import { Column } from 'react-table'
import { Usuario } from '../../../../types/models/usuario'

export const columns = (): Column<Usuario>[] =>
  useMemo<Column<Usuario>[]>(
    () => [
      {
        Header: 'Nome',
        accessor: 'nome',
      },
      {
        Header: 'Sobrenome',
        accessor: 'sobrenome',
      },
      {
        Header: 'Usuário',
        accessor: 'nomeUsuario',
      },
      {
        Header: 'Tipo',
        accessor: data => data?.usuarioTipo?.descricaoUsuarioTipo,
      },
      {
        Header: 'Ativo',
        accessor: data => (data.ativo === true ? 'Ativo' : 'Inativo'),
        id: 'ativo',
      },
      {
        Header: 'Data Cadastro',
        accessor: data =>
          format(data.dataCadastro as Date, 'dd/MM/yyyy', { locale: pt }),
      },
    ],
    []
  )