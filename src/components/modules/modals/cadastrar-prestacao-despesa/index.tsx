import { ModalDefault } from '@components'
import FormCadastrarPrestacaoDespesa from '../../../../components/modules/forms/prestacao-despesa'
import { useModal } from '@hooks'
import { ModalEnum } from '@types'

export const ModalCadastrarPrestacaoDespesa = () => {
  const idModal = ModalEnum.createPrestacaoDespesa
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Despesa da Prestação`

  return (
    <ModalDefault
      id="cadastrar-prestacao-despesa"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarPrestacaoDespesa />
    </ModalDefault>
  )
}