import React from 'react'
import {
  ModalCadastrarFornecedor,
  ModalFiltrarFornecedor,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { FornecedorPagination } from '../../../types/models/fornecedor'
import TableFornecedor from '../../modules/tables/table-fornecedor/index'
import { TemplateDefaultTable } from '../default'

const FornecedorTemplate: React.FC<InitialData<FornecedorPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableFornecedor data={data} />
      <ModalCadastrarFornecedor />
      <ModalFiltrarFornecedor />
    </TemplateDefaultTable>
  )
}

export default FornecedorTemplate
