import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarBi from '../../forms/bi'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarBi: React.FC = () => {
  const idModal = ModalEnum.createBi
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Bi`

  return (
    <ModalDefault
      id="createBi"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarBi />
    </ModalDefault>
  )
}