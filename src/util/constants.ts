import { ReactNode } from 'react'

export const COOKIES = {
  authToken: 'vtechApp.authToken',
  refreshToken: 'vtechApp.refreshToken',
  sidebarState: 'vtechApp.sidebarState',
  sidebarType: 'vtechApp.sidebarType',
}

export const TOAST_CONTAINER = {
  modal: 'modal_container',
  app: 'app_container',
}

export const toastTimeDefault = 3000

export const messageCreateSuccess = 'Registro cadastrado com sucesso!'
export const messageUpdateSuccess = 'Registro alterado com sucesso!'
export const messageDeleteSuccess = 'Registro excluído com sucesso!'

export const TipoDocumento = ['PIX', 'Transferência', 'Boleto', 'Nota fiscal', 'Outros']
export const TipoContaBancaria = [
  'Corrente',
  'Poupança',
]

export const TipoPessoa = [
  'Pessoa física',
  'Pessoa jurídica',  
]

// export const TipoSaldo = ['Crédito', 'Débito']
export const TipoSaldo = ['Juros', 'Taxa', 'Tarifa', 'Outros']

export const NumeroParcelas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export const QuantidadeTotalItensPorPagina = [10, 16, 24, 36, 48]

export const isExpandModalFilter = false

export const redirectLogout = '/login'

export type PageOption = {
  pageOptionId?: string | number
  mainPageOptionId?: string | number
  name: string
  path: string
  icon?: ReactNode | string
  description?: string
  show: boolean

  subPages?: PageOption[]
}

export const PageMain: PageOption = {
  pageOptionId: 0,
  name: 'portal',
  path: '/portal',
  show: true,
}
