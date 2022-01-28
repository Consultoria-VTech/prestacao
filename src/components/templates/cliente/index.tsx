/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import {
  ModalCadastrarCliente,
  ModalFiltrarCliente,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ClientePagination } from '../../../types/models/cliente'
import TableCliente from '../../modules/tables/table-cliente/index'
import { TemplateDefaultTable } from '../default'

const ClienteTemplate: React.FC<InitialData<ClientePagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableCliente data={data} />
      <ModalCadastrarCliente />
      <ModalFiltrarCliente />
    </TemplateDefaultTable>
  )
}

export default ClienteTemplate
