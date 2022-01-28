import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { useMemo } from 'react'
import { Column } from 'react-table'
import { Funcionario } from '../../../../types/models/funcionario'
import {
  formatCep,
  formatCpfCnpj,
  formatDecimal,
  formatTelephone,
  leftPad,
} from '../../../../util/stringUtil'

export const columns = (): Column<Funcionario>[] =>
  useMemo<Column<Funcionario>[]>(
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
        Header: 'Cargo',
        accessor: 'cargo',
      },
      {
        Header: 'CPF',
        accessor: data => formatCpfCnpj(data.cpf),
        id: 'cpf',
      },
      {
        Header: 'Ativo',
        accessor: data => (data.ativo === true ? 'Ativo' : 'Inativo'),
        id: 'ativo',
      },
      {
        Header: 'Data Admissão',
        accessor: data =>
          format(data.dtAdmissao as Date, 'dd/MM/yyyy', { locale: pt }),
      },
      {
        Header: 'Data Demissão',
        accessor: data =>
          data.dtDemissao &&
          format(data.dtDemissao as Date, 'dd/MM/yyyy', { locale: pt }),
      },
      // {
      //   Header: 'Fator',
      //   accessor: data =>
      //     data.fator && formatDecimal(data.fator as number) + '%',
      // },
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
