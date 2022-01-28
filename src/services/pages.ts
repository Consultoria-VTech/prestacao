import _isArray from 'lodash/isArray'
import { ICON_LIBRARY } from '../types/icon'
import { Page } from '../types/page'

const PageConfiguration: Page[] = [
  {
    main: true,
    name: 'Portal',
    path: '/portal',
    icon: null,
    description: null,
    show: true,
    subPages: [
      {
        name: 'Administrativo',
        description: 'Módulo para os administradores do sistema',
        path: '/administrativo',
        size: 'large',
        style: 'decored',
        icon: {
          icon: 'RiAdminFill',
          iconLibrary: ICON_LIBRARY.REMIX_ICONS,
        },
        show: true,
        subPages: [
          {
            name: 'Empresas',
            description: 'Cadastro e gestão de novas empresas',
            path: '/administrativo/empresas',
            icon: {
              icon: 'MdWork',
              iconLibrary: ICON_LIBRARY.MATERIAL_DESIGN,
            },
            show: true,
          },
          {
            name: 'Usuários',
            description: 'Cadastro e gestão de usuários de acesso',
            path: '/administrativo/usuarios',
            icon: {
              icon: 'FaUser',
              iconLibrary: ICON_LIBRARY.FONT_AWESOME,
            },
            show: true,
          },
          {
            name: 'BI',
            description: 'Cadastro e gestão de BI',
            path: '/administrativo/bi',
            icon: {
              icon: 'MdWork',
              iconLibrary: ICON_LIBRARY.FONT_AWESOME,
            },
            show: true,
          },
        ],
      },
      {
        name: 'GESTÃO FINANCEIRA',
        // description: 'Gerencie suas receitas, despesas e planos de contas',
        path: '/gestao',
        size: 'large',
        style: 'decored',
        icon: {
          icon: 'GiTwoCoins',
          iconLibrary: ICON_LIBRARY.GITHUB_OCTICONS,
        },
        show: true,
        subPages: [
          {
            name: 'Cadastros e Inputs',
            // description:
            //   'Cadastre clientes, produtos, fornecedores e muito mais',
            path: '/gestao/cadastros',
            icon: {
              icon: 'FaAddressCard',
              iconLibrary: ICON_LIBRARY.FONT_AWESOME,
            },
            show: true,
            subPages: [
              {
                name: 'Bancos',
                path: '/gestao/cadastros/bancos',
                icon: {
                  icon: 'MdAccountBalance',
                  iconLibrary: ICON_LIBRARY.MATERIAL_DESIGN,
                },
                show: true,
              },
              {
                name: 'Clientes',
                path: '/gestao/cadastros/clientes',
                icon: {
                  icon: 'ImUserTie',
                  iconLibrary: ICON_LIBRARY.ICOMOON_FREE,
                },
                show: true,
              },
              {
                name: 'Emitir NFS Contas Receber',
                path: '/gestao/cadastros/emissaocontasreceber',
                icon: {
                  icon: 'ImUserTie',
                  iconLibrary: ICON_LIBRARY.ICOMOON_FREE,
                },
                show: true,
              },
              {
                name: 'Emitir Borderô Contas Pagar',
                path: '/gestao/cadastros/emissaobordero',
                icon: {
                  icon: 'ImUserTie',
                  iconLibrary: ICON_LIBRARY.ICOMOON_FREE,
                },
                show: true,
              },
              {
                name: 'Contas a Receber',
                path: '/gestao/cadastros/contasreceber',
                icon: {
                  icon: 'BiTrendingUp',
                  iconLibrary: ICON_LIBRARY.BOX_ICONS,
                  size: '4rem',
                },
                show: true,
              },
              {
                name: 'Contas a Pagar',
                path: '/gestao/cadastros/contaspagar',

                icon: {
                  icon: 'BiTrendingDown',
                  iconLibrary: ICON_LIBRARY.BOX_ICONS,
                  size: '4rem',
                },
                show: true,
              },
              {
                name: 'Contratos',
                path: '/gestao/cadastros/contratos',
                icon: {
                  icon: 'FaFileAlt',
                  iconLibrary: ICON_LIBRARY.FONT_AWESOME,
                  size: '3rem',
                },
                show: true,
                subPages: [
                  {
                    name: 'Responsáveis',
                    path: '/gestao/cadastros/contratos/[id]/responsaveis',
                    icon: {
                      icon: 'MdAccountBalance',
                      iconLibrary: ICON_LIBRARY.MATERIAL_DESIGN,
                    },
                    show: true,
                  },
                  {
                    name: 'Impostos',
                    path: '/gestao/cadastros/contratos/[id]/impostos',
                    icon: {
                      icon: 'MdAccountBalance',
                      iconLibrary: ICON_LIBRARY.MATERIAL_DESIGN,
                    },
                    show: true,
                  },
                  //   {
                  //     name: 'Contrato',
                  //     path: '/gestao/cadastros/contratos/[id]',
                  //     icon: null,
                  //     show: true,
                  //     subPages: [
                  //       {
                  //         name: 'Representantes',
                  //         path: '/gestao/cadastros/contratos/[id]/representantes',
                  //         icon: {
                  //           icon: 'MdAccountBalance',
                  //           iconLibrary: ICON_LIBRARY.MATERIAL_DESIGN,
                  //         },
                  //         show: true,
                  //       },
                  //     ],
                  //   },
                ],
              },
              {
                name: 'Conciliação Bancária',
                path: '/gestao/cadastros/conciliacaobancaria',

                icon: {
                  icon: 'FaPiggyBank',
                  iconLibrary: ICON_LIBRARY.FONT_AWESOME,
                  size: '3.5rem',
                },
                show: true,
              },
              {
                name: 'Fornecedores',
                path: '/gestao/cadastros/fornecedores',
                icon: {
                  icon: 'ImTruck',
                  iconLibrary: ICON_LIBRARY.ICOMOON_FREE,
                },
                show: true,
              },
              {
                name: 'Centro de Custos',
                path: '/gestao/cadastros/centrocusto',
                icon: {
                  icon: 'FaCalculator',
                  iconLibrary: ICON_LIBRARY.FONT_AWESOME,
                },
                show: true,
              },
              {
                name: 'Contas Bancárias',
                path: '/gestao/cadastros/contabancaria',
                icon: {
                  icon: 'FaCreditCard',
                  iconLibrary: ICON_LIBRARY.FONT_AWESOME,
                },
                show: true,
              },
              {
                name: 'Controladoria',
                path: '/gestao/cadastros/controladoria',
                icon: {
                  icon: 'FaChartBar',
                  iconLibrary: ICON_LIBRARY.FONT_AWESOME,
                },
                show: true,
              },
              {
                name: 'Funcionários',
                path: '/gestao/cadastros/funcionarios',
                icon: {
                  icon: 'BsFillBriefcaseFill',
                  iconLibrary: ICON_LIBRARY.BOOTSTRAP_ICONS,
                },
                show: true,
              },
              {
                name: 'Integrações',
                path: '/gestao/cadastros/integracaoes',
                icon: {
                  icon: 'GrSystem',
                  iconLibrary: ICON_LIBRARY.GROMMET_ICONS,
                },
                show: true,
              },
              {
                name: 'Impostos',
                path: '/gestao/cadastros/impostos',
                icon: {
                  icon: 'MdAttachMoney',
                  iconLibrary: ICON_LIBRARY.MATERIAL_DESIGN,
                },
                show: true,
              },
              {
                name: 'Parâmetros de Cobrança',
                path: '/gestao/cadastros/parametroscobranca',
                icon: {
                  icon: 'ImCogs',
                  iconLibrary: ICON_LIBRARY.ICOMOON_FREE,
                },
                show: true,
              },

              {
                name: 'Plano de Contas',
                path: '/gestao/cadastros/planocontas',
                icon: {
                  icon: 'BiSitemap',
                  iconLibrary: ICON_LIBRARY.BOX_ICONS,
                },
                show: true,
              },
              {
                name: 'Prestação de Contas',
                path: '/gestao/cadastros/prestacaocontas',
                icon: {
                  icon: 'FaTags',
                  iconLibrary: ICON_LIBRARY.FONT_AWESOME,
                },
                show: true,
                subPages: [
                  {
                    name: 'Depesas da Prestação',
                    path: '/gestao/cadastros/prestacaocontas/[id]/despesas',
                    icon: {
                      icon: 'MdAccountBalance',
                      iconLibrary: ICON_LIBRARY.MATERIAL_DESIGN,
                    },
                    show: false,
                  },
                  {
                    name: 'Minhas Prestações',
                    path: '/gestao/cadastros/prestacaocontas/minhasprestacoes',
                    icon: {
                      icon: 'FaTags',
                      iconLibrary: ICON_LIBRARY.FONT_AWESOME,
                    },
                    show: true,
                  },
                  {
                    name: 'Aprovação Administrador',
                    path: '/gestao/cadastros/prestacaocontas/aprovacaoadministrador',
                    icon: {
                      icon: 'FaTags',
                      iconLibrary: ICON_LIBRARY.FONT_AWESOME,
                    },
                    show: true,
                  },
                  {
                    name: 'Aprovação Financeira',
                    path: '/gestao/cadastros/prestacaocontas/aprovacaofinanceira',
                    icon: {
                      icon: 'FaTags',
                      iconLibrary: ICON_LIBRARY.FONT_AWESOME,
                    },
                    show: true,
                  },
                ],
              },
              {
                name: 'Produtos',
                path: '/gestao/cadastros/produtos',
                icon: {
                  icon: 'FaBox',
                  iconLibrary: ICON_LIBRARY.FONT_AWESOME,
                },
                show: false,
              },
              {
                name: 'Projetos',
                path: '/gestao/cadastros/projetos',
                icon: {
                  icon: 'GrProjects',
                  iconLibrary: ICON_LIBRARY.GROMMET_ICONS,
                  size: '2.5rem',
                },
                show: true,
                subPages: [
                  {
                    name: 'Responsáveis',
                    path: '/gestao/cadastros/projetos/[id]/responsaveis',
                    icon: {
                      icon: 'MdAccountBalance',
                      iconLibrary: ICON_LIBRARY.MATERIAL_DESIGN,
                    },
                    show: true,
                  },
                ],
              },
            ],
          },
          {
            name: 'Análise de Dados',
            description:
              'Obtenha uma análise completa dos seus dados financeiros',
            path: '/gestao/analise',
            icon: {
              icon: 'BsFillPieChartFill',
              iconLibrary: ICON_LIBRARY.BOOTSTRAP_ICONS,
            },
            show: true,
          },
          {
            name: 'Consultas',
            description:
              'Consulte os vencimentos de contas a receber e a pagar dos próximos dias',
            path: '/gestao/consultas',
            icon: {
              icon: 'FaSearchDollar',
              iconLibrary: ICON_LIBRARY.FONT_AWESOME,
            },
            show: true,
          },
        ],
      },
      {
        name: 'GESTÃO ADMINISTRATIVA',
        // description: 'Gerencie o tempo despendido nos seus projetos',
        path: '/administrativo',
        size: 'large',
        style: 'decored',
        icon: {
          icon: 'IoTimeOutline',
          iconLibrary: ICON_LIBRARY.IONICONS_5,
        },
        show: true,
        subPages: [
          {
            name: 'Time Sheet',
            path: '/timesheet',
            icon: {
              icon: 'FaAddressCard',
              iconLibrary: ICON_LIBRARY.FONT_AWESOME,
            },
            show: true,
          },
        ],
      },
      {
        name: 'BUDGET',
        path: '/budget',
        // description: 'Gerencie seus orçamentos',
        size: 'large',
        style: 'decored',
        icon: {
          icon: 'IoWallet',
          iconLibrary: ICON_LIBRARY.IONICONS_5,
        },
        show: true,
        subPages: [
          {
            name: 'Cadastros e Inputs',
            path: '/gestao/cadastros',
            icon: {
              icon: 'FaAddressCard',
              iconLibrary: ICON_LIBRARY.FONT_AWESOME,
            },
            show: true,
          },
        ],
      },
      {
      name: 'Implantação',
        path: '/implantacao',
        // description: 'Gerencie seus orçamentos',
        size: 'large',
        style: 'decored',
        icon: {
          icon: 'IoWallet',
          iconLibrary: ICON_LIBRARY.IONICONS_5,
        },
        show: true,
      },
      {
        name: 'Prestação de Contas',
        description: 'Gerencie o histórico e suas prestações de contas',
        path: '/prestacaocontas',
        style: 'decored',
        icon: {
          icon: 'BiReceipt',
          iconLibrary: ICON_LIBRARY.BOX_ICONS,
        },
        show: false,
      },
      // {
      //   name: 'CRM',
      //   size: 'large',
      //   style: 'decored',
      //   description: 'Gerencie seus contatos de negócios',
      //   path: '/crm',
      //   icon: {
      //     icon: 'FaHeadset',
      //     iconLibrary: ICON_LIBRARY.FONT_AWESOME,
      //   },
      //   show: true,
      // },
      // {
      //   name: 'Controle de Estoque',
      //   description: 'Gerencie seus insumos',
      //   size: 'large',
      //   style: 'decored',
      //   path: '/controleestoque',

      //   icon: {
      //     icon: 'FaBox',
      //     iconLibrary: ICON_LIBRARY.FONT_AWESOME,
      //   },
      //   show: true,
      // },
    ],
  },
]

export const mapPageConfiguration = (
  items: Page | Page[],
  value: string,
  fullPath?: string
): null | Page => {
  if (!items) {
    return
  }

  if (_isArray(items)) {
    for (const item of items) {
      if (!item.main && item.name)
        item.descriptionFullPath = fullPath + '/' + item.name

      if (item.path === value) {
        return item
      }

      const page = mapPageConfiguration(
        item.subPages,
        value,
        item.descriptionFullPath || ''
      )
      if (page) {
        return page
      }
    }
  } else {
    if (items.path === value) {
      items.descriptionFullPath = fullPath + '/' + items.name
      return items
    }
  }
}

export const getPageConfiguration = (path: string): Page | null => {
  return mapPageConfiguration(PageConfiguration, path, '')
}
