import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormFiltrarCliente from '../../forms/filtrar-cliente'
import { ModalDefault } from '../../modal-default'
import { useModal } from './../../../../hooks/useModal'

export const ModalFiltrarCliente: React.FC = () => {
  const idModal = ModalEnum.filterCliente
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Cliente`

  return (
    <ModalDefault
      id="filtrar-cliente"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormFiltrarCliente />
    </ModalDefault>
  )
}
