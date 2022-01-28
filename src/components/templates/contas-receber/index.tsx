import React from 'react'
import {
  ModalBaixarContasReceber,
  ModalCadastrarContasReceber,
  ModalFiltrarContasReceber,
  ModalRenegociarContasReceber,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ContasReceberPagination } from '../../../types/models/contasReceber'
import { TemplateDefaultTable } from '../default'
import TableContasReceber from './../../modules/tables/contas-receber/index'

const ContasReceberTemplate: React.FC<InitialData<ContasReceberPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableContasReceber data={data} />
      <ModalCadastrarContasReceber />
      <ModalFiltrarContasReceber />
      <ModalBaixarContasReceber />
      <ModalRenegociarContasReceber />
    </TemplateDefaultTable>
  )
}

export default ContasReceberTemplate
