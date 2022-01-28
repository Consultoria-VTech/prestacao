import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormBaixarContasPagar from '../../forms/baixar-contas-pagar'
import { ModalDefault } from '../../modal-default/index'

export const ModalBaixarContasPagar: React.FC = () => {
  const idModal = ModalEnum.baixarContasPagar
  const title = `Conciliar Contas a Pagar`

  return (
    <ModalDefault
      id="baixar-contas-pagar"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormBaixarContasPagar />
    </ModalDefault>
  )
}
