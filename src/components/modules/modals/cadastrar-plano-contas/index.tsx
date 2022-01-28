import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarPlanoContas from '../../forms/plano-contas'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarPlanoContas: React.FC = () => {
  const idModal = ModalEnum.createPlanoContas
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Natureza`

  return (
    <ModalDefault
      id="cadastrar-planoContas"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormCadastrarPlanoContas />
    </ModalDefault>
  )
}
