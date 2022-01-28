import React from 'react'
import { ModalCadastrarContratoImposto } from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ContratoImpostoPagination } from '../../../types/models/contratoImposto'
import TableContratoImposto from '../../modules/tables/table-contrato-imposto'
import { TemplateDefaultTable } from '../default'

const ContratoImpostoTemplate: React.FC<
  InitialData<ContratoImpostoPagination>
> = ({ data }) => {
  return (
    <TemplateDefaultTable>
      <TableContratoImposto data={data} />
      <ModalCadastrarContratoImposto />
    </TemplateDefaultTable>
  )
}

export default ContratoImpostoTemplate
