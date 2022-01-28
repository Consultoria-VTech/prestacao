/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react'
import TableConsultaContasPagar from '../../modules/tables/consulta-contas-pagar-conciliacao'
import TableConsultaContasReceber from './../../modules/tables/consulta-contas-receber-conciliacao'
import TableContasPagarConciliacao from '../../modules/tables/contas-pagar-conciliacao'
import TableContasReceberConciliacao from '../../modules/tables/contas-receber-conciliacao'
import {
  ModalCadastrarContasReceber,
  ModalBaixarContasReceber,
  ModalFiltrarContasReceber,
  ModalBaixarContasPagar,
  ModalCadastrarContasPagar,
  ModalFiltrarContasPagar,
  ModalEstornarContasPagar,
  ModalEstornarContasReceber,
} from '~/components/modules'
import { TemplateDefaultTable } from '../default'
import { TableDivStyle } from './styles'

export function ConciliacaoBancariaTemplate() {
  const [active, setActive] = useState({
    contasReceber: true,
    contasPagar: false,
    conciliar: false,
  })

  const [trocarAbas, settrocarAbas] = useState()

  function btnEvent(type) {
    if (type == 'contasReceber') {
      settrocarAbas('receber')
      setActive({
        ...active,
        contasReceber: !active.contasReceber,
        contasPagar: false,
        conciliar: false,
      })
    }

    if (type == 'contasPagar') {
      settrocarAbas('pagar')
      setActive({
        ...active,
        contasPagar: !active.contasPagar,
        contasReceber: false,
        conciliar: false,
      })
    }

    if (type == 'conciliar') {
      settrocarAbas('conciliar')
      setActive({
        ...active,
        conciliar: !active.conciliar,
        contasReceber: false,
        contasPagar: false,
      })
    }
  }
  return (
    <>
      <TableDivStyle>
        <div className="div-container">
          <div className="div-contas">
            <div className="titles-container">
              <button
                className={`btn-ContasReceber ${
                  active.contasReceber ? 'activeBtnCR' : ''
                }`}
                onClick={() => btnEvent('contasReceber')}>
                Contas a Receber
              </button>
              <button
                className={`btn-ContasPagar ${
                  active.contasPagar ? 'activeBtnCP' : ''
                }`}
                onClick={() => btnEvent('contasPagar')}>
                Contas a Pagar
              </button>
              <button
                className={`btn-Conciliar ${
                  active.conciliar ? 'activeBtnCO' : ''
                }`}
                onClick={() => btnEvent('conciliar')}>
                Conciliado
              </button>
            </div>
            <div
              className={`showTables ${active.contasReceber ? 'active' : ''}`}>
              <TemplateDefaultTable>
                <TableContasReceberConciliacao tab={trocarAbas} />
                <ModalCadastrarContasReceber />
                <ModalCadastrarContasReceber />
                <ModalFiltrarContasReceber />
                <ModalBaixarContasReceber />
              </TemplateDefaultTable>
            </div>
          </div>
          <div className="div-contas">
            <div className={`showTables ${active.contasPagar ? 'active' : ''}`}>
              <TemplateDefaultTable>
                <TableContasPagarConciliacao tab={trocarAbas} />
                <ModalCadastrarContasPagar />
                <ModalCadastrarContasPagar />
                <ModalFiltrarContasPagar />
                <ModalBaixarContasPagar />
              </TemplateDefaultTable>
            </div>
          </div>
          <div className="div-contas">
            <div className={`showTables ${active.conciliar ? 'active' : ''}`}>
              <TemplateDefaultTable height="34rem">
                <TableConsultaContasReceber tab={trocarAbas} />
                <ModalEstornarContasReceber />
              </TemplateDefaultTable>
              <TemplateDefaultTable height="34rem">
                <TableConsultaContasPagar tab={trocarAbas} />
                <ModalEstornarContasPagar />
              </TemplateDefaultTable>
            </div>
          </div>
        </div>
      </TableDivStyle>
    </>
  )
}

export default ConciliacaoBancariaTemplate
