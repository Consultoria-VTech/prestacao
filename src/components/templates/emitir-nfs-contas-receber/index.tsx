/* eslint-disable jsx-a11y/no-onchange */
import add from 'date-fns/add'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi'
import {
  ModalFiltrarContasPagar,
  ModalFiltrarContasReceber,
  ModalEmitirNFSContasReceber,
} from '~/components/modules'
import { InitialData } from '../../../types/initialData'
import { ContasPagarPagination } from '../../../types/models/contasPagar'
import { ContasReceberPagination } from '../../../types/models/contasReceber'
import { formatMoney } from '../../../util/stringUtil'
import Button from '../../elements/button'
import TableConsultaContasPagar from '../../modules/tables/consulta-contas-pagar'
import { TemplateDefaultTable } from '../default'
import { Title } from './../../elements/title/index'
import TableEmitirNFSContasReceber from './../../modules/tables/emitir-nfs-contas-receber'
import { CardTotalStyled } from './styles'

export type FiltroDataNfs =
  | 'Hoje'
  | '7 dias'
  | '30 dias'
  | 'Em atraso'
  | 'Personalizado'

type EmitirNFSContasReceberTemplateProps = InitialData<any> & {
  dataContasReceber?: ContasReceberPagination
  dataContasPagar?: ContasPagarPagination
}
const EmitirNFSContasReceberTemplate: React.FC<EmitirNFSContasReceberTemplateProps> = ({
  dataContasReceber,
  dataContasPagar,
}) => {

  return (
    <>
        <TemplateDefaultTable height="45rem">
        
        <TableEmitirNFSContasReceber/>
        <ModalEmitirNFSContasReceber />
        <ModalFiltrarContasReceber />
      </TemplateDefaultTable>
    </>
  )
}

export default EmitirNFSContasReceberTemplate




// import React from 'react'
// import {
//   ModalEmitirNFSContasReceber,
//   ModalCadastrarContasReceber,
//   ModalFiltrarContasReceber,
// } from '~/components/modules'
// import { InitialData } from '../../../types/initialData'
// import { ContasReceberPagination } from '../../../types/models/contasReceber'
// import { TemplateDefaultTable } from '../default'
// import TableEmitirNFSContasReceber from './../../modules/tables/emitir-nfs-contas-receber'

// const EmitirNFSContasReceberTemplate: React.FC<InitialData<ContasReceberPagination>> = ({
//   data,
// }) => {
//   return (
//     <TemplateDefaultTable>
//       <TableEmitirNFSContasReceber data={data} />
//       <ModalCadastrarContasReceber />
//       <ModalFiltrarContasReceber />
//       <ModalEmitirNFSContasReceber />
//     </TemplateDefaultTable>
//   )
// }

// export default EmitirNFSContasReceberTemplate
