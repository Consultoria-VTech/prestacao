import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarFuncionario from '../../forms/funcionario'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarFuncionario: React.FC = () => {
  const idModal = ModalEnum.createFuncionario
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Funcionario`

  return (
    <ModalDefault
      id="cadastrar-funcionario"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarFuncionario />
    </ModalDefault>
  )
}
