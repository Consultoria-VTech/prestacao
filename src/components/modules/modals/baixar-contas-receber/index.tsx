import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormBaixarContasReceber from './../../forms/baixar-contas-receber/index'
import { ModalDefault } from './../../modal-default/index'

export const ModalBaixarContasReceber: React.FC = () => {
  const idModal = ModalEnum.baixarContasReceber
  const title = `Conciliar Contas a Receber`

  return (
    <ModalDefault
      id="baixar-contas-receber"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormBaixarContasReceber />
    </ModalDefault>
  )
}
