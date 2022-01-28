import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/parametrosCobrancaService'
import {
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ParametrosCobranca } from '../../../../types/models/parametrosCobranca'
import { formatDecimal } from '../../../../util/stringUtil'
import { alertDeleteSuccess, alertError } from '../../../elements/alert'

const ContextMenuParametrosCobranca = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const { openModal } = useModal<ParametrosCobranca>(
    ModalEnum.createParametroCobranca
  )

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuParametroCobranca,
  })

  const displayMenu = ({
    e,
    data,
  }: DisplayMenuProps<Row<ParametrosCobranca>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const parametro: ParametrosCobranca = props.data.original
      parametro.taxa = formatDecimal(parametro.taxa as number, 2)
      parametro.tipo = parametro.tipo ? 1 : 0

      const action = event.currentTarget.id as ActionEnum
      switch (action) {
        case ActionEnum.update:
          // setClienteSelecionado(props.data.original)
          openModal(ModalEnum.createParametroCobranca, parametro, {
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
                  onItemClick<ParametrosCobranca>(action, parametro)
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break
        case ActionEnum.read:
          openModal(ModalEnum.createParametroCobranca, parametro)
          break
      }
    },
    [onItemClick]
  )

  const contextMenuItems = useMemo<ContextMenuItem<ParametrosCobranca, any>[]>(
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
    idContextMenu: ContextMenuEnum.menuParametroCobranca,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuParametrosCobranca
