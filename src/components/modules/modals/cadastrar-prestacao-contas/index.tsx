import { FormCadastrarPrestacaoContas, ModalDefault } from '@components'
import { useModal } from '@hooks'
import { ModalEnum } from '@types'

export const ModalCadastrarPrestacaoContas = () => {
  const idModal = ModalEnum.createPrestacaoContas
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Prestação de Contas`

  return (
    <ModalDefault
      id="cadastrar-prestacao-contas"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarPrestacaoContas />
    </ModalDefault>
  )
}