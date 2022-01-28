import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        // planoContasSintetica: Yup.object().shape({
        //   id: Yup.number()
        //     .typeError('Campo obrigatório.')
        //     .integer('Informe um número válido.')
        //     .required('Campo obrigatório!'),
        // }),
        descricao: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        receitaOuDespesa: Yup.number()
          .typeError('Campo obrigatório.')
          .integer('Informe um número válido.')
          .required('Campo obrigatório!'),
      }),

    []
  )
