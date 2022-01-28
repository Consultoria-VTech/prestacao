/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import {
  ModalCadastrarCentroCusto,
  ModalFiltrarCentroCusto,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { CentroCustoPagination } from '../../../types/models/centroCusto'
import TableCentroCusto from '../../modules/tables/table-centro-custo/index'
import { TemplateDefaultTable } from './../default'

const CentroCustoTemplate: React.FC<InitialData<CentroCustoPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableCentroCusto data={data} />
      <ModalCadastrarCentroCusto />
      <ModalFiltrarCentroCusto />
    </TemplateDefaultTable>
  )
}

export default CentroCustoTemplate
