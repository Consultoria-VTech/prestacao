import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        imposto: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        percentual: Yup.string()
          .typeError('Campo obrigatório.')
          .required('Campo obrigatório!'),
      }),
    []
  )
