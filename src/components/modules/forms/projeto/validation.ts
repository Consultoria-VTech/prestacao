import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        descricao: Yup.string()
          .nullable()
          .required('Campo obrigatório!')
          .transform(v => (!v ? null : v)),
        contrato: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        limiteAlmoco: Yup.string()
          .nullable()
          .transform(v => (!v ? null : v)),
        limiteKm: Yup.string()
          .nullable()
          .transform(v => (!v ? null : v)),
        dtInicio: Yup.date()
          .default(() => new Date())
          .max(
            new Date(),
            'A data de emissão não pode ser maior que a data atual'
          )
          .nullable()
          .required('Campo obrigatório!'),
        dtFinalizacao: Yup.date()
          .required('Campo obrigatório!')
          .nullable()
          .test({
            name: 'min',
            exclusive: false,
            params: {},
            message:
              'A data de vencimento não pode ser menor que a data de inicio!',
            test: function (value, yup) {
              const dateValidade = new Date(value).setHours(0, 0, 0, 0)
              const dtInicio = new Date(yup.parent.dtInicio).setHours(
                0,
                0,
                0,
                0
              )
              return dateValidade >= dtInicio
            },
          }),
        situacao: Yup.number()
          .typeError('Campo obrigatório.')
          .integer('Campo obrigatório!')
          .required('Campo obrigatório!'),
      }),
    []
  )