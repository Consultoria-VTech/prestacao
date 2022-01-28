import { useMemo } from 'react'
import { Column } from 'react-table'
import { Cliente } from '../../../../types/models/cliente'
import {
  formatCep,
  formatCpfCnpj,
  formatTelephone,
  leftPad,
} from '../../../../util/stringUtil'

export const columns = (): Column<Cliente>[] =>
  useMemo<Column<Cliente>[]>(
    () => [
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
        id: 'id',
      },
      {
        Header: 'Nome',
        accessor: 'nome',
      },
      {
        Header: 'CNPJ',
        accessor: data => formatCpfCnpj(data.cnpj),
        id: 'cnpj',
      },
      {
        Header: 'Ativo',
        accessor: data => (data.ativo === true ? 'Ativo' : 'Inativo'),
        id: 'ativo',
      },
      {
        Header: 'E-mail',
        accessor: 'email',
      },
      {
        Header: 'Telefone',
        accessor: data => formatTelephone(data.telefone),
        id: 'telefone',
      },
      {
        Header: 'Filial',
        accessor: 'filial',
      },
      {
        Header: 'Cep',
        accessor: data => formatCep(data.cep),
        id: 'cep',
      },
      {
        Header: 'Endereço',
        accessor: 'endereco',
      },
      {
        Header: 'Número',
        accessor: 'numero',
      },
      {
        Header: 'Bairro',
        accessor: 'bairro',
      },
      {
        Header: 'Complemento',
        accessor: 'complemento',
      },
      {
        Header: 'Cidade',
        accessor: 'cidade',
      },
      {
        Header: 'Estado',
        accessor: 'estado',
      },
    ],
    []
  )
