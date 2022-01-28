import { useCallback } from 'react'
import * as Yup from 'yup'

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

export const validation = (): any =>
  useCallback(
    () =>
    Yup.object().shape({
      observacao: Yup.string()
        .nullable(),
      quilometragem: Yup.string()
        .nullable(),
      prestacaoContas: Yup.object().shape({
        id: Yup.number()
          .typeError('Campo obrigatório.')
          .required('Campo obrigatório!'),
      }),
      tipoReembolso: Yup.number()
        .typeError('Campo obrigatório.')
        .integer('Campo obrigatório!')
        .required('Campo obrigatório!'),
      status: Yup.number()
        .typeError('Campo obrigatório.')
        .integer('Campo obrigatório!')
        .required('Campo obrigatório!'),
      valor: Yup.string()
        .required('Campo obrigatório!')
        .transform(v => (!v ? null : v)),
      descricao: Yup.string()
        .typeError('Campo obrigatório.')
        .required('Campo obrigatório!'),
      comprovante: Yup.mixed()
        .nullable(),
        dtDespesa: Yup.date()
        .default(() => new Date())
        .max(
          new Date(),
          'A data de emissão não pode ser maior que a data atual'
        )
        .nullable()
        .required('Campo obrigatório!'),
    }),
  []
  )