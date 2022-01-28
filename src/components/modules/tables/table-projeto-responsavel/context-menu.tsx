import { useModal } from '@hooks'
import {
  ActionEnum,
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuEnum,
  ContextMenuItem,
  DisplayMenuProps,
  ModalEnum,
  Projeto,
  ProjetoResponsavel,
} from '@types'
import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { alertDeleteSuccess, alertError } from '~/components/elements'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/contratoResponsavelService'

const ContextMenuProjetoResponsavel = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const idModal = ModalEnum.createProjetoResponsavel

  const { openModal } = useModal<Projeto>(idModal)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuProjetoResponsavel,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<Projeto>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const contrato: ProjetoResponsavel = props.data.original

      const action = event.currentTarget.id
      switch (action) {
        case ActionEnum.update:
          openModal(idModal, contrato, {
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
                if (onItemClick)
                  onItemClick<ProjetoResponsavel>(action, contrato)
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break
        case ActionEnum.read:
          openModal(idModal, contrato)
          break
      }
    },
    [onItemClick]
  )

  const contextMenuItems = useMemo<ContextMenuItem<ProjetoResponsavel, any>[]>(
    () => [
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
    idContextMenu: ContextMenuEnum.menuProjetoResponsavel,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuProjetoResponsavel