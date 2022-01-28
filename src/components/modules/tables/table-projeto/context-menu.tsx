import Router from 'next/router'
import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/projetoService'
import {
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Projeto } from '../../../../types/models/projeto'
import { formatDecimal } from '../../../../util/stringUtil'
import { alertDeleteSuccess, alertError } from '../../../elements/alert/index'

const ContextMenuProjeto = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const idModal = ModalEnum.createProjeto

  const { openModal } = useModal<Projeto>(idModal)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuProjeto,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<Projeto>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const projeto: Projeto = props.data.original
      projeto.limiteKm = formatDecimal(projeto.limiteKm as number, 2)
      projeto.limiteAlmoco = formatDecimal(projeto.limiteAlmoco as number, 2)

      const action = event.currentTarget.id as ActionEnum | 'responsaveis'
      switch (action) {
        case 'responsaveis':
          Router.push(`/gestao/cadastros/projetos/${projeto.id}/responsaveis`)
          break

        case ActionEnum.update:
          openModal(idModal, projeto, {
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
                if (onItemClick) onItemClick<Projeto>(action, projeto)
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break
        case ActionEnum.read:
          openModal(idModal, projeto)
          break
      }
    },
    [onItemClick]
  )

  const contextMenuItems = useMemo<ContextMenuItem<Projeto, any>[]>(
    () => [
      {
        id: 'responsaveis',
        onClick: handleItemClick,
        title: 'Responsáveis',
      },
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
    idContextMenu: ContextMenuEnum.menuProjeto,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuProjeto