import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        projetos: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .min(1, 'Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        tarefas: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            // .min(1, 'Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        // hora: Yup.number()
        //   .typeError('Campo obrigatório.')
        //   .required('Campo obrigatório!'),
        // minuto: Yup.number()
        //   .typeError('Campo obrigatório.')
        //   .required('Campo obrigatório!'),
      }),
    []
  )