import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarContasReceber from '../../forms/contas-receber/index'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarContasReceber: React.FC = () => {
  const idModal = ModalEnum.createContasReceber
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Contas a Receber`

  return (
    <ModalDefault
      id="cadastrar-contas-receber"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarContasReceber />
    </ModalDefault>
  )
  // const idModal = ModalEnum.createContasReceber

  // const { isExpanded, updateComponent } = useModal<ContasReceber>(idModal)
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
  //           title="Nova Conta a Receber"
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
  //             <FormCadastrarContasReceber />
  //           </div>
  //         </ReactHeight>
  //       </Scrollbar>
  //     </Modal>
  //   </ModalRender>
  // )
}

// export default ModalCadastrarContasReceber
