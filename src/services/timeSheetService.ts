import { TimeSheet } from '../types/models/timeSheet'
import Api, { ErrorData } from './api/api'

export const cadastrar = async (
  timeSheet: TimeSheet
): Promise<TimeSheet | ErrorData> => {
  const response = await Api.post<TimeSheet>('/api/apuracaohoras', timeSheet)

  return response.data
}

export const alterar = async (
  timeSheet: TimeSheet
): Promise<TimeSheet | ErrorData> => {
  const response = await Api.put<TimeSheet>('/api/apuracaohoras', timeSheet)

  return response.data
}

export const deletar = async (
  timeSheet: TimeSheet
): Promise<boolean | ErrorData> => {
  const response = await Api.delete<boolean>('/api/apuracaohoras', {
    params: {
      id: timeSheet.id,
    },
  })

  return response.data
}