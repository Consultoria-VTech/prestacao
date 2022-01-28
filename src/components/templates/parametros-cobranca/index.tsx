/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import {
  ModalCadastrarParametrosCobranca,
  ModalFiltrarParametrosCobranca,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ParametrosCobrancaPagination } from '../../../types/models/parametrosCobranca'
import { TemplateDefaultTable } from '../default'
import TableParametrosCobranca from './../../modules/tables/table-parametros-cobranca/index'

const ParametrosCobrancaTemplate: React.FC<
  InitialData<ParametrosCobrancaPagination>
> = ({ data }) => {
  return (
    <TemplateDefaultTable>
      <TableParametrosCobranca data={data} />
      <ModalCadastrarParametrosCobranca />
      <ModalFiltrarParametrosCobranca />
    </TemplateDefaultTable>
  )
}

export default ParametrosCobrancaTemplate
