import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormEstornarContasPagar from '../../forms/estornar-contas-pagar'
import { ModalDefault } from '../../modal-default/index'

export const ModalEstornarContasPagar: React.FC = () => {
  const idModal = ModalEnum.estornarContasPagar
  const title = `Estornar Contas a Pagar`

  return (
    <ModalDefault
      id="estornar-contas-pagar"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormEstornarContasPagar />
    </ModalDefault>
  )
}
