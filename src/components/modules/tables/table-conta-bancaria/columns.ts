import { useMemo } from 'react'
import { Column } from 'react-table'
import { ContaBancaria } from '../../../../types/models/contaBancaria'
import { formatMoney, leftPad } from '../../../../util/stringUtil'

export const columns = (): Column<ContaBancaria>[] =>
  useMemo<Column<ContaBancaria>[]>(
    () => [
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
        id: 'id',
        style: {
          width: 100,
        },
      },
      {
        Header: 'Banco',
        accessor: data => `${data.banco.bankId} - ${data.banco.name}`,
      },
      {
        Header: 'Agência',
        accessor: data =>
          data.agenciaDv ? `${data.agencia}-${data.agenciaDv}` : data.agencia,
      },
      {
        Header: 'Conta',
        accessor: data => `${data.conta}-${data.contaDv}`,
      },
      {
        Header: 'Saldo Inicial',
        accessor: data => data.saldoinicial && formatMoney(data.saldoinicial as number),
      },
      {
        Header: 'Tipo',
        accessor: 'tipo',
      },
      {
        Header: 'Tipo Pessoa ',
        accessor: data => data.tipo_pessoa || "-",
      },
      {
        Header: 'Ativo',
        accessor: data => (data.ativo === true ? 'Ativo' : 'Inativo'),
      },
    ],
    []
  )
