import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/funcionarioService'
import {
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Funcionario } from '../../../../types/models/funcionario'
import {
  formatCep,
  formatCpfCnpj,
  formatDecimal,
  formatTelephone,
} from '../../../../util/stringUtil'
import { alertDeleteSuccess, alertError } from '../../../elements/alert'

const ContextMenuFuncionario = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const { openModal } = useModal<Funcionario>(ModalEnum.createFuncionario)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuFuncionario,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<Funcionario>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const original: Funcionario = props.data.original
      const funcionario: Funcionario = {
        ...props.data.original,
        cpf: formatCpfCnpj(original.cpf),
        cep: formatCep(original.cep),
        telefone: formatTelephone(original.telefone),
        fator: formatDecimal(original.fator as number, 2),
      }

      const action = event.currentTarget.id as ActionEnum
      switch (action) {
        case ActionEnum.update:
          openModal(ModalEnum.createFuncionario, funcionario, {
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
                if (onItemClick) onItemClick<Funcionario>(action, funcionario)
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break
        case ActionEnum.read:
          openModal(ModalEnum.createFuncionario, funcionario)
          break
      }
    },
    [onItemClick]
  )

  const contextMenuItems = useMemo<ContextMenuItem<Funcionario, any>[]>(
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
    idContextMenu: ContextMenuEnum.menuFuncionario,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuFuncionario
