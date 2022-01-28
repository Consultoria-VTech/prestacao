import { DataPagination } from '../dataPagination'
import { Empresa } from './empresa'

export type UsuarioTipo = {
  idUsuarioTipo?: number
  descricaoUsuarioTipo?: string
}

export type Usuario = {
  usuario?: string | null
  senha?: string | null
  repetirSenha?: string | null
  lembrarSenha?: boolean
  accessToken?: string | null

  idUsuario?: string
  nome?: string
  sobrenome?: string
  dataCadastro?: Date
  nomeUsuario?: string
  ativo?: boolean
  empresa?: Empresa
  usuarioTipo?: UsuarioTipo
}

export type UsuarioPagination = {
  pagination: DataPagination
  data: Usuario[]
}

export type RefreshToken = {
  id: string
  expiresIn: number
  usuario: Usuario
}