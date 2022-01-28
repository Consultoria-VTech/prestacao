import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        observacao: Yup.string()
          .nullable(),
        projeto: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        funcionario: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        dtEmissao: Yup.date()
          .default(() => new Date())
          .max(
            new Date(),
            'A data de emissão não pode ser maior que a data atual'
          )
          .nullable()
          .required('Campo obrigatório!'),
        situacao: Yup.number()
          .typeError('Campo obrigatório.')
          .integer('Campo obrigatório!')
          .required('Campo obrigatório!'),
      }),
    []
  )