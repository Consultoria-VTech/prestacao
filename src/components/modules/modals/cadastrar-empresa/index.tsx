import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarEmpresa from '../../forms/empresa'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarEmpresa: React.FC = () => {
  const idModal = ModalEnum.createEmpresa
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Empresa`

  return (
    <ModalDefault
      id="cadastrar-empresa"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarEmpresa />
    </ModalDefault>
  )
}
