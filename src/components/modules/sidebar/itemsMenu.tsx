import React, { ReactNode } from 'react'
import { ICON_LIBRARY } from '../../../types/icon'
import Icon from '../../elements/icon'

export const menuOpened = {
  0: 'rightSide',
  1: 'down',
  2: 'down',
}

export const menuCollapsed = {
  0: 'rightSide', 
  1: 'down', //default icones
  2: 'rightSide',
}

export const menuMobile = {
  0: 'rightSide',
  1: 'down',
  2: 'down',
  3: 'down',
  4: 'down',
  5: 'down',
}

type SidebarItem = {
  id?: string
  icon?: ReactNode
  name: string
  link?: string
  priority?: boolean
  nvl?: number
  disabled?: boolean

  items?: SidebarItem[]
}

export const items: SidebarItem[] = [
  {
    id: '0',
    name: 'Inicio',
    link: '/portal',
    icon: <Icon icon="FaHome" iconLibrary={ICON_LIBRARY.FONT_AWESOME} />,
    priority: true,
  },
  {
    id: '1',
    name: 'Cadastros',
    link: '/gestao',
    icon: <Icon icon="BiDollar" />,
    priority: true,
    items: [
      {
        // id: '2',
        // name: 'Cadastro e Inputs',
        // link: '/gestao/cadastros',
        // priority: true,
        // items: [
        //   {
            // id: '121',
            // name: 'Cadastros',
            // link: '/gestao/cadastros',
            // priority: true,
            // items: [
              // {
              //   id: '1211',
              //   name: 'Empresas',
              //   link: '/administrativo/empresas',
              //   priority: true,
              // },
              // {
              //   id: '1212',
              //   name: 'Usuários',
              //   link: '/administrativo/usuarios',
              //   priority: true,
              // },
              //{
                id: '1213',
                name: 'Clientes',
                link: '/gestao/cadastros/clientes',
                priority: true,
              },
              {
                id: '1214',
                name: 'Fornecedores',
                link: '/gestao/cadastros/fornecedores',
                priority: true,
              },              
              {
                id: '1215',
                name: 'Impostos',
                link: '/gestao/cadastros/impostos',
                priority: true,
              },
              {
                id: '1216',
                name: 'Contratos',
                link: '/gestao/cadastros/contratos',
                priority: true,
                items: [
                  // {
                  //   id: '12151',
                  //   name: 'A receber',
                  //   link: '/gestao/cadastros/contratos',
                  //   priority: true,
                  // },
                  // {
                  //   id: '12152',
                  //   name: 'A pagar',
                  //   link: '/gestao/cadastros/contratos',
                  //   priority: true,
                  // },
                ],
              },
              {
                id: '1217',
                name: 'Projetos',
                link: '/gestao/cadastros/projetos',
                priority: true,
              },
              // {
              //   id: '1218',
              //   name: 'Plano de contas',
              //   link: '/gestao/cadastros/planocontas',
              //   priority: true,
              // },
              {
                id: '1219',
                name: 'Centros de custo',
                link: '/gestao/cadastros/centrocusto',
                priority: true,
              },
              // {
              //   id: '1220',
              //   name: 'Contas bancárias',
              //   link: '/gestao/cadastros/contabancaria',
              //   priority: true,
              // },
              {
                id: '1221',
                name: 'Funcionários',
                link: '/gestao/cadastros/funcionarios',
                priority: true,
              },
            ],
          },
      //     {
      //       id: '122',
      //       name: 'Inputs',
      //       link: '/gestao/cadastros',
      //       priority: true,
      //       items: [
      //         {
      //           id: '1221',
      //           name: 'Contas a Receber',
      //           link: '/gestao/cadastros/contasreceber',
      //           priority: true,
      //           items: [
      //             {
      //               id: '12211',
      //               name: 'Contrato',
      //               link: '/gestao/cadastros/contratos',
      //               priority: true,
      //             },
      //             {
      //               id: '12212',
      //               name: 'Manual',
      //               link: '/gestao/cadastros/contasreceber',
      //               priority: true,
      //             },
      //           ],
      //         },
      //         {
      //           id: '1212',
      //           name: 'Contas a Pagar',
      //           link: '/gestao/cadastros/contaspagar',
      //           priority: true,
      //           items: [
      //             {
      //               id: '12121',
      //               name: 'Contrato',
      //               link: '/gestao/cadastros/contratos',
      //               priority: true,
      //             },
      //             {
      //               id: '12122',
      //               name: 'Manual',
      //               link: '/gestao/cadastros/contaspagar',
      //               priority: true,
      //             },
      //           ]
      //         },
      //         {
      //           id: '1213',
      //           name: 'Tributos a pagar',
      //           link: '/gestao/cadastros/contasreceber',
      //           priority: true,
      //           disabled: true,
      //         },
      //       ],
      //   //   },
      //   // ],
      // },
      // {
      //   id: '3',
      //   name: 'Consultas',
      //   link: '/gestao/consultas',
      //   priority: true,
      //   items: [
      //     {
      //       id: '31',
      //       name: 'Contas a Receber',
      //       link: '/gestao/cadastros/emissaocontasreceber',
      //       priority: true,
      //     },
      //     {
      //       id: '31',
      //       name: 'Contas a Pagar',
      //       link: '/gestao/cadastros/emissaobordero',
      //       priority: true,
      //     },
      //     {
      //       id: '32',
      //       name: 'Contratos',
      //       link: '/gestao/cadastros/contratos',
      //       priority: true,
      //     },
      //     {
      //       id: '33',
      //       name: 'Tributos a Pagar',
      //       link: '/gestao/consultas',
      //       priority: true,
      //     },
      //   ],
      // },
      // {
      //   id: '4',
      //   name: 'Conciliação Bancária',
      //   link: '/gestao/cadastros/conciliacaobancaria',
      //   priority: true,
      // },
      // {
      //   id: '5',
      //   name: 'Notas Fiscais a emitir',
      //   link: '/gestao/cadastros/emissaocontasreceber',
      //   priority: true,
      // },

  //   ],
  // },
  // {
  //   id: '6',
  //   name: 'Controladoria Estratégica',
  //   link: '/gestao/analise',
  //   icon: <Icon icon="BiReceipt" />,
  //   priority: true,
  //   items: [
  //     {
  //       id: '61',
  //       name: 'DRE',
  //       link: '/gestao/analise',
  //       priority: true,
  //       items: [
  //         {
  //           id: '6111',
  //           name: 'DRE',
  //           link: '/gestao/analise/dre-atual',
  //           priority: true,
  //         },
  //         {
  //           id: '611',
  //           name: 'Caixa Mensal',
  //           link: '/gestao/analise/dre-mensal',
  //           priority: true,
  //         },
  //         {
  //           id: '612',
  //           name: 'Caixa Trimestral',
  //           link: '/gestao/analise/dre-caixa-trimestral',
  //           priority: true,
  //         },
  //         {
  //           id: '613',
  //           name: 'Ultimo Trimestre (Caixa)',
  //           link: '/gestao/analise/dre-ultimo-trimestre',
  //           priority: true,
  //         },
  //         {
  //           id: '614',
  //           name: 'Caixa Comparativo Mensal',
  //           link: '/gestao/analise/dre-comparativo-mensal',
  //           priority: true,
  //         },
  //         {
  //           id: '615',
  //           name: 'Caixa Comparativo Trimestral',
  //           link: '/gestao/analise/dre-comparativo-trimestral',
  //           priority: true,
  //         },
  //         {
  //           id: '616',
  //           name: 'Caixa Comparativo Anual',
  //           link: '/gestao/analise/dre-comparativo-anual',
  //           priority: true,
  //         }
  //       ]
  //     },
  //     {
  //       id: '62',
  //       name: 'Fluxo de Caixa',
  //       link: '/gestao/analise',
  //       priority: true,
  //     },
  //     {
  //       id: '63',
  //       name: 'Indic. de Performance(KPI)',
  //       link: '/gestao/analise',
  //       priority: true,
  //     },
  //     {
  //       id: '64',
  //       name: 'Gestão de Projetos',
  //       link: '/gestao/analise',
  //       priority: true,
  //     },
  //     {
  //       id: '65',
  //       name: 'Consultas',
  //       link: '/gestao/analise',
  //       priority: true,
  //     },
  //   ],
  // },
  {
    // id: '7',
    // name: 'Gestão Administrativa',
    // link: '/administrativo',
    // icon: <Icon icon="BiReceipt" />,
    // priority: true,
    // items: [

    //   {
        id: '72',
        name: 'Prestação de Contas',
        link: '/gestao/cadastros/prestacaocontas',
        icon: <Icon icon="BiReceipt" />,
        priority: true,
        items: [
          {
            id: '721',
            name: 'Minhas Prestações',
            link: '/gestao/cadastros/prestacaocontas/minhasprestacoes',
            priority: true,
          },
          {
            id: '722',
            name: 'Aprovação Responsável',
            link: '/gestao/cadastros/prestacaocontas/aprovacaoadministrador',
            priority: true,
          },
          {
            id: '723',
            name: 'Aprovação Financeira',
            link: '/gestao/cadastros/prestacaocontas/aprovacaofinanceira',
            priority: true,
          }
        ]
      },
      {
        id: '71',
        name: 'Time Sheet',
        link: '/timesheet',
        priority: true,
        disabled: true,
      },
      // {
      //   id: '73',
      //   name: 'CRM',
      //   link: '/portal',
      //   priority: true,
      //   disabled: true,
      // },
      // {
      //   id: '74',
      //   name: 'Gestão',
      //   link: '/administrativo',
      //   priority: true,
      //   items: [
      //     {
      //       id: '741',
      //       name: 'Empresas',
      //       link: '/administrativo/empresas',
      //       priority: true,
      //     },
      //     {
      //       id: '742',
      //       name: 'Usuários',
      //       link: '/administrativo/usuarios',
      //       priority: true,
      //     }
      //   ]
      // },
      // {
      //   id: '75',
      //   name: 'Projetos',
      //   link: '/gestao/cadastros/projetos',
      //   priority: true,
      // },
    ]
 // },
  // {
  //   id: '8',
  //   name: 'Budget',
  //   link: '/portal',
  //   icon: <Icon icon="BiClipboard" />,
  //   priority: true,
  //   disabled: true,
  //   // items: [
  //   //   {
  //   //     id: '81',
  //   //     name: 'Cadastros e Inputs',
  //   //     link: '/portal',
  //   //     priority: true,
  //   //   },
  //   //   {
  //   //     id: '82',
  //   //     name: 'Consultas',
  //   //     link: '/portal',
  //   //     priority: true,
  //   //   },
  //   //   {
  //   //     id: '84',
  //   //     name: 'Gestão Orçamentária',
  //   //     link: '/portal',
  //   //     priority: true,
  //   //   },
  //   // ],
  // },
  // {
  //   id: '4',
  //   name: 'Menu Teste',
  //   link: '/#',
  //   icon: <Icon icon="BiDevices" />,
  //   priority: false,
  // },


export default SidebarItem
