import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormGerarParcelasContrato from './../../forms/contrato-gerarparcelas'
import { ModalDefault } from './../../modal-default/index'

export const ModalGerarParcelasContrato: React.FC = () => {
  const idModal = ModalEnum.gerarParcelasContrato
  const title = `Gerar Parcelas`

  return (
    <ModalDefault
      id="gerarparcelas-contrato"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormGerarParcelasContrato />
    </ModalDefault>
  )
}
