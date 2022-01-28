import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarContrato from '../../forms/contrato'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarContrato: React.FC = () => {
  const idModal = ModalEnum.createContrato
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Contrato`

  return (
    <ModalDefault
      id="cadastrar-contrato"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarContrato />
    </ModalDefault>
  )
}
