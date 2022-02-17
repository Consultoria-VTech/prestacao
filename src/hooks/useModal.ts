import { useEffect, useState } from 'react'
import ManagerModal from '../services/managerModal'

export type ModalAction =
  | 'create'
  | 'update'
  | 'read'
  | 'delete'
  | 'filter'
  | 'aprovar'
  | null
export type ModalProps = {
  isExpanded?: boolean
  toggleExpand?: (id?: string | undefined) => ModalProps | void
  getProps?: (id?: string | undefined) => ModalProps
  showButtonExpand?: boolean
  showButtonClose?: boolean
  closeOutside?: boolean
  size?: 'sm' | 'md' | 'lg'
  action?: ModalAction
  updateComponent?: () => void
}

type ModalData<T> = ModalProps & {
  openModal: <D extends T = T>(
    // eslint-disable-next-line no-unused-vars
    id?: string | undefined,
    // eslint-disable-next-line no-unused-vars
    data?: D,
    // eslint-disable-next-line no-unused-vars
    props?: ModalProps,
    // eslint-disable-next-line no-unused-vars
    closeOther?: boolean
  ) => void
  // eslint-disable-next-line no-unused-vars
  closeModal: <D extends T = T>(id?: string | undefined, data?: D) => void
  // eslint-disable-next-line no-unused-vars
  isOpen: (id?: string | undefined) => boolean

  getActionDescription: (id?: string | undefined) => string

  getAction?: (id?: string | undefined) => ModalAction
  // eslint-disable-next-line no-unused-vars
  getData: <D extends T = T>(id?: string | undefined) => D | null
}

export const managerModal = new ManagerModal()

const modalError = (methodName: string) =>
  new Error(
    `É obrigatório informar um id para a modal. Excesão no método ${methodName}.`
  )

const defaultModalProps: Omit<ModalProps, 'cod'> = {
  isExpanded: false,
  showButtonExpand: true,
  showButtonClose: true,
  closeOutside: true,
  size: 'md',
  action: 'read',
}

export const useModalManager = <T>(
  modalManager: ManagerModal,
  id: string,
  defaultProps = defaultModalProps
): ModalData<T> => {

  const idModal = id
  const [, update] = useState<number>(0)
  const [props, setProps] = useState<ModalProps>(defaultProps)
  const [, updateComponent] = useState(Math.random())

  defaultProps.updateComponent = () => {
    updateComponent(Math.random())
  }

  useEffect(() => {
    const subscriberCb = () => {
      update(Math.random())
    }
    if (id) {
      modalManager.addModal(id, null, defaultProps)
      modalManager.addSubscriber(id, subscriberCb)
    }
    return () => {
      if (id) {
        modalManager.removeSubscriber(id, subscriberCb)
      }
    }
  }, [id])

  return {
    openModal: <D extends T = T>(id = idModal, data: D, props, closeOther) => {
      if (!id) throw modalError('openModal')

      const newProps = modalManager.openModal(
        id,
        data,
        { ...defaultProps, ...props },
        closeOther
      )
      setProps(newProps)
    },
    closeModal: <D extends T = T>(id = idModal, data: D) => {
      if (!id) throw modalError('closeModal')

      modalManager.closeModal(id, data)
    },
    isOpen: (id = idModal): boolean => {
      if (!id) throw modalError('isOpen')
      return modalManager.isOpen(id)
    },
    getData: <D extends T = T>(id = idModal): D => {
      if (!id) throw modalError('getData')
      return modalManager.getData<D>(id)
    },

    getAction: (id = idModal): ModalAction => {
      if (!id) throw modalError('getAction')

      return modalManager.getAction(id)
    },

    getActionDescription: (id = idModal): string => {
      if (!id) throw modalError('getActionDescription')

      const action: ModalAction = modalManager.getAction(id)

      switch (action) {
        case 'create':
          return 'Cadastrar'
        case 'read':
          return 'Consultar'
        case 'update':
          return 'Alterar'
        case 'delete':
          return 'Excluir'
        case 'filter':
          return 'Filtrar'
        default:
          return ''
      }
    },

    ...props,
    toggleExpand: (id = idModal) => {
      if (!id) throw modalError('toggleExpand')
      const newProps = modalManager.toggleExpand(id)
      setProps(newProps)
    },
    getProps: (id = idModal): ModalProps => {
      if (!id) throw modalError('getProps')

      return modalManager.getProps(id)
    },
  }
}

export const useModal = <T>(id?: string, props?: ModalProps): ModalData<T> => {
  const data = useModalManager<T>(managerModal, id, props)
  return data
}