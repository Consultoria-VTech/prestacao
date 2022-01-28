import React from 'react'
import { ModalCadastrarUsuario } from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { UsuarioPagination } from '../../../types/models/usuario'
import TableUsuarios from '../../modules/tables/table-usuario'
import { TemplateDefaultTable } from '../default'

const EmpresaTemplate: React.FC<InitialData<UsuarioPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableUsuarios data={data} />
      <ModalCadastrarUsuario />
    </TemplateDefaultTable>
  )
}

export default EmpresaTemplate