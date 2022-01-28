import _findIndex from 'lodash/findIndex'
import { ModalAction, ModalProps } from '../hooks/useModal'
import { CallbackParams } from './callbackParams'

export interface Modal<T = any> {
  name: string
  defaultData?: T
  defaultProps?: ModalProps
}

export type ModalsList<T> = Modal<T>[]

export interface OpenModal<T> {
  name: string
  data: T
  props: ModalProps
}

export type OpenModalsList<T> = OpenModal<T>[]

export type Event =
  | 'afterOpen'
  | 'beforeOpen'
  | 'afterClose'
  | 'beforeClose'
  | 'clickExpand'

const ALLOWED_EVENTS: Event[] = [
  'afterOpen',
  'beforeOpen',
  'afterClose',
  'beforeClose',
  'clickExpand',
]

export type CallbackFunction<T = any> = (cbParams: CallbackParams<T>) => unknown

export type CallbackObject<T> = {
  callback: CallbackFunction<T>
  idModal: string
  idEvent: string
}

export type Callbacks<T> = {
  [key in Event]: CallbackObject<T>[]
}

export type Subscribers = {
  [key: string]: (() => void)[]
}

export default class ManagerModal<T = any> {
  modals: ModalsList<T> = []
  open: OpenModalsList<T> = []
  openTemp: OpenModalsList<T> = []
  subscribers: Subscribers = {}

  callbacks: Callbacks<T | Modal<T>> = {
    afterOpen: [],
    beforeOpen: [],
    afterClose: [],
    beforeClose: [],
    clickExpand: [],
  }

  // meta
  scrollPoint = 0

  /**
   * Register new modal
   */
  addModal<D extends T = T>(
    id: string,
    defaultData?: D,
    defaultProps?: ModalProps
  ): void {
    const modal = this.getModalByName(id)
    if (modal) return

    // AppCookies.set()
    this.modals.push({
      name: id,
      defaultData: defaultData,
      defaultProps: defaultProps,
    })
    this.subscribers[id] = []
  }

  /**
   * Remove modal with specific name
   */
  delModal(id: string): void {
    this.modals = this.modals.filter(m => m.name !== id)
    this.open = this.open.filter(m => m.name !== id)
    delete this.subscribers[id]
  }

  /**
   * Get registred modal
   * @param id {string} name of modal
   */
  getModalByName(id: string): Modal<T> | undefined {
    return this.modals.find(m => m.name === id)
  }

  toggleExpand(id: string): ModalProps {
    const modal = this.getModalByName(id)
    if (!modal) {
      throw new Error(`manager do not have modal '${id}'`)
    }

    const indexModal = _findIndex(this.modals, { name: id })
    modal.defaultProps.isExpanded = !modal.defaultProps.isExpanded
    this.modals.splice(indexModal, 1, modal)

    this.callbacks.clickExpand.forEach(cb =>
      cb.callback(new CallbackParams(id, modal))
    )
    return modal.defaultProps
  }

  /**
   * Open modal with specific name and close another modals if <closeOther> is true
   */
  openModal<D extends T = T>(
    id: string,
    data?: D,
    props?: ModalProps,
    closeOther = true
  ): ModalProps {
    const modal = this.getModalByName(id)
    if (!modal) {
      throw new Error(`manager do not have modal '${id}'`)
    }
    this.callbacks.beforeOpen.forEach(cb => cb.callback(new CallbackParams(id)))
    if (closeOther) {
      for (const openedModal of this.open) {
        this.closeModal(openedModal.name)
      }
    }

    // const indexModal = _findIndex(this.modals, { name: id })
    // modal.defaultProps.isExpanded = false
    // this.modals.splice(indexModal, 1, modal)

    const modalData = {
      name: modal.name,
      data: data || modal.defaultData,
      props: props || modal.defaultProps,
    }
    this.open.push(modalData)

    if (this.openTemp.filter(p => p.name === modal.name).length > 0) {
      this.openTemp = this.openTemp.filter(p => p.name !== modal.name)
      this.openTemp.push(modalData)
    } else {
      this.openTemp.push(modalData)
    }

    this.callSubscribers(id)
    this.callbacks.afterOpen.forEach(cb => cb.callback(new CallbackParams(id)))

    return props || modal.defaultProps
  }

  /*
   * Close the modal with specific name
   */
  closeModal<D extends T = T>(id: string, data?: D): void {
    const modal = this.getModalByName(id)
    if (!modal) {
      throw new Error(`manager do not have modal with name '${id}'`)
    }

    const beforeCloseValues = this.callbacks.beforeClose
      .filter(p => p.idModal === id)
      .map(cb => cb.callback(new CallbackParams(id, data)))

    if (beforeCloseValues?.filter(p => p === false)?.length > 0) {
      this.callSubscribers(id)
      return
    }
    this.open = this.open.filter(m => m.name !== id)
    this.callSubscribers(id)

    this.callbacks.afterClose
      .filter(p => p.idModal === id)
      .forEach(cb => cb.callback(new CallbackParams(id, data)))
  }

  /*
   * Define modal with name <id> is opened
   */
  isOpen<D extends T = T>(id: string): boolean {
    const openModal = this.open.find(m => m.name === id) as
      | OpenModal<D>
      | undefined
    return !!openModal
  }

  getAction(id: string): ModalAction {
    const openModal = this.open.find(m => m.name === id) as
      | OpenModal<T>
      | undefined
    const openModalTemp = this.openTemp.find(m => m.name === id) as
      | OpenModal<T>
      | undefined
    return openModal?.props?.action || openModalTemp?.props?.action || 'read'
  }

  /**
   * Get parameters of opened modal, if modal is closed result will be 'null'
   * @param id name of modal
   * @returns {Object|Null}
   */
  getData<D extends T = T>(id: string): D | null {
    const openModal = this.open.find(m => m.name === id) as
      | OpenModal<D>
      | undefined
    return openModal?.data || null
  }

  getProps(id: string): ModalProps {
    const openModal = this.open.find(m => m.name === id) as
      | OpenModal<T>
      | undefined
    return openModal?.props || null
  }

  /**
   * Register function for modal, that will call on change of this modal
   */
  addSubscriber(id: string, subscriber: () => unknown): void {
    this.subscribers[id].push(subscriber)
  }

  /**
   * Remove subscriber for specific modal
   * Note: if all subscribers for id are deleted, modal will be deleted
   */
  removeSubscriber(id: string, subscriber: () => unknown): void {
    this.subscribers[id] = this.subscribers[id].filter(s => s !== subscriber)
    // Delete modal if it do not have subscribers
    if (this.subscribers[id].length === 0) {
      this.delModal(id)
    }
  }

  /**
   * Call all registred subscribers for specific modal
   */
  private callSubscribers(id: string) {
    if (!Object.keys(this.subscribers).includes(id)) {
      throw new Error(`Subscribers for '${id} not defined'`)
    }
    for (const subscriber of this.subscribers[id]) {
      subscriber()
    }
  }

  /**
   * Register new callback for event
   */
  on<D extends T = T>(
    event: Event,
    callback: CallbackFunction<D>,
    idModal: string,
    idEvent: string
  ): void {
    if (!ALLOWED_EVENTS.includes(event)) {
      throw new Error(`Unknown event ${event}`)
    }

    this.remove(event, idModal, idEvent)
    this.callbacks[event].push({ callback, idModal, idEvent })
  }

  remove(event: Event, idModal: string, idEvent: string): void {
    if (!ALLOWED_EVENTS.includes(event)) {
      throw new Error(`Unknown event ${event}`)
    }

    if (
      this.callbacks[event].find(
        p => p.idModal === idModal && p.idEvent === idEvent
      )
    )
      this.callbacks[event] = this.callbacks[event].filter(
        p => p.idEvent !== idEvent
      )
  }
}
