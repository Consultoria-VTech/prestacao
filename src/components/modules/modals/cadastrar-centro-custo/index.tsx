import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarCentroCusto from '../../forms/centro-custo'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarCentroCusto: React.FC = () => {
  const idModal = ModalEnum.createCentroCusto
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Centro de Custo`

  return (
    <ModalDefault
      id="cadastrar-centro-custo"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarCentroCusto />
    </ModalDefault>
  )

  // const idModal = ModalEnum.createCentroCusto

  // const { isExpanded, updateComponent } = useModal<CentroCusto>(idModal)
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
  //           title="Novo Centro de Custo"
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
  //             <FormCadastrarCentroCusto />
  //           </div>
  //         </ReactHeight>
  //       </Scrollbar>
  //     </Modal>
  //   </ModalRender>
  // )
}
