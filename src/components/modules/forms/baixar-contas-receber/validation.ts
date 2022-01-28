import { useCallback } from 'react'
import * as Yup from 'yup'
import { formatNumberPtBrToUs } from './../../../../util/numberUtil'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        valorConciliado: Yup.string()
          .required('Campo obrigatório!')
          .nullable()
          .transform(v => (!v ? null : v))
          .test({
            name: 'max',
            exclusive: false,
            params: {},
            message:
              'O valor conciliado não pode ser maior que o valor da conta a receber!',
            test: function (value, yup) {
              if (!value) return false

              const valorConciliado = formatNumberPtBrToUs(value)
              const valorConta =
                formatNumberPtBrToUs(yup.parent.valorConta) || 0

              return valorConciliado <= valorConta
            },
          }),
          
        idcontaBancaria: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        dtbaixa: Yup.date()
          .default(() => new Date())
          .nullable()
          .required('Campo obrigatório!'),
      }),
    []
  )
