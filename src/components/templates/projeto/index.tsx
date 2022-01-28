import { InitialData, ProjetoPagination } from '@types'
import React from 'react'
import { ModalCadastrarProjeto } from '~/components/modules'
import TableProjeto from '~/components/modules/tables/table-projeto'
import { TemplateDefaultTable } from '../default'

export const ProjetoTemplate: React.FC<InitialData<ProjetoPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <TableProjeto data={data} />
      <ModalCadastrarProjeto />
    </TemplateDefaultTable>
  )
}