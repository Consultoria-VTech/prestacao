import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import {
    PrestacaoDespesa,
    PrestacaoDespesaStatus,
    PrestacaoDespesaTipoReembolso,
  } from '@types'
  import { formatMoney, leftPad , DateFormatEnum, formatDate} from '@utils'
  import { useMemo } from 'react'
  import { Column } from 'react-table'


  export const columns = (): Column<PrestacaoDespesa>[] =>
    useMemo<Column<PrestacaoDespesa>[]>(
      () => [
        {
          Header: 'Código',
          accessor: data => leftPad(data.id, 5),
          id: 'id',
        },
        {
          Header: 'Tipo Despesa',
          accessor: 'descricao',
        },
        {
          Header: 'Tipo Reembolso',
          accessor: data => PrestacaoDespesaTipoReembolso[data.tipoReembolso],
          id: 'tipoReembolso',
        },
        {
          Header: 'Data Despesa',
          accessor: data => 
          format(data.dtDespesa as Date, 'dd/MM/yyyy', { locale: pt }),
        },
        {
          Header: 'Valor',
          accessor: data => data.valor && formatMoney(data.valor as number),
        },
        {
          Header: 'Limite/KM',
          accessor: data => data.quilometragem
        },
        {
          Header: 'Status',
          accessor: data => PrestacaoDespesaStatus[data.status],
        },
        {
          Header: 'observacao',
          accessor: 'observacao',
        },
      ],
      []
    )