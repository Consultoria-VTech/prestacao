import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import Icon from '../../../elements/icon'
import React from 'react'
import { MainIcons } from './styles'
import { ICON_LIBRARY } from '../../../../types/icon'
import ContextMenuEmitirBordero from './context-menu'
import { ContasPagar } from '../../../../types/models/contasPagar'
import { formatMoney, leftPad } from '../../../../util/stringUtil'


const EventClick = (props: CellProps<ContasPagar, ContasPagar>) =>  {
  const { displayMenu } = ContextMenuEmitirBordero<ContasPagar>({
    onItemClick: null,
  })

  return (
        <MainIcons onClick={(e) => displayMenu({e, data: props.row})}>
        <span className="btn-Edit" >
        <Icon icon="FaEdit" iconLibrary={ICON_LIBRARY.FONT_AWESOME} />
        </span>
        </MainIcons>
  )}

export const columns = (): Column<ContasPagar>[] =>
  useMemo<Column<ContasPagar>[]>(
    () => [
      {
        Header: ' ',
        id: 'icone',
        Cell: EventClick
      },
      {
        Header: 'Código',
        accessor: data => leftPad(data.id, 6),
        id: 'id',
        style: {
          width: 100,
        },
      },
      {
        Header: 'Fornecedor',
        accessor: data => data.fornecedor.razao,
        id: 'fornecedor',
      },
      {
        Header: 'Valor a Pagar',
        accessor: data => data.valor && formatMoney(data.valor as number),
      },
      {
        Header: 'Valor Pago',
        accessor: data => data.valorBaixa && formatMoney(data.valorBaixa as number)
      },
      {
        Header: 'Data Pagamento',
        accessor: data =>
          data.dtBaixa
            ? format(data.dtBaixa as Date, 'dd/MM/yyyy', { locale: pt })
            : '',
      },
      {
        Header: 'Vencimento',
        accessor: data =>
          format(data.dtVencimento as Date, 'dd/MM/yyyy', { locale: pt }),
      },
      {
        Header: 'Banco',
        accessor: data =>
          data.contaBancaria &&
          `${data?.contaBancaria?.banco?.bankId} - ${data?.contaBancaria?.banco?.name}`,
      },
      // {
      //   Header: 'Conta',
      //   accessor: data => `${data?.contaBancaria.conta} - ${data?.contaBancaria.contaDv}`,
      // },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Borderô',
        accessor: data => data.bordero,
      },
      // {
      //   Header: 'Natureza',
      //   accessor: data => data.planoContas.descricao,
      //   id: 'planoContas',
      // },
      // {
      //   Header: 'Centro de Custo',
      //   accessor: data => data?.centroCusto?.descricao,
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
      //   Header: 'Data Baixa',
      //   accessor: data =>
      //     data.dtBaixa
      //       ? format(data.dtBaixa, 'dd/MM/yyyy hh:mm:ss', { locale: pt })
      //       : '',
      // },
      // {
      //   Header: 'Valor Baixa',
      //   accessor: data => data.valorBaixa && formatMoney(data.valorBaixa),
      //   id: 'valorBaixa',
      // },
      // {
      //   Header: 'Agência',
      //   accessor: data => data?.contaBancaria?.agencia,
      // },
      // {
      //   Header: 'Possui Comprovante',
      //   accessor: data => (data.possuiComprovante === true ? 'Sim' : 'Não'),
      //   id: 'possuiComprovante',
      // },
    ],
    []
  )
