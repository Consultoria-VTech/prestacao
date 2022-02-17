import Router from 'next/router'
import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/contratoService'
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
import { formatDecimal } from '../../../../util/stringUtil'
import { alertDeleteSuccess, alertError } from '../../../elements/alert/index'

const ContextMenuContrato = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const idModal = ModalEnum.createContrato

  const { openModal } = useModal<Contrato>(idModal)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuContrato,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<Contrato>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const contrato: Contrato = props.data.original
      contrato.valor = formatDecimal(contrato.valor as number, 2)

      const action = event.currentTarget.id as
        | ActionEnum
        | 'responsaveis'
        | 'impostos'
        | 'gerarParcelas'
      switch (action) {
        case 'responsaveis':
          Router.push(`/gestao/cadastros/contratos/${contrato.id}/responsaveis`)
          break
        case 'impostos':
          Router.push(`/gestao/cadastros/contratos/${contrato.id}/impostos`)
          break
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
                if (onItemClick) onItemClick<Contrato>(action, contrato)
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break
          case 'gerarParcelas':
            openModal(ModalEnum.gerarParcelasContrato, contrato, {
              action: 'update',
            })
            break
        case ActionEnum.read:
          openModal(idModal, contrato)
          break
      }
    },
    [onItemClick]
  )

  const contextMenuItems = useMemo<ContextMenuItem<Contrato, any>[]>(
    () => [
      {
        id: 'impostos',
        onClick: handleItemClick,
        title: 'Alíquota',
      },
      {
        id: 'responsaveis',
        onClick: handleItemClick,
        title: 'Responsáveis',
      },
      {
        id: 'gerarParcelas',
        onClick: handleItemClick,
        title: 'Gerar Parcelas',
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
    idContextMenu: ContextMenuEnum.menuContrato,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuContrato
