/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import {
  ModalCadastrarPlanoContas,
  ModalFiltrarPlanoContas,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { PlanoContasPagination } from '../../../types/models/planoContas'
import TablePlanoContas from '../../modules/tables/table-plano-contas'
import { TemplateDefaultTable } from '../default'

const PlanoContasTemplate: React.FC<InitialData<PlanoContasPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TablePlanoContas data={data} />
      <ModalCadastrarPlanoContas />
      <ModalFiltrarPlanoContas />
    </TemplateDefaultTable>
  )
}

export default PlanoContasTemplate
