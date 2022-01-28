import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ModalDefault } from '../../modal-default'
import FormFiltrarContaBancaria from './../../forms/filtrar-conta-bancaria/index'

export const ModalFiltrarContaBancaria: React.FC = () => {
  const idModal = ModalEnum.filterContaBancaria
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Conta Bancária`

  return (
    <ModalDefault
      id="filtrar-conta-bancaria"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormFiltrarContaBancaria />
    </ModalDefault>
  )
}
