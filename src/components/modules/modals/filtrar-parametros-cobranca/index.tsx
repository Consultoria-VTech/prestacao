import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormFiltrarParametrosCobranca from '../../forms/filtrar-parametros-cobranca'
import { ModalDefault } from '../../modal-default'

export const ModalFiltrarParametrosCobranca: React.FC = () => {
  const idModal = ModalEnum.filterParametroCobranca
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Parâmetros de Cobrança`

  return (
    <ModalDefault
      id="filtrar-paramtros-cobranca"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormFiltrarParametrosCobranca />
    </ModalDefault>
  )
}
