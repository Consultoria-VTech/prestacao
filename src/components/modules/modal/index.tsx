import DragM from 'dragm'
import React, { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import ReactFocusLock from 'react-focus-lock'
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import { CSSTransition } from 'react-transition-group'
import { ModalProps as ModalPropsHook, useModal } from '../../../hooks/useModal'
import { useResize } from '../../../hooks/useResize'
import { ToastContainerStyled } from '../../../styles/ToastContainerStyled'
import { ModalEnum } from '../../../types/enum/modalEnum'
import { toastTimeDefault, TOAST_CONTAINER } from '../../../util/constants'
import { Scrollbar } from '../../elements/scrollbar'
import {
  Backdrop,
  FooterStyled,
  HeaderStyled,
  StyledModal,
  Wrapper,
} from './styles'

export interface ModalProps {
  idModal?: ModalEnum
  isOpen?: boolean
  hide?: () => void
  hideOutside?: boolean
  modalContent?: JSX.Element
  headerText?: string
  children: ReactNode
  className?: string
  size?: string
  isExpanded?: boolean
}

type ModalRenderProps = {
  idModal?: ModalEnum
  children?: ReactNode
  show?: boolean
  className?: string
}

const Modal = ({
  idModal,
  isOpen: isOpenModal,
  hide,
  // modalContent,
  // headerText,
  children,
  // className,
  size,
  isExpanded,
  hideOutside,
}: ModalProps): any => {
  const { isOpen, closeModal, getProps, isExpanded: isExp } = useModal(idModal)

  const { screenWidth } = useResize()
  const [modalProp, setModalProp] = useState<ModalPropsHook>()

  useEffect(() => {
    const props = getProps(idModal)
    if (props) setModalProp(props)
  }, [getProps])

  useEffect(() => {
    isOpenModal || isOpen(idModal)
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Escape':
          if (hide) hide()
          else closeModal(idModal)
          break
        default:
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', onKeyDown, false)
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown, false)
    }
  }, [isOpenModal, isOpen])

  const close = () => {
    if (!hideOutside) return
    if (hide) hide()
    else closeModal(idModal)
  }

  const [expandir, setExpandir] = useState(false)
  useEffect(() => {
    if (modalProp) {
      setTimeout(() => {
        setExpandir(modalProp.isExpanded)
      }, 220)
    }
  }, [modalProp])

  const modal = (
    <>
      <Wrapper
        aria-modal
        style={{ overflow: expandir ? 'hidden' : 'auto' }}
        tabIndex={-1}
        role="dialog"
        onClick={close}>
        <Scrollbar widthThumb={10} disable={isExpanded}>
          <ReactFocusLock
            className={`modal-dialog-centered modal-dialog ${size} ${
              isExpanded ? 'modal-expand' : 'modal-normal'
            } ${idModal}`}>
            <StyledModal
              className="modal-content"
              onClick={e => e.stopPropagation()}>
              {children}
            </StyledModal>
          </ReactFocusLock>
        </Scrollbar>
      </Wrapper>

      <Backdrop className="modal-backdrop-component" />
      <ToastContainerStyled
        position="top-center"
        autoClose={toastTimeDefault}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        role="alert"
        enableMultiContainer
        containerId={TOAST_CONTAINER.modal}
      />
    </>
  )
  return ReactDOM.createPortal(modal, document.body)
}

export const ModalRender: React.FC<ModalRenderProps> = ({
  idModal,
  children,
  show,
  className = 'modal',
}) => {
  const { isOpen } = useModal(idModal)

  return (
    <CSSTransition
      classNames={className}
      className={className}
      timeout={500}
      unmountOnExit
      // onEnter={() => }
      // onExited={() => }
      in={show || isOpen(idModal)}>
      {children}
    </CSSTransition>
  )
}

type ModalHeaderProps = {
  title?: string
  idModal: ModalEnum
  isExpanded?: boolean
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  idModal,
  isExpanded,
}) => {
  const {
    closeModal,
    toggleExpand,
    getProps,
    isExpanded: isExp,
  } = useModal(idModal)
  const ref = React.useRef<HTMLElement>()
  const updateTransform = transformStr => {
    ref.current.style.transform = transformStr
  }
  const [modalProp, setModalProp] = useState<ModalPropsHook>()

  useEffect(() => {
    ref.current = document.getElementsByClassName(idModal)[0] as HTMLElement
  }, [])

  useEffect(() => {
    const props = getProps(idModal)
    if (props) setModalProp(props)
  }, [getProps])

  return (
    <DragM updateTransform={updateTransform}>
      <HeaderStyled className="modal-header">
        <div>
          <img
            src="/img/icon_vtech.svg"
            alt="VTech Consultoria"
            width="24px"
            height="24px"
            // loading="eager"
          />
          <h6 className="modal-title">{title}</h6>
        </div>
        {modalProp?.showButtonExpand && (
          <button
            className="btn-sm ms-auto btn-expand-modal"
            onClick={() => toggleExpand(idModal)}>
            {!isExp ? <BsArrowsAngleExpand /> : <BsArrowsAngleContract />}
          </button>
        )}
        <button
          className="btn-modal-close btn-sm ms-0"
          onClick={() => {
            closeModal(idModal)
          }}>
          <IoCloseSharp />
        </button>
      </HeaderStyled>
    </DragM>
  )
}

type ModalFooterProps = {
  className?: string
}
export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
}) => {
  return (
    <FooterStyled className={`modal-footer ${className}`}>
      {children}
    </FooterStyled>
  )
}

export default Modal
