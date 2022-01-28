import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormEmitirBordero from './../../forms/emitir-bordero-contas-pagar'
import { ModalDefault } from './../../modal-default/index'

export const ModalEmitirBordero: React.FC = () => {
  const idModal = ModalEnum.emitirBorderoContasPagar
  const title = `Emitir Borderô Contas Pagar`

  return (
    <ModalDefault
      id="emitir-bordero-contas-pagar"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormEmitirBordero />
    </ModalDefault>
  )
}
