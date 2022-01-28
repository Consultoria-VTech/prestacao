import React from 'react'
import {
  ModalCadastrarContrato,
  ModalGerarParcelasContrato,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ContratoPagination } from '../../../types/models/contrato'
import TableContrato from '../../modules/tables/table-contrato/index'
import { TemplateDefaultTable } from '../default'

const ContratoTemplate: React.FC<InitialData<ContratoPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableContrato data={data} />
      <ModalCadastrarContrato />
      <ModalGerarParcelasContrato />
    </TemplateDefaultTable>
  )
}

export default ContratoTemplate
