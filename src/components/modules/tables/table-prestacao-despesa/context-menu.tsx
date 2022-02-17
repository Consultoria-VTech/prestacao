import { PrestacaoContasSituacaoEnum } from '@types'
import { donwloadFile, getFilename, TOAST_CONTAINER } from '@utils'
import { useCallback, useMemo } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import {
  baixarComprovantePrestacaoDespesa,
  deletar,
} from '../../../../services/prestacaoDespesaService'
import {
  ContextMenuCustomProps,
  ContextMenuData,
  ContextMenuItem,
  DisplayMenuProps,
} from '../../../../types/context-menu'
import { ActionEnum } from '../../../../types/enum/actionEnum'
import { ContextMenuEnum } from '../../../../types/enum/contextMenuEnum'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import {
  PrestacaoDespesa,
  PrestacaoDespesaStatus,
} from '../../../../types/models/prestacaoDespesa'
import Alert, {
  alertDeleteSuccess,
  alertError,
} from '../../../elements/alert/index'
import { useAuth } from '@context'

type ContextMenuPrestacaoDespesaProps<T = any> = ContextMenuCustomProps<T> & {
  tipo?: PrestacaoContasSituacaoEnum,
  onItemClick?: <D = T>(id: ActionEnum | string, data: D) => void
}


const ContextMenuPrestacaoDespesa = <T extends object = any>({
  onItemClick,
  tipo,
}: ContextMenuPrestacaoDespesaProps<T>): ContextMenuData<T> => {
  const idModal = ModalEnum.createPrestacaoDespesa

  const { openModal } = useModal<PrestacaoDespesa>(idModal)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuPrestacaoDespesa,
  })

  const { user } = useAuth()

  const displayMenu = ({
    e,
    data,
  }: DisplayMenuProps<Row<PrestacaoDespesa>>) => {
    show(e, { props: { id: Number(data.index), data } })
  }

  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const prestacaoDespesa: PrestacaoDespesa = props.data.original

      const action = event.currentTarget.id as ActionEnum | 'baixar' | 'aprovar'
      if (
        prestacaoDespesa.prestacaoContas?.situacao !==
          PrestacaoContasSituacaoEnum.Aberto &&
        (action === ActionEnum.delete || action === ActionEnum.update)
      ) {
        Alert({
          type: 'warning',
          title: 'Atenção',
          body: 'A situação da prestação não permite alteração ou exclusão!',
          option: {
            containerId: TOAST_CONTAINER.app,
          },
        })
        return
      }
      if (
        prestacaoDespesa.status !== PrestacaoDespesaStatus.Aberta &&
        prestacaoDespesa.status !== PrestacaoDespesaStatus.Reprovado &&
        prestacaoDespesa.status !== PrestacaoDespesaStatus.Aprovado &&
        action === 'aprovar'
      ) {
        Alert({
          type: 'warning',
          title: 'Atenção',
          body: 'A situação da despesa não permite aprovação / reprovação!',
          option: {
            containerId: TOAST_CONTAINER.app,
          },
        })

        return
      }
      switch (action) {
        case 'aprovar':
          openModal(idModal, prestacaoDespesa, {
            action: 'aprovar',
          })
          break
        case ActionEnum.update:
          openModal(idModal, prestacaoDespesa, {
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
                  onItemClick<PrestacaoDespesa>(action, prestacaoDespesa)
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break
        case ActionEnum.read:
          openModal(idModal, prestacaoDespesa)
          break
        case 'baixar':
          Alert({
            title: 'Informação',
            body: 'O download será iniciado em alguns segundos',
            type: 'info',
            option: { containerId: TOAST_CONTAINER.app },
          })

          
          await baixarComprovantePrestacaoDespesa(prestacaoDespesa.id).then(
            res => {
              const filename = getFilename(res.headers)
              donwloadFile([res.data], filename)
            }
          )
          break
      }
    },
    [onItemClick]
  )

  const contextMenuItems = useMemo<
    ContextMenuItem<PrestacaoDespesa, any>[]
  >(() => {
    const array = [
      {
        id: 'aprovar',
        onClick: handleItemClick,
        title: 'Aprovar / Reprovar',
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
      {
        id: 'baixar',
        onClick: handleItemClick,
        title: 'Baixar comprovante',
      },
    ]


    if (tipo !== PrestacaoContasSituacaoEnum.Aberto && 
      tipo !== PrestacaoContasSituacaoEnum.Reprovado &&
      tipo !== PrestacaoContasSituacaoEnum.Finalizado &&
      tipo !== PrestacaoContasSituacaoEnum.AprovacaoAdministrador)
      {   
        return array.filter(
          p =>
            p.id !== 'aprovar' &&
            p.id !== ActionEnum.update &&
            p.id !== ActionEnum.delete
        )
      }

      if(tipo === PrestacaoContasSituacaoEnum.AprovacaoAdministrador)
      {
        if(user.usuarioTipo.idUsuarioTipo === 2){
          return array.filter(
            p =>
              p.id !== 'aprovar' &&
              p.id !== ActionEnum.update &&
              p.id !== ActionEnum.delete
          )
        }
        else{
          return array.filter(
            p =>
              p.id !== ActionEnum.update &&
              p.id !== ActionEnum.delete
          )
        }    
      }

      if(tipo === PrestacaoContasSituacaoEnum.Aberto)
      {
        return array.filter(
          p =>
            p.id !== 'aprovar'
        )
      }

      if(tipo === PrestacaoContasSituacaoEnum.Finalizado)
      {
        return array.filter(
          p =>
            p.id !== 'aprovar' &&
            p.id !== ActionEnum.update &&
            p.id !== ActionEnum.delete
        )
      }



    

    return array
  }, [onItemClick, tipo])

  return {
    idContextMenu: ContextMenuEnum.menuPrestacaoDespesa,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuPrestacaoDespesa