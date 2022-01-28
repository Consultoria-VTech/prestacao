import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/timeSheetService'
import {
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { TimeSheet } from '../../../../types/models/timeSheet'
import { TOAST_CONTAINER } from '../../../../util/constants'
import { alertDeleteSuccess, alertError } from '../../../elements/alert'
import Alert from './../../../elements/alert/index'

const ContextMenuTimeSheet = <T extends object = any>(): ContextMenuData<T> => {
  const idModal = ModalEnum.createTimeSheet

  const { openModal } = useModal<TimeSheet>(idModal)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuTimeSheet,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<TimeSheet>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(async ({ event, props }) => {
    try {
      const timeSheet: TimeSheet = props.data.original

      const action = event.currentTarget.id as string
      switch (action) {
        case ActionEnum.update:
          openModal(idModal, timeSheet, {
            action: 'update',
          })
          break
        case ActionEnum.delete:
          // eslint-disable-next-line no-case-declarations
          const result = confirm('Realmente deseja excluir o registro?')
          if (result === true) {
            await deletar(props.data.original)
              .then(() => {
                alertDeleteSuccess()
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break
        case ActionEnum.read:
          openModal(idModal, timeSheet)
          break
      }
    } catch (e) {
      console.log(e)
      Alert({
        title: 'Erro inesperado',
        body: e.message,
        type: 'error',
        option: { containerId: TOAST_CONTAINER.app },
      })
    }
  }, [])

  const contextMenuItems = useMemo<ContextMenuItem<T, any>[]>(
    () => [
      {
        id: ActionEnum.update,
        onClick: handleItemClick,
        title: 'Alterar',
      },
      {
        id: ActionEnum.read,
        onClick: handleItemClick,
        title: 'Consultar',
      },
      {
        id: ActionEnum.delete,
        onClick: handleItemClick,
        title: 'Excluir',
      },
    ],
    []
  )

  return {
    idContextMenu: ContextMenuEnum.menuTimeSheet,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuTimeSheet