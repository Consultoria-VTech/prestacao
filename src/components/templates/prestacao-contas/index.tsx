/* eslint-disable jsx-a11y/no-onchange */
import {
    InitialData,
    PrestacaoContasPagination,
    PrestacaoContasTipoEnum,
  } from '@types'
  import React from 'react'
  import { ModalCadastrarPrestacaoContas } from '~/components/modules'
  import TablePrestacaoContas from '~/components/modules/tables/table-prestacao-contas'
  import { TemplateDefaultTable } from '../default'
  
  
  type PrestacaoContasTemplateProps = InitialData<PrestacaoContasPagination> & {
    tipo: PrestacaoContasTipoEnum
  }
  export const PrestacaoContasTemplate = ({
    data,
    tipo = PrestacaoContasTipoEnum.MinhasPrestacoes,
  }: PrestacaoContasTemplateProps) => {
    return (
      <TemplateDefaultTable>
        <TablePrestacaoContas data={data} tipo={tipo} />
        <ModalCadastrarPrestacaoContas />
      </TemplateDefaultTable>
    )
  }