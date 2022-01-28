import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ModalDefault } from '../../modal-default'
import { useModal } from './../../../../hooks/useModal'
import FormFiltrarBanco from './../../forms/filtrar-banco/index'

export const ModalFiltrarBanco: React.FC = () => {
  const idModal = ModalEnum.filterBanco
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Banco`

  return (
    <ModalDefault
      id="filtrar-banco"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormFiltrarBanco />
    </ModalDefault>
  )
}
