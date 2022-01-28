import { BoxNav } from '../../elements/nav'
import React from 'react'
import { InitialData } from '../../../types/initialData'
import { UsuarioPagination } from '../../../types/models/usuario'
import { TemplateDefaultTable } from '../default'

const ImplantacaoTemplate: React.FC<InitialData<UsuarioPagination>> = ({
  data,
}) => {
  return (
    <TemplateDefaultTable>
      <BoxNav nameCampo="teste" nameLabel="teste">
        teste componente
      </BoxNav>  
      <BoxNav nameCampo="teste2" nameLabel="teste2">
        teste componente
      </BoxNav>  
    </TemplateDefaultTable>
  )
}

export default ImplantacaoTemplate