/* eslint-disable jsx-a11y/no-onchange */
import {
    ModalCadastrarPrestacaoDespesa,
    TablePrestacaoDespesa,
  } from '@components'
  import { InitialData, PrestacaoDespesaPagination } from '@types'
  import React from 'react'
  import { TemplateDefaultTable } from '../default'
  
  type PrestacaoDespesaTemplateProps =
    InitialData<PrestacaoDespesaPagination> & {}
  export const PrestacaoDespesaTemplate = ({
    data,
  }: PrestacaoDespesaTemplateProps) => {
    return (
      <TemplateDefaultTable>
        <TablePrestacaoDespesa data={data} />
        <ModalCadastrarPrestacaoDespesa />
      </TemplateDefaultTable>
    )
  }