import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        name: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        bankId: Yup.number()
          .typeError('Campo obrigatório.')
          .integer('Informe um número válido.')
          .required('Campo obrigatório!'),
      }),
    []
  )
