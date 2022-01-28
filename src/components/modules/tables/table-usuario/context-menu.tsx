import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/usuarioService'
import {
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Usuario } from '../../../../types/models/usuario'
import { alertDeleteSuccess, alertError } from '../../../elements/alert'

const ContextMenuUsuario = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const { openModal } = useModal<Usuario>(ModalEnum.createUsuario)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuUsuario,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<Usuario>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const usuario: Usuario = props.data.original

      const action = event.currentTarget.id as ActionEnum
      switch (action) {
        case ActionEnum.update:
          openModal(ModalEnum.createUsuario, usuario, {
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
                if (onItemClick) onItemClick<Usuario>(action, usuario)
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break
        case ActionEnum.read:
          openModal(ModalEnum.createUsuario, usuario)
          break
      }
    },
    [onItemClick]
  )

  const contextMenuItems = useMemo<ContextMenuItem<Usuario, any>[]>(
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
    idContextMenu: ContextMenuEnum.menuUsuario,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuUsuario