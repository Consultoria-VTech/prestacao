import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (create: boolean): any =>
  useCallback(
    () =>
      Yup.object().shape({
          link: Yup.string()
          .typeError('Campo obrigatório.')
          .required('Campo obrigatório!'),
          descricao: Yup.string()
          .typeError('Campo obrigatório.')
          .required('Campo obrigatório!'),    
          aplicacao: Yup.string()
          .typeError('Campo obrigatório.')
          .required('Campo obrigatório!'),    
          workspace: Yup.string()
          .typeError('Campo obrigatório.')
          .required('Campo obrigatório!'),    
          report: Yup.string()
          .typeError('Campo obrigatório.')
          .required('Campo obrigatório!'),      

        ativo: Yup.boolean(),
      }),

    [create]
  )