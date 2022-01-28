import React from 'react'
import { ModalCadastrarContratoResponsavel } from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ContratoResponsavelPagination } from '../../../types/models/contratoResponsavel'
import TableContratoResponsavel from '../../modules/tables/table-contrato-responsavel'
import { TemplateDefaultTable } from '../default'

const ContratoResponsavelTemplate: React.FC<
  InitialData<ContratoResponsavelPagination>
> = ({ data }) => {
  return (
    <TemplateDefaultTable>
      <TableContratoResponsavel data={data} />
      <ModalCadastrarContratoResponsavel />
    </TemplateDefaultTable>
  )
}

export default ContratoResponsavelTemplate
