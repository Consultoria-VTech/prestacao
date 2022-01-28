/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import {
  ModalCadastrarContaBancaria,
  ModalFiltrarContaBancaria,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ContaBancariaPagination } from '../../../types/models/contaBancaria'
import TableContaBancaria from '../../modules/tables/table-conta-bancaria'
import { TemplateDefaultTable } from '../default'

const ContaBancariaTemplate: React.FC<InitialData<ContaBancariaPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableContaBancaria data={data} />
      <ModalCadastrarContaBancaria />
      <ModalFiltrarContaBancaria />
    </TemplateDefaultTable>
  )
}

export default ContaBancariaTemplate
