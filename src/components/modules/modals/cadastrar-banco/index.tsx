import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ModalDefault } from '../../modal-default'
import { useModal } from './../../../../hooks/useModal'
import FormCadastrarBanco from './../../forms/banco/index'

export const ModalCadastrarBanco: React.FC = () => {
  const idModal = ModalEnum.createBanco
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Banco`

  return (
    <ModalDefault
      id="cadastrar-banco"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarBanco />
    </ModalDefault>
  )
}
