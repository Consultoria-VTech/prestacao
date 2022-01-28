import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ModalDefault } from '../../modal-default'
import FormCadastrarConciliacao from './../../forms/conciliacao/index'

export const ModalCadastrarConciliacao: React.FC = () => {
  const idModal = ModalEnum.createConciliacao
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Conciliacao`

  return (
    <ModalDefault
      id="cadastrar-conciliacao"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormCadastrarConciliacao />
    </ModalDefault>
  )
}
