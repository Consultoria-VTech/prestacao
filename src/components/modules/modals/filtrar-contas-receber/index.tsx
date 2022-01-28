import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormFiltrarContasReceber from '../../forms/filtrar-contas-receber'
import { ModalDefault } from '../../modal-default'
import { useModal } from './../../../../hooks/useModal'

export const ModalFiltrarContasReceber: React.FC = () => {
  const idModal = ModalEnum.filterContasReceber
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Contas a Receber`

  return (
    <ModalDefault
      id="filtrar-contas-receber"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormFiltrarContasReceber />
    </ModalDefault>
  )
}
