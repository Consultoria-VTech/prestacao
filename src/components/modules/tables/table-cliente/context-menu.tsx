import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/clienteService'
import {
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Cliente } from '../../../../types/models/cliente'
import {
  formatCep,
  formatCpfCnpj,
  formatTelephone,
} from '../../../../util/stringUtil'
import { alertDeleteSuccess, alertError } from '../../../elements/alert'

const ContextMenuCliente = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const { openModal } = useModal<Cliente>(ModalEnum.createCliente)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuCliente,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<Cliente>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const original: Cliente = props.data.original
      const cliente: Cliente = {
        ...props.data.original,
        cnpj: formatCpfCnpj(original.cnpj),
        cep: formatCep(original.cep),
        telefone: formatTelephone(original.telefone),
        telefone2: formatTelephone(original?.telefone2),
        telefone3: formatTelephone(original?.telefone3),
      }

      const action = event.currentTarget.id as ActionEnum
      switch (action) {
        case ActionEnum.update:
          // setClienteSelecionado(props.data.original)
          openModal(ModalEnum.createCliente, cliente, {
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
                if (onItemClick) onItemClick<Cliente>(action, cliente)
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break
        case ActionEnum.read:
          openModal(ModalEnum.createCliente, cliente)
          break
      }
    },
    [onItemClick]
  )

  const contextMenuItems = useMemo<ContextMenuItem<Cliente, any>[]>(
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
    idContextMenu: ContextMenuEnum.menuCliente,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuCliente
