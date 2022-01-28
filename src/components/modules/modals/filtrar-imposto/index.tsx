import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
// import FormFiltrarImposto from '../../forms/filtrar-imposto'
import { ModalDefault } from '../../modal-default'

export const ModalFiltrarImposto: React.FC = () => {
  const idModal = ModalEnum.filterImposto
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Imposto`

  return (
    <ModalDefault
      id="cadastrar-imposto"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      {/* <FormFiltrarImposto /> */}
    </ModalDefault>
  )
}
