import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ModalDefault } from '../../modal-default/index'
import FormRenegociarContasPagar from './../../forms/renegociar-contas-pagar/index'

export const ModalRenegociarContasPagar: React.FC = () => {
  const idModal = ModalEnum.renegociarContasPagar
  const title = `Renegociar Conta`

  return (
    <ModalDefault
      id="renegociar-contas-pagar"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormRenegociarContasPagar />
    </ModalDefault>
  )
}
