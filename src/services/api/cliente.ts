import { AxiosResponse } from 'axios'
import Api from './api'

export const consultar = async (
  page?: number,
  size?: number
): Promise<AxiosResponse<[]>> => {
  return await Api.get('/api/clientes', {
    params: {
      page,
      size,
    },
  })
}

export const ApiCliente = {
  consultar,
}
