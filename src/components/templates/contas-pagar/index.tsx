import React from 'react'
import {
  ModalBaixarContasPagar,
  ModalCadastrarContasPagar,
  ModalFiltrarContasPagar,
  ModalRenegociarContasPagar,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ContasPagarPagination } from '../../../types/models/contasPagar'
import { TemplateDefaultTable } from '../default'
import TableContasPagar from './../../modules/tables/contas-pagar/index'

const ContasPagarTemplate: React.FC<InitialData<ContasPagarPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableContasPagar data={data} />
      <ModalCadastrarContasPagar />
      <ModalFiltrarContasPagar />
      <ModalBaixarContasPagar />
      <ModalRenegociarContasPagar />
    </TemplateDefaultTable>
  )
}

export default ContasPagarTemplate
