/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import {
  ModalCadastrarImposto,
  ModalFiltrarImposto,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ImpostoPagination } from '../../../types/models/imposto'
import { TemplateDefaultTable } from '../default'
import TableImposto from './../../modules/tables/table-imposto/index'

const ImpostoTemplate: React.FC<InitialData<ImpostoPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableImposto data={data} />
      <ModalCadastrarImposto />
      <ModalFiltrarImposto />
    </TemplateDefaultTable>
  )
}

export default ImpostoTemplate
