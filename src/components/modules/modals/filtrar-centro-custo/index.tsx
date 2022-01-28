import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormFiltrarCentroCusto from '../../forms/filtrar-centro-custo'
import { ModalDefault } from '../../modal-default'

export const ModalFiltrarCentroCusto: React.FC = () => {
  const idModal = ModalEnum.filterCentroCusto
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Centro de Custo`

  return (
    <ModalDefault
      id="filtrar-centro-custo"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormFiltrarCentroCusto />
    </ModalDefault>
  )
}
