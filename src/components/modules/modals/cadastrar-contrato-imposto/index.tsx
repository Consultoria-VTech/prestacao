import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarContratoImposto from '../../forms/contrato-imposto'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarContratoImposto: React.FC = () => {
  const idModal = ModalEnum.createContratoImposto
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Imposto`

  return (
    <ModalDefault
      id="cadastrar-contrato-impoto"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormCadastrarContratoImposto />
    </ModalDefault>
  )
}
