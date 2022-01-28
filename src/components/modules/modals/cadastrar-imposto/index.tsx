import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarImposto from '../../forms/imposto/index'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarImposto: React.FC = () => {
  const idModal = ModalEnum.createImposto
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Imposto`

  return (
    <ModalDefault
      id="cadastrar-imposto"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormCadastrarImposto />
    </ModalDefault>
  )
}
