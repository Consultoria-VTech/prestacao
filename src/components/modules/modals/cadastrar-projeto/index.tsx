import { FormCadastrarProjeto, ModalDefault } from '@components'
import { useModal } from '@hooks'
import { ModalEnum } from '@types'

export const ModalCadastrarProjeto = () => {
  const idModal = ModalEnum.createProjeto
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Projeto`

  return (
    <ModalDefault
      id="cadastrar-projeto"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarProjeto />
    </ModalDefault>
  )
}