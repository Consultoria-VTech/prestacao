import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import {
  baixarComprovanteContasPagar,
  deletar,
} from '../../../../services/contasPagarService'
import {
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ContasPagar } from '../../../../types/models/contasPagar'
import { TOAST_CONTAINER } from '../../../../util/constants'
import { donwloadFile } from '../../../../util/downloadFile'
import { formatDecimal } from '../../../../util/stringUtil'
import { alertDeleteSuccess, alertError } from '../../../elements/alert'
import { getFilename } from './../../../../util/getResponseHeaderValue'
import Alert from './../../../elements/alert/index'
import { useAuth } from '../../../../context/authContext'


const ContextMenuContasPagar = <T extends object = any>({
  onItemClick,
}: ContextMenuCustomProps<T>): ContextMenuData<T> => {
  const idModal = ModalEnum.createContasPagar
  const { user } = useAuth()
  const { openModal } = useModal<ContasPagar>(idModal)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuContasPagar,
  })

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<ContasPagar>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      try {
        const contaPagar: ContasPagar = props.data.original
        contaPagar.valor = formatDecimal(contaPagar.valor as number, 2)

        const action = event.currentTarget.id as string
        switch (action) {
          case ActionEnum.update:
            openModal(idModal, contaPagar, {
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
                  if (onItemClick) onItemClick<ContasPagar>(action, contaPagar)
                })
                .catch((e: ErrorData) => alertError(e))
            }
            break
          case ActionEnum.read:
            openModal(idModal, contaPagar)
            break
          case 'pagar':
            openModal(ModalEnum.baixarContasPagar, contaPagar, {
              action: 'update',
            })
            break
          case 'renegociar':
            openModal(ModalEnum.renegociarContasPagar, contaPagar, {
              action: 'update',
            })
            break
          case 'baixar':
            if (!contaPagar.possuiComprovante) {
              Alert({
                title: 'Informação',
                body: 'A conta a pagar não possui comprovante para download',
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

            await baixarComprovanteContasPagar(contaPagar.id).then(res => {
              const filename = getFilename(res.headers)
              donwloadFile([res.data], filename)
            })
            break
        }
      } catch (e) {
        console.log(e)
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

  const contextMenuItems = useMemo<ContextMenuItem<ContasPagar, any>[]>(
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
      //   id: 'pagar',
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
    idContextMenu: ContextMenuEnum.menuContasPagar,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuContasPagar
