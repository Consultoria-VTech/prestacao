import { Funcionario } from './../types/models/funcionario'
import Api, { ErrorData } from './api/api'
import { ApiFuncionario } from './api/funcionario'
import {Usuario} from '../types/models/usuario'

export const consultarFuncionario = async (
  page?: number,
  size?: number
): Promise<any> => {
  const response: any = await ApiFuncionario.consultar(page, size)

  if (response.error) return response.error
  else if (!response.data) return 'Erro ao consultar funcionarios'

  return response.data
}

type Error = {
  mensagem: string
  data: any
  status: number
}

export const cadastrar = async (
  funcionario: Funcionario
): Promise<Funcionario | ErrorData> => {
  const response = await Api.post<Funcionario>('/api/funcionarios', funcionario)

  return response.data
}

export const alterar = async (
  funcionario: Funcionario
): Promise<Funcionario | ErrorData> => {
  const response = await Api.put<Funcionario>('/api/funcionarios', funcionario)

  return response.data
}

export const deletar = async (
  funcionario: Funcionario
): Promise<boolean | ErrorData> => {
  const response = await Api.put<boolean>('/api/funcionarios/apagar', 
    {
      id: funcionario.id,
    },
  )

  return response.data
}

export const vincular = async (
  funcionario: number,
  usuario: Funcionario
): Promise<Funcionario | ErrorData> => {
  const response = await Api.post<Funcionario>('/api/funcionarios/vincularUsuario',
  {
    idfuncionario: funcionario,
    idusuario: usuario.usuario.idUsuario,
  },)
  console.log("vincular", response)
  return response.data
}