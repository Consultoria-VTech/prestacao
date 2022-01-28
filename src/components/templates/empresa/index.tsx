/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { ModalCadastrarEmpresa } from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { EmpresaPagination } from '../../../types/models/empresa'
import TableEmpresa from '../../modules/tables/table-empresa/index'
import { TemplateDefaultTable } from '../default'

const EmpresaTemplate: React.FC<InitialData<EmpresaPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableEmpresa data={data} />
      <ModalCadastrarEmpresa />
    </TemplateDefaultTable>
  )
}

export default EmpresaTemplate
