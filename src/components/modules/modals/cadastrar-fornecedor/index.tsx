import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarFornecedor from '../../forms/fornecedor'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarFornecedor: React.FC = () => {
  const idModal = ModalEnum.createFornecedor
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Fornecedor`

  return (
    <ModalDefault
      id="cadastrar-fornecedor"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarFornecedor />
    </ModalDefault>
  )

  // const { isExpanded, updateComponent } = useModal<Fornecedor>(
  //   ModalEnum.createFornecedor
  // )
  // const refModalBody = useRef<HTMLDivElement>()
  // const { screenWidth } = useResize(refModalBody)

  // managerModal.on(
  //   'clickExpand',
  //   updateComponent,
  //   ModalEnum.createFornecedor,
  //   'aa'
  // )
  // const [heightScroll, setHeightScroll] = useState(0)
  // const [heightScroll2, setHeightScroll2] = useState(0)
  // const isExpandModal = isExpanded || screenWidth <= 568
  // return (
  //   <ModalRender idModal={ModalEnum.createFornecedor}>
  //     <Modal
  //       idModal={ModalEnum.createFornecedor}
  //       size="modal-lg"
  //       isExpanded={isExpandModal}>
  //       <ReactHeight onHeightReady={height => setHeightScroll(height)}>
  //         <ModalHeader
  //           title="Novo Fornecedor"
  //           idModal={ModalEnum.createFornecedor}
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
  //             <FormCadastrarFornecedor />
  //           </div>
  //         </ReactHeight>
  //       </Scrollbar>
  //     </Modal>
  //   </ModalRender>
  // )
}

// export default ModalCadastrarFornecedor
