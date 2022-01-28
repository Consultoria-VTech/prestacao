import {
    ModalCadastrarProjetoResponsavel,
    TableProjetoResponsavel,
  } from '@components'
  import { InitialData, ProjetoResponsavelPagination } from '@types'
  import React from 'react'
  import { TemplateDefaultTable } from '../default'
  
  export const ProjetoResponsavelTemplate: React.FC<
    InitialData<ProjetoResponsavelPagination>
  > = ({ data }) => {
    return (
      <TemplateDefaultTable>
        <TableProjetoResponsavel data={data} />
        <ModalCadastrarProjetoResponsavel />
      </TemplateDefaultTable>
    )
  }