import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        banco: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .integer('Informe um número válido.')
            .required('Campo obrigatório!'),
        }),
        agencia: Yup.number()
          .typeError('Campo obrigatório.')
          .integer('Informe um número válido.')
          .required('Campo obrigatório!'),
        agenciaDv: Yup.string().nullable().max(1, 'Máximo 1 dígito'),
        conta: Yup.number()
          .typeError('Campo obrigatório.')
          .integer('Informe um número válido.')
          .required('Campo obrigatório!'),
        contaDv: Yup.string().nullable().max(1, 'Máximo 1 dígito'),
        saldoinicial: Yup.string()
          .nullable()
          .required('Campo obrigatório!')
          .transform(v => (!v ? null : v)),
        tipo: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),
        tipo_pessoa: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),  
      }),

    []
  )
