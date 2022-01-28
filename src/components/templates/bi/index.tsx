import React from 'react'
import { ModalCadastrarBi } from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { BiPagination } from '../../../types/models/bi'
import TableBi from '../../modules/tables/table-bi'
import { TemplateDefaultTable } from '../default'

const BiTemplate: React.FC<InitialData<BiPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableBi data={data}/>
      <ModalCadastrarBi /> 
    </TemplateDefaultTable>
  )
}

export default BiTemplate