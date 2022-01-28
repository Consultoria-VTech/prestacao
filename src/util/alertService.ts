import Alert from '../components/elements/alert'
import { TOAST_CONTAINER } from './constants'

export const AlertService = (title: string, message?: string): void => {
  Alert({
    title,
    body: message,
    type: 'dark',
    option: {
      containerId: TOAST_CONTAINER.app,
    },
  })
}
