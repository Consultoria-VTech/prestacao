/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { ModalCadastrarConciliacao } from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ConciliacaoPagination } from '../../../types/models/conciliacao'
import TableConciliacao from '../../modules/tables/table-conciliacao'
import { TemplateDefaultTable } from '../default'

const ConciliacaoBancariaTemplate: React.FC<
  InitialData<ConciliacaoPagination>
> = ({ data }) => {
  return (
    <TemplateDefaultTable>
      <TableConciliacao data={data} />
      <ModalCadastrarConciliacao />
    </TemplateDefaultTable>
  )
}

export default ConciliacaoBancariaTemplate
