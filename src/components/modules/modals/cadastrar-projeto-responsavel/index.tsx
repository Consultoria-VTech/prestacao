import { FormCadastrarProjetoResponsavel } from '@components'
import { useModal } from '@hooks'
import { ModalEnum } from '@types'
import React from 'react'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarProjetoResponsavel = () => {
  const idModal = ModalEnum.createProjetoResponsavel
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Responsável`

  return (
    <ModalDefault
      id="cadastrar-projeto-responsavel"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormCadastrarProjetoResponsavel />
    </ModalDefault>
  )
}