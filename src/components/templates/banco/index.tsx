/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { ModalCadastrarBanco, ModalFiltrarBanco } from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { BancoPagination } from '../../../types/models/banco'
import TableBanco from './../../modules/tables/table-banco/index'
import { TemplateDefaultTable } from './../default'

export const BancoTemplate: React.FC<InitialData<BancoPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableBanco data={data} />
      <ModalCadastrarBanco />
      <ModalFiltrarBanco />
    </TemplateDefaultTable>
  )
}
