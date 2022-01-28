import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarContratoResponsavel from '../../forms/contrato-responsavel'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarContratoResponsavel: React.FC = () => {
  const idModal = ModalEnum.createContratoResponsavel
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Responsável`

  return (
    <ModalDefault
      id="cadastrar-contrato-responsavel"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormCadastrarContratoResponsavel />
    </ModalDefault>
  )
}
