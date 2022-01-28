import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarContaBancaria from '../../forms/conta-bancaria/index'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarContaBancaria: React.FC = () => {
  const idModal = ModalEnum.createContaBancaria
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Conta Bancária`

  return (
    <ModalDefault
      id="cadastrar-conta-bancaria"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarContaBancaria />
    </ModalDefault>
  )

  // const idModal = ModalEnum.createContaBancaria

  // const { isExpanded, updateComponent } = useModal<ContaBancaria>(idModal)
  // const refModalBody = useRef<HTMLDivElement>()
  // const { screenWidth } = useResize(refModalBody)

  // managerModal.on('clickExpand', updateComponent, idModal, 'aa')
  // const [heightScroll, setHeightScroll] = useState(0)
  // const [heightScroll2, setHeightScroll2] = useState(0)
  // const isExpandModal = isExpanded || screenWidth <= 568
  // return (
  //   <ModalRender idModal={idModal}>
  //     <Modal idModal={idModal} size="modal-lg" isExpanded={isExpandModal}>
  //       <ReactHeight onHeightReady={height => setHeightScroll(height)}>
  //         <ModalHeader
  //           title="Nova Conta Bancária"
  //           idModal={idModal}
  //           isExpanded={isExpandModal}
  //         />
  //       </ReactHeight>
  //       <Scrollbar
  //         style={{
  //           height: isExpandModal
  //             ? `calc(100vh - ${heightScroll}px)`
  //             : heightScroll2,
  //         }}
  //         disable={!isExpandModal}
  //         widthThumb={8}>
  //         <ReactHeight
  //           onHeightReady={height => {
  //             setHeightScroll2(height)
  //             console.log(height)
  //           }}>
  //           <div
  //             className={`${isExpandModal ? '' : 'modal-body'}`}
  //             ref={refModalBody}>
  //             <FormCadastrarContaBancaria />
  //           </div>
  //         </ReactHeight>
  //       </Scrollbar>
  //     </Modal>
  //   </ModalRender>
  // )
}

// export default ModalCadastrarContaBancaria
