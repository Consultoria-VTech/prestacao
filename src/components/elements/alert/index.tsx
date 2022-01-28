import React from 'react'
import { toast, ToastContent, ToastOptions, TypeOptions } from 'react-toastify'
import { ErrorData } from '../../../services/api/api'
import {
  messageCreateSuccess,
  messageDeleteSuccess,
  messageUpdateSuccess,
  TOAST_CONTAINER,
} from '../../../util/constants'

type AlertProps = {
  type?: TypeOptions
  title?: string
  body?: string | React.ReactNode
  option?: ToastOptions
}

const optionsDefault: ToastOptions = {
  containerId: TOAST_CONTAINER.modal,
  autoClose: 3000,
}

const Alert = ({
  title,
  body,
  type = 'default',
  option = optionsDefault,
}: AlertProps): React.ReactText => {
  let toastAlert: (
    // eslint-disable-next-line no-unused-vars
    content: ToastContent,
    // eslint-disable-next-line no-unused-vars
    options?: ToastOptions | undefined
  ) => React.ReactText

  switch (type) {
    case 'success':
      toastAlert = toast.success
      break
    case 'info':
      toastAlert = toast.info
      break
    case 'error':
      toastAlert = toast.error
      break
    case 'warning':
      toastAlert = toast.warn
      break
    case 'dark':
      toastAlert = toast.dark
      break
    default:
      toastAlert = toast
      break
  }

  const content = (
    <div>
      {title && <h4 className="alert-title">{title}</h4>}
      {typeof body === 'string' ? (
        <span className="alert-body">{body}</span>
      ) : (
        body
      )}
    </div>
  )

  return toastAlert(content, option)
}

export const alertError = (
  error: ErrorData,
  containerId = TOAST_CONTAINER.app
): React.ReactText =>
  Alert({
    title: error?.message,
    body: error?.data,
    type: 'error',
    option: { containerId },
  })

export const alertCreateSuccess = (
  containerId = TOAST_CONTAINER.modal
): React.ReactText =>
  Alert({
    type: 'success',
    title: messageCreateSuccess,
    option: { containerId, autoClose: false },
  })

export const alertUpdateSuccess = (
  containerId = TOAST_CONTAINER.modal,
  message?: string
): React.ReactText =>
  Alert({
    type: 'success',
    title: message || messageUpdateSuccess,
    option: { containerId, autoClose: false },
  })

export const alertDeleteSuccess = (
  containerId = TOAST_CONTAINER.app
): React.ReactText =>
  Alert({
    type: 'success',
    title: messageDeleteSuccess,
    option: { containerId, autoClose: 2000, hideProgressBar: true },
  })

export const AlertContainerTemp: React.FC = () => (
  <div id="alert-container-temp" />
)

export default Alert
