import { Usuario } from '../types/models/usuario'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  usuario: Usuario
): Promise<Usuario | ErrorData> => {
  const response = await Api.post<Usuario>('/api/usuarios', usuario)

  return response.data
}

export const alterar = async (
  usuario: Usuario
): Promise<Usuario | ErrorData> => {
  const response = await Api.put<Usuario>('/api/usuarios', usuario)

  return response.data
}

export const deletar = async (
  usuario: Usuario
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/usuarios', {
    params: {
      id: usuario.idUsuario,
    },
  })

  return response.data
}