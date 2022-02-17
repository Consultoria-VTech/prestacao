import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/planoContasService'
import {
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { PlanoContas } from '../../../../types/models/planoContas'
import { alertDeleteSuccess, alertError } from '../../../elements/alert'

const ContextMenuPlanoContas = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const idModal = ModalEnum.createPlanoContas

  const { openModal } = useModal<PlanoContas>(idModal)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuPlanoContas,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<PlanoContas>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const planoContas: PlanoContas = props.data.original

      const action = event.currentTarget.id as ActionEnum
      switch (action) {
        case ActionEnum.update:
          openModal(idModal, planoContas, {
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
                if (onItemClick) onItemClick<PlanoContas>(action, planoContas)
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break
        case ActionEnum.read:
          openModal(idModal, planoContas)
          break
      }
    },
    [onItemClick]
  )

  const contextMenuItems = useMemo<ContextMenuItem<PlanoContas, any>[]>(
    () => [
      // {
      //   id: ActionEnum.update,
      //   onClick: handleItemClick,
      //   title: 'Alterar',
      // },
      {
        id: ActionEnum.read,
        onClick: handleItemClick,
        title: 'Consultar',
      },
      // {
      //   id: ActionEnum.delete,
      //   onClick: handleItemClick,
      //   title: 'Excluir',
      // },
    ],
    [onItemClick]
  )

  return {
    idContextMenu: ContextMenuEnum.menuPlanoContas,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuPlanoContas
