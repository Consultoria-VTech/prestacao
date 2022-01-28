import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormFiltrarContasPagar from '../../forms/filtrar-contas-pagar'
import { ModalDefault } from '../../modal-default'
import { useModal } from './../../../../hooks/useModal'

export const ModalFiltrarContasPagar: React.FC = () => {
  const idModal = ModalEnum.filterContasPagar
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Contas a Pagar`

  return (
    <ModalDefault
      id="filtrar-contas-pagar"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormFiltrarContasPagar />
    </ModalDefault>
  )
}

// export default ModalFiltrarContasPagar
