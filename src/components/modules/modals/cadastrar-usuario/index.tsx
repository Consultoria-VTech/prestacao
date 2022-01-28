import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarUsuario from '../../forms/usuario'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarUsuario: React.FC = () => {
  const idModal = ModalEnum.createUsuario
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Usuário`

  return (
    <ModalDefault
      id="cadastrar-usuario"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarUsuario />
    </ModalDefault>
  )
}