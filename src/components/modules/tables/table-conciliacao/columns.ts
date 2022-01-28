import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { useMemo } from 'react'
import { Column } from 'react-table'
import { Conciliacao } from '../../../../types/models/conciliacao'
import { formatMoney, leftPad } from '../../../../util/stringUtil'

export const columns = (): Column<Conciliacao>[] =>
  useMemo<Column<Conciliacao>[]>(
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
        Header: 'Tipo',
        accessor: 'tipo',
      },
      {
        Header: 'Conta Bancária',
        accessor: data =>
          data.contaBancaria &&
          `${data?.contaBancaria?.banco?.bankId} - ${data?.contaBancaria?.banco?.name} 
        / ${data.contaBancaria.conta}-${data.contaBancaria.contaDv} `,
      },
      // {
      //   Header: 'Agência',
      //   accessor: data =>
      //     data.contaBancaria.agenciaDv
      //       ? `${data.contaBancaria.agencia}-${data.contaBancaria.agenciaDv}`
      //       : data.contaBancaria.agencia,
      // },
      // {
      //   Header: 'Conta',
      //   accessor: data =>
      //     `${data.contaBancaria.conta}-${data.contaBancaria.contaDv}`,
      // },
      {
        Header: 'Valor Recebido',
        accessor: data => data.valor && formatMoney(data.valor as number),
      },
      {
        Header: 'Data Pag./Rec.',
        accessor: data =>
          format(data.dataCadastro as Date, 'dd/MM/yyyy hh:mm:ss', {
            locale: pt,
          }),
      },
      {
        Header: 'Data Conciliação',
        accessor: data =>
          format(data.dataCadastro as Date, 'dd/MM/yyyy hh:mm:ss', {
            locale: pt,
          }),
      },
    ],
    []
  )
