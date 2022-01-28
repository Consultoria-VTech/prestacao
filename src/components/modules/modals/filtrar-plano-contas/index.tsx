import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormFiltrarPlanoContas from '../../forms/filtrar-plano-contas'
import { ModalDefault } from '../../modal-default'

export const ModalFiltrarPlanoContas: React.FC = () => {
  const idModal = ModalEnum.filterPlanoContas
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Natureza`

  return (
    <ModalDefault
      id="filtrar-plano-conta"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormFiltrarPlanoContas />
    </ModalDefault>
  )
}
