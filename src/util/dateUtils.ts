/* eslint-disable no-unused-vars */
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'

export enum DateFormatEnum {
  DateAndTimeFormatUS = 'yyyy-MM-dd hh:mm:ss',
  DateAndTimeFormatPtBR = 'dd/MM/yyyy hh:mm:ss',
  OnlyTime = 'hh:mm:ss',
  OnlyDateUSFormat = 'yyyy-MM-dd',
  OnlyDatePtBRFormat = 'dd/MM/yyyy',
}

export const formatDate = (
  date: Date,
  dateFormat = DateFormatEnum.DateAndTimeFormatUS
): string => {
  return format(date, dateFormat.toString())
}

export const formatDateToUS = (date: Date): string =>
  format(date, DateFormatEnum.DateAndTimeFormatUS)

export const formatDateToPtBR = (date: Date): string =>
  format(date, DateFormatEnum.DateAndTimeFormatPtBR, { locale: pt })