import { TOAST_CONTAINER } from '@utils'
import Router from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { useContextMenu } from 'react-contexify'
import { Row } from 'react-table'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import {
  alterarSituacao,
  deletar,
  gerarpdf,
} from '../../../../services/prestacaoContasService'
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
  PrestacaoContas,
  PrestacaoContasSituacaoEnum,
  PrestacaoContasTipoEnum,
} from '../../../../types/models/prestacaoContas'
import Alert, {
  alertDeleteSuccess,
  alertError,
  alertUpdateSuccess,
} from '../../../elements/alert/index'
import { donwloadFile, getFilename } from '@utils'

type ContextMenuPrestacaoContasProps<T = any> = ContextMenuCustomProps<T> & {
  tipo: PrestacaoContasTipoEnum
}

const ContextMenuPrestacaoContas = <T extends object = any>({
  onItemClick,
  tipo,
}: ContextMenuPrestacaoContasProps<T>): ContextMenuData<T> => {
  const [teste, setTeste] = useState(false)
  const idModal = ModalEnum.createPrestacaoContas
  const { openModal } = useModal<PrestacaoContas>(idModal)

  const { show } = useContextMenu({
    id: ContextMenuEnum.menuPrestacaoContas,
  })

  function prestSituacaoContexMenu(data){
    const prestContas: PrestacaoContas = data
    return prestContas.situacao === PrestacaoContasSituacaoEnum.Aberto
  }

  const displayMenu = ({ e, data }: DisplayMenuProps<Row<PrestacaoContas>>) => {
    setTeste(prestSituacaoContexMenu(data))
    show(e, { props: { id: Number(data.index), data } }) 
  }
  
  const handleItemClick = useCallback(
    async ({ event, props }) => {
      const prestacaoContas: PrestacaoContas = props.data.original
      const action = event.currentTarget.id as
        | ActionEnum
        | 'despesas'
        | 'pagar'
        | 'enviar'
        | 'gerar'
      switch (action) {
        case 'despesas':
          Router.push(
            `/gestao/cadastros/prestacaocontas/${prestacaoContas.id}/despesas`
          )
          break
        case 'enviar':
          if (prestacaoContas.situacao !== PrestacaoContasSituacaoEnum.Aberto) {
            Alert({
              type: 'warning',
              title: 'Atenção',
              body: 'Apenas prestações na situação aberta podem ser enviadas para aprovação!',
              option: {
                containerId: TOAST_CONTAINER.app,
              },
            })

            return
          }

          const resultEnvio = confirm(
            'Realmente enviar a prestação para aprovação?'
          )

          if (resultEnvio === true) {
            await alterarSituacao(
              prestacaoContas.id,
              PrestacaoContasSituacaoEnum.AprovacaoAdministrador
            )
              .then(data => {
                alertUpdateSuccess(
                  TOAST_CONTAINER.app,
                  'Registro atualizado com sucesso!'
                )
                if (onItemClick)
                  onItemClick<PrestacaoContas>(action, data as PrestacaoContas)
              })
              .catch((e: ErrorData) => alertError(e))
          }

          break
        case ActionEnum.update:
          if (prestacaoContas.situacao !== PrestacaoContasSituacaoEnum.Aberto) {
            Alert({
              type: 'warning',
              title: 'Atenção',
              body: 'Apenas prestações na situação aberta podem ser alteradas!',
              option: {
                containerId: TOAST_CONTAINER.app,
              },
            })

            return
          }
          else {
          openModal(idModal, prestacaoContas, {
            action: 'update',
          })
        }
          break
        case ActionEnum.delete:
          // eslint-disable-next-line no-case-declarations
          if (prestacaoContas.situacao !== PrestacaoContasSituacaoEnum.Aberto) {
            Alert({
              type: 'warning',
              title: 'Atenção',
              body: 'Apenas prestações na situação aberta podem ser deletadas!',
              option: {
                containerId: TOAST_CONTAINER.app,
              },
            })

            return
          }
          else {
          const result = confirm('Realmente deseja excluir o registro?')
          if (result === true) {
            await deletar(props.data.original)
              .then(() => {
                alertDeleteSuccess()
                if (onItemClick)
                  onItemClick<PrestacaoContas>(action, prestacaoContas)
              })
              .catch((e: ErrorData) => alertError(e))
          }
        }
          break
        case ActionEnum.read:
          openModal(idModal, prestacaoContas)
          break  
        case 'gerar':
          const res = confirm(
            'Realmente gostaria de gerar o PDF?'
          )
          if (res === true) {
            Alert({
              title: 'Informação',
              body: 'O download será iniciado em alguns segundos',
              type: 'info',
              option: { containerId: TOAST_CONTAINER.app },
            })
  
            await gerarpdf(prestacaoContas).then(
              res => {
                const filename = getFilename(res.headers)
                donwloadFile([res.data], filename)
              }
            )
          }
        break
        case 'pagar':
          if (prestacaoContas.situacao !== PrestacaoContasSituacaoEnum.Aprovado) {
            Alert({
              type: 'warning',
              title: 'Atenção',
              body: 'Apenas prestações aprovadas poderam ser pagas!',
              option: {
                containerId: TOAST_CONTAINER.app,
              },
            })

            return
          }

          const resultPg = confirm(
            'Realmente alterar situação para Paga?'
          )

          if (resultPg === true) {
            await alterarSituacao(
              prestacaoContas.id,
              PrestacaoContasSituacaoEnum.Finalizado
            )
              .then(data => {
                alertUpdateSuccess(
                  TOAST_CONTAINER.app,
                  'Registro atualizado com sucesso!'
                )
                if (onItemClick)
                  onItemClick<PrestacaoContas>(action, data as PrestacaoContas)
              })
              .catch((e: ErrorData) => alertError(e))
          }
          break  
    }
    },
    [onItemClick]
  )
  const contextMenuItems = useMemo<
    ContextMenuItem<PrestacaoContas, any>[]
    >(() => {
    if (tipo === PrestacaoContasTipoEnum.AprovacaoFinanceira) {
      return [
        {
          id: 'pagar',
          onClick: handleItemClick,
          title: 'Marcar como Pago',
        },
        {
          id: 'gerar',
          onClick: handleItemClick,
          title: 'Gerar PDF',
        },
        {
          id: ActionEnum.read,
          onClick: handleItemClick,
          title: 'Consultar',
        },
      ]
    }

    const array = [ 
      {
        id: 'despesas',
        onClick: handleItemClick,
        title:
          tipo === PrestacaoContasTipoEnum.MinhasPrestacoes
            ? 'Despesas'
            : 'Aprovar',
      },
      {
        id: 'enviar',
        onClick: handleItemClick,
        title: 'Enviar para aprovação',
      },
      {
        id: 'gerar',
        onClick: handleItemClick,
        title: 'Gerar PDF',
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
      }
    ]

    if (tipo === PrestacaoContasTipoEnum.AprovacaoAdministrador) {
      return array.filter
      (p => p.id !== 'enviar' && 
      p.id !== ActionEnum.update &&
      p.id !== ActionEnum.delete
      ) 
    }

    if (tipo === PrestacaoContasTipoEnum.MinhasPrestacoes) {
        return array.filter(p => p.id !== 'gerar') 
    }
    
    return array
  }, [onItemClick, tipo])

  return {   
    idContextMenu: ContextMenuEnum.menuPrestacaoContas,
    items: contextMenuItems,
    displayMenu,
  }
}

export default ContextMenuPrestacaoContas