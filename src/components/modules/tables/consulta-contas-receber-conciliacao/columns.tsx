import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import React, { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import { ICON_LIBRARY } from '../../../../types/icon'
import { ContasReceber } from '../../../../types/models/contasReceber'
import { formatMoney, leftPad } from '../../../../util/stringUtil'
import Icon from '../../../elements/icon'
import ContextMenuContasReceber from './context-menu'
import { MainIcons } from './styles'

const EventClick = (props: CellProps<ContasReceber, ContasReceber>) => {
  const { displayMenu } = ContextMenuContasReceber<ContasReceber>({
    onItemClick: null,
  })

  return (
    <MainIcons onClick={e => displayMenu({ e, data: props.row })}>
      <span className="btn-Edit">
        <Icon icon="FaEdit" iconLibrary={ICON_LIBRARY.FONT_AWESOME} />
      </span>
    </MainIcons>
  )
}

export const columns = (): Column<ContasReceber>[] =>
  useMemo<Column<ContasReceber>[]>(
    () => [
      {
        Header: ' ',
        id: 'icone',
        Cell: EventClick,
      },
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
      },
      {
        Header: 'Código CR',
        accessor: data => leftPad(data.contasreceber.id, 6),
      },
      {
        Header: 'Valor Recebido',
        accessor: data => formatMoney(data.valor as number),
      },
      {
        Header: 'Data Recebimento',
        accessor: data =>
          data.dtBaixa
            ? format(data.dtBaixa as Date, 'dd/MM/yyyy', { locale: pt })
            : '',
      },
      // {
      //   Header: 'Banco',
      //   accessor: data => data.idcontaBancaria.banco.name,
      // },

      {
        Header: 'Banco',
        accessor: data =>
          data.idcontaBancaria &&
          `${data?.idcontaBancaria?.agencia}-${data?.idcontaBancaria?.agenciaDv} - ${data?.idcontaBancaria?.banco?.name}`,
      },
      {
        Header: 'Situação',
        accessor: 'situacao',
      },
      // {
      //   Header: 'Natureza',
      //   accessor: data => data.planoContas?.descricao,
      //   id: 'natureza',
      // },
      // {
      //   Header: 'Centro de Custo',
      //   accessor: data => data?.centrocusto?.descricao,
      //   id: 'centroCusto',
      // },
      // {
      //   Header: 'Tipo documento',
      //   accessor: data => data.tipoDoc,
      // },
      // {
      //   Header: 'Documento',
      //   accessor: data => data.nDoc,
      // },
      // {
      //   Header: 'Parcela',
      //   accessor: data => leftPad(data.nParcelas, 2),
      // },
      // {
      //   Header: 'Emissão',
      //   accessor: data =>
      //     format(data.dtEmissao, 'dd/MM/yyyy hh:mm:ss', { locale: pt }),
      // },
      // {
      //   Header: 'Data Recebimento',
      //   accessor: data =>
      //     format(data.dtBaixa as Date, 'dd/MM/yyyy', { locale: pt }),
      // },
      // {
      //   Header: 'Valor Baixa',
      //   accessor: data => data.valorBaixa && formatMoney(data.valorBaixa),
      // },

      // {
      //   Header: 'Banco',
      //   accessor: data =>
      //     `${data?.contaBancaria?.banco?.bankId} - ${data?.contaBancaria?.banco?.name}`,
      // },
      // {
      //   Header: 'Agência',
      //   accessor: data => leftPad(data?.contaBancaria?.agencia, 4),
      // },
      // {
      //   Header: 'Conta',
      //   accessor: data => data?.contaBancaria?.conta,
      // },
      // {
      //   Header: 'Possui Comprovante',
      //   accessor: data => (data.possuiComprovante === true ? 'Sim' : 'Não'),
      //   id: 'possuiComprovante',
      // },
    ],
    []
  )
