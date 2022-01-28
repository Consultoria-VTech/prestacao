import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import FormCadastrarCliente from '../../forms/cliente'
import { ModalDefault } from '../../modal-default'

export const ModalCadastrarCliente: React.FC = () => {
  const idModal = ModalEnum.createCliente
  const { getActionDescription } = useModal(idModal)
  const title = `${getActionDescription()} Cliente`

  return (
    <ModalDefault
      id="cadastrar-cliente"
      modalEnum={idModal}
      sizeModal="modal-lg"
      title={title}>
      <FormCadastrarCliente />
    </ModalDefault>
  )

  // const { isExpanded, updateComponent } = useModal<Cliente>(
  //   ModalEnum.createCliente
  // )
  // const refModalBody = useRef<HTMLDivElement>()
  // const { screenWidth } = useResize(refModalBody)

  // managerModal.on('clickExpand', updateComponent, ModalEnum.createCliente, 'aa')
  // const [heightScroll, setHeightScroll] = useState(0)
  // const [heightScroll2, setHeightScroll2] = useState(0)
  // const isExpandModal = isExpanded || screenWidth <= 568
  // return (
  //   <ModalRender idModal={ModalEnum.createCliente}>
  //     <Modal
  //       idModal={ModalEnum.createCliente}
  //       size="modal-lg"
  //       isExpanded={isExpandModal}>
  //       <ReactHeight onHeightReady={height => setHeightScroll(height)}>
  //         <ModalHeader
  //           title="Novo Cliente"
  //           idModal={ModalEnum.createCliente}
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
  //             <FormCadastrarCliente />
  //           </div>
  //         </ReactHeight>
  //       </Scrollbar>
  //     </Modal>
  //   </ModalRender>
  // )
}

// export default ModalCadastrarCliente
