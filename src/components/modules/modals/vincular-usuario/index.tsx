import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { FormVincularUsuarioFuncionario } from '../../forms/funcionario-vincularusuario'
import { ModalDefault } from './../../modal-default/index'

export const ModalVincularUsuario: React.FC = () => {
  const idModal = ModalEnum.vincularUsuario
  const title = `Vincular Usuário`

  return (
    <ModalDefault
      id="vincular-usuario"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormVincularUsuarioFuncionario />
    </ModalDefault>
  )
}
