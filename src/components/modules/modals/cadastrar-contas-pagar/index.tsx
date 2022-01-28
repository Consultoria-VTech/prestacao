import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarContasPagar from '../../forms/contas-pagar/index'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarContasPagar: React.FC = () => {
  const idModal = ModalEnum.createContasPagar
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Contas a Pagar`

  return (
    <ModalDefault
      id="cadastrar-contas-pagar"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarContasPagar />
    </ModalDefault>
  )

  // const idModal = ModalEnum.createContasPagar

  // const { isExpanded, updateComponent } = useModal<ContasPagar>(idModal)
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
  //           title="Nova Conta a Pagar"
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
  //             <FormCadastrarContasPagar />
  //           </div>
  //         </ReactHeight>
  //       </Scrollbar>
  //     </Modal>
  //   </ModalRender>
  // )
}

// export default ModalCadastrarContasPagar
