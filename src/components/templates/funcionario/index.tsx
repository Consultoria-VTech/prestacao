/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { ModalCadastrarFuncionario } from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { FuncionarioPagination } from '../../../types/models/funcionario'
import TableFabricante from '../../modules/tables/table-funcionario/index'
import { TemplateDefaultTable } from '../default'

const FuncionarioTemplate: React.FC<InitialData<FuncionarioPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableFabricante data={data} />
      <ModalCadastrarFuncionario />
    </TemplateDefaultTable>
  )
}

export default FuncionarioTemplate
