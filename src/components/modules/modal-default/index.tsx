import React, { ReactNode, useRef, useState } from 'react'
import { ReactHeight } from 'react-height'
import { ModalEnum } from '../../../types/enum/modalEnum'
import { Scrollbar } from '../../elements/scrollbar'
import Modal, { ModalHeader, ModalRender } from '../modal'
import { managerModal, useModal } from './../../../hooks/useModal'
import { useResize } from './../../../hooks/useResize'

type ModalDefaultProps = {
  id: string
  modalEnum: ModalEnum
  sizeModal: string
  title: string
  children: ReactNode
}

export const ModalDefault: React.FC<ModalDefaultProps> = ({
  id,
  modalEnum,
  sizeModal,
  title,
  children,
}) => {
  const { isExpanded, updateComponent } = useModal(modalEnum)
  const refModalBody = useRef<HTMLDivElement>()
  const { screenWidth } = useResize(refModalBody)

  managerModal.on('clickExpand', updateComponent, modalEnum, id)
  const [heightScroll, setHeightScroll] = useState<number>(0)
  const [heightScrollChildren, setHeightScrollChildren] = useState<number>(0)
  const isExpandModal = isExpanded || screenWidth <= 568

  return (
    <ModalRender idModal={modalEnum}>
      <Modal idModal={modalEnum} size={sizeModal} isExpanded={isExpandModal}>
        <ReactHeight onHeightReady={height => setHeightScroll(height)}>
          <ModalHeader
            title={title}
            idModal={modalEnum}
            isExpanded={isExpandModal}
          />
        </ReactHeight>
        <Scrollbar
          style={{
            height: isExpandModal
              ? `calc(100vh - ${heightScroll}px)`
              : heightScrollChildren,
          }}
          disable={!isExpandModal}
          widthThumb={8}>
          <ReactHeight
            onHeightReady={height => setHeightScrollChildren(height)}>
            <div
              className={`${isExpandModal ? '' : 'modal-body'}`}
              ref={refModalBody}>
              {children}
            </div>
          </ReactHeight>
        </Scrollbar>
      </Modal>
    </ModalRender>
  )
}
