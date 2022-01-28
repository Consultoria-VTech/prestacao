import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarParametrosCobranca from '../../forms/parametros-cobranca'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarParametrosCobranca: React.FC = () => {
  const idModal = ModalEnum.createParametroCobranca
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Parâmetros de Cobrança`

  return (
    <ModalDefault
      id="cadastrar-paramtros-cobranca"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormCadastrarParametrosCobranca />
    </ModalDefault>
  )
}
