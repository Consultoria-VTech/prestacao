import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        descricao: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        tipo: Yup.number()
          .typeError('Campo obrigatório.')
          .integer('Valor inválido')
          .required('Campo obrigatório!'),

        taxa: Yup.string()
          .typeError('Campo obrigatório.')
          .required('Campo obrigatório!'),
        ativo: Yup.boolean(),
      }),

    []
  )
