import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormEstornarContasReceber from './../../forms/estornar-contas-receber'
import { ModalDefault } from './../../modal-default/index'

export const ModalEstornarContasReceber: React.FC = () => {
  const idModal = ModalEnum.estornarContasReceber
  const title = `Estornar Contas a Receber`

  return (
    <ModalDefault
      id="estornar-contas-receber"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormEstornarContasReceber />
    </ModalDefault>
  )
}
