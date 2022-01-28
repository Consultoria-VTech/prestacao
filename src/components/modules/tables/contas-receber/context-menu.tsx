import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { deletar } from '../../../../services/contasReceberService'
import {
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ContasReceber } from '../../../../types/models/contasReceber'
import { TOAST_CONTAINER } from '../../../../util/constants'
import { formatDecimal } from '../../../../util/stringUtil'
import { alertDeleteSuccess, alertError } from '../../../elements/alert'
import { baixarComprovanteContasReceber } from './../../../../services/contasReceberService'
import { donwloadFile } from './../../../../util/downloadFile'
import { getFilename } from './../../../../util/getResponseHeaderValue'
import Alert from './../../../elements/alert/index'
import { useAuth } from '../../../../context/authContext'

const ContextMenuContasReceber = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const idModal = ModalEnum.createContasReceber
  const { user } = useAuth()
  const { openModal } = useModal<ContasReceber>(idModal)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuContasReceber,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<ContasReceber>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      try {
        const contaReceber: ContasReceber = props.data.original
        contaReceber.valor = formatDecimal(contaReceber.valor as number, 2)
        const action = event.currentTarget.id as string
        switch (action) {
          case ActionEnum.update:
            openModal(idModal, contaReceber, {
              action: 'update',
            })
            break
          case ActionEnum.delete:
            // eslint-disable-next-line no-case-declarations
            const result = confirm('Realmente deseja excluir o registro?')
            if (result === true) {
              await deletar(props.data.original, user.empresa.id)
                .then(() => {
                  alertDeleteSuccess()
                  if (onItemClick)
                    onItemClick<ContasReceber>(action, contaReceber)
                })
                .catch((e: ErrorData) => alertError(e))
            }
            break
          case ActionEnum.read:
            openModal(idModal, contaReceber)
            break
          case 'receber':
            openModal(ModalEnum.baixarContasReceber, contaReceber, {
              action: 'update',
            })
            break
          case 'renegociar':
            openModal(ModalEnum.renegociarContasReceber, contaReceber, {
              action: 'update',
            })
            break
          case 'baixar':
            if (!contaReceber.possuiComprovante) {
              Alert({
                title: 'Informação',
                body: 'A conta a receber não possui comprovante para download',
                type: 'info',
                option: { containerId: TOAST_CONTAINER.app },
              })
              return
            }

            Alert({
              title: 'Informação',
              body: 'O download será iniciado em alguns segundos',
              type: 'info',
              option: { containerId: TOAST_CONTAINER.app },
            })

            await baixarComprovanteContasReceber(contaReceber.id).then(res => {
              const filename = getFilename(res.headers)
              donwloadFile([res.data], filename)
            })
            break
        }
      } catch (e) {
        Alert({
          title: 'Erro inesperado',
          body: e.message,
          type: 'error',
          option: { containerId: TOAST_CONTAINER.app },
        })
      }
    },
    [onItemClick]
  )

  const contextMenuItems = useMemo<ContextMenuItem<ContasReceber, any>[]>(
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
      // {
      //   id: 'receber',
      //   onClick: handleItemClick,
      //   title: 'Baixar conta',
      // },
      {
        id: 'renegociar',
        onClick: handleItemClick,
        title: 'Renegociar título',
      },
      {
        id: 'baixar',
        onClick: handleItemClick,
        title: 'Baixar comprovante',
      },
    ],
    [onItemClick]
  )

  return {
    idContextMenu: ContextMenuEnum.menuContasReceber,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuContasReceber
