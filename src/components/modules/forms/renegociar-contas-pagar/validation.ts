import { useCallback } from 'react'
import * as Yup from 'yup'
import { formatNumberPtBrToUs } from '../../../../util/numberUtil'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        parametroCobranca: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .integer('Informe um número válido.')
            .required('Campo obrigatório!'),
        }),
        valor: Yup.string()
          .required('Campo obrigatório!')
          .nullable()
          .transform(v => (!v ? null : v))
          .test({
            name: 'max',
            exclusive: false,
            params: {},
            message:
              'O valor da renegociação não pode ser maior que o valor da conta a receber!',
            test: function (value, yup) {
              if (!value) return false

              const valorBaixa = formatNumberPtBrToUs(value)
              const valorConta =
                formatNumberPtBrToUs(yup.parent.valorConta) || 0

              return valorBaixa <= valorConta
            },
          }),
      }),
    []
  )
