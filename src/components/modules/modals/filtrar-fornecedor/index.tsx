import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormFiltrarFornecedor from '../../forms/filtrar-fornecedor'
import { ModalDefault } from '../../modal-default'

export const ModalFiltrarFornecedor: React.FC = () => {
  const idModal = ModalEnum.filterFornecedor
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Fornecedor`

  return (
    <ModalDefault
      id="filtrar-fornecedor"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormFiltrarFornecedor />
    </ModalDefault>
  )
}
