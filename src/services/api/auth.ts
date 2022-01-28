import { AxiosResponse } from 'axios'
import { Usuario } from '../../types/models/usuario'
import Api from './api'

export const postLogin = async (
  usuario: Usuario
): Promise<AxiosResponse<Usuario>> => await Api.post<Usuario>('/login', usuario)
