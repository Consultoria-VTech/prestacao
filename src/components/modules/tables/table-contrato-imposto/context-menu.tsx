import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/contratoImpostoService'
import {
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Contrato } from '../../../../types/models/contrato'
import { ContratoImposto } from '../../../../types/models/contratoImposto'
import { formatDecimal } from '../../../../util/stringUtil'
import { alertDeleteSuccess, alertError } from '../../../elements/alert/index'

const ContextMenuContratoImposto = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const idModal = ModalEnum.createContratoImposto

  const { openModal } = useModal<Contrato>(idModal)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuContratoImposto,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<Contrato>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const contrato: ContratoImposto = props.data.original
      contrato.percentual = formatDecimal(contrato.percentual as number, 2)

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
                if (onItemClick) onItemClick<ContratoImposto>(action, contrato)
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

  const contextMenuItems = useMemo<ContextMenuItem<ContratoImposto, any>[]>(
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
    idContextMenu: ContextMenuEnum.menuContratoImposto,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuContratoImposto
