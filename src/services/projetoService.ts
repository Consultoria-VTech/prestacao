import { Projeto } from '@types'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  projeto: Projeto
): Promise<Projeto | ErrorData> => {
  const response = await Api.post<Projeto>('/api/projetos', projeto)

  return response.data
}

export const alterar = async (
  projeto: Projeto
): Promise<Projeto | ErrorData> => {
  const response = await Api.put<Projeto>('/api/projetos', projeto)

  return response.data
}

export const deletar = async (
  projeto: Projeto
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/projetos', {
    params: {
      id: projeto.id,
    },
  })

  return response.data
}