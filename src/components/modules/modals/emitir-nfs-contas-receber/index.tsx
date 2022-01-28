import React from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormEmitirNFSContasReceber from './../../forms/emitir-nfs-contas-receber'
import { ModalDefault } from './../../modal-default/index'

export const ModalEmitirNFSContasReceber: React.FC = () => {
  const idModal = ModalEnum.emitirNFSContasReceber
  const title = `Emitir NFS Contas a Receber`

  return (
    <ModalDefault
      id="emitir-nfs-contas-receber"
      modalEnum={idModal}
      sizeModal="modal-md"
      title={title}>
      <FormEmitirNFSContasReceber />
    </ModalDefault>
  )
}
