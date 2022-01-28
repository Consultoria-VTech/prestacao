import { useCallback } from 'react'
import * as Yup from 'yup'

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        contaBancaria: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        valor: Yup.string()
          .typeError('Campo obrigatório.')
          .required('Campo obrigatório!'),

        tipo: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),
        
          
          dataPagamento: Yup.date()
          .default(() => new Date())
          .nullable()
          .required('Campo obrigatório!'),
          
          dataConciliacao: Yup.date()
          .default(() => new Date())
          .nullable()
          .required('Campo obrigatório!'),
        }),

    []
  )
