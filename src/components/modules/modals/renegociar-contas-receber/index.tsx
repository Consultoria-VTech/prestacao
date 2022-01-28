import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ModalDefault } from '../../modal-default/index'
import FormRenegociarContasReceber from './../../forms/renegociar-contas-receber/index'

export const ModalRenegociarContasReceber: React.FC = () => {
  const idModal = ModalEnum.renegociarContasReceber
  const title = `Renegociar Conta`

  return (
    <ModalDefault
      id="renegociar-contas-receber"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormRenegociarContasReceber />
    </ModalDefault>
  )
}
