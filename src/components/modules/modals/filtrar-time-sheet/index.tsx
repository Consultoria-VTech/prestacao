import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
// import FormFiltrarTimeSheet from '../../forms/filtrar-time-sheet'
import { ModalDefault } from '../../modal-default'
import { useModal } from './../../../../hooks/useModal'

export const ModalFiltrarTimeSheet: React.FC = () => {
  const idModal = ModalEnum.filterTimeSheet
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Time Sheet`

  return (
    <ModalDefault
      id="filtrar-time-sheet"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      {/* <FormFiltrarTimeSheet /> */}
    </ModalDefault>
  )
}
