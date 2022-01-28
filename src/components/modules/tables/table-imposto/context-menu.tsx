import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/impostoService'
import {
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Imposto } from '../../../../types/models/imposto'
import { alertDeleteSuccess, alertError } from '../../../elements/alert'

const ContextMenuImposto = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const { openModal } = useModal<Imposto>(ModalEnum.createImposto)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuImposto,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<Imposto>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const imposto: Imposto = props.data.original

      const action = event.currentTarget.id as ActionEnum
      switch (action) {
        case ActionEnum.update:
          openModal(ModalEnum.createImposto, imposto, {
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
                if (onItemClick) onItemClick<Imposto>(action, imposto)
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break
        case ActionEnum.read:
          openModal(ModalEnum.createImposto, imposto)
          break
      }
    },
    [onItemClick]
  )

  const contextMenuItems = useMemo<ContextMenuItem<Imposto, any>[]>(
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
    [onItemClick]
  )

  return {
    idContextMenu: ContextMenuEnum.menuImposto,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuImposto
