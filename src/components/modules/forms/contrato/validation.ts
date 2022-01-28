import { useCallback } from 'react'
import * as Yup from 'yup'
import { ContratoTipoEnum } from '../../../../types/models/contrato'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        tipo: Yup.string()
        .nullable()
        .required('Campo obrigatório!')
        .transform(v => (!v ? null : v)),
      cliente: Yup.object().when('tipo', {
        is: tipo => tipo === ContratoTipoEnum.CR,
        then: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        otherwise: Yup.object().shape({
          id: Yup.number()
            .transform(v => (!v ? null : v))
            .nullable(true),
        }),
      }),
      fornecedor: Yup.object().when('tipo', {
        is: tipo => tipo === ContratoTipoEnum.CP,
        then: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        otherwise: Yup.object().shape({
          id: Yup.number()
            .transform(v => (!v ? null : v))
            .nullable(true),
        }),
      }),
        centroCusto: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        valor: Yup.string()
          .nullable()
          .required('Campo obrigatório!')
          .transform(v => (!v ? null : v)),
        dtEmissao: Yup.date()
          .default(() => new Date())
          .max(
            new Date(),
            'A data de emissão não pode ser maior que a data atual'
          )
          .nullable()
          .required('Campo obrigatório!'),
        dtVencimento: Yup.date()
          .required('Campo obrigatório!')
          .nullable()
          .test({
            name: 'min',
            exclusive: false,
            params: {},
            message:
              'A data de vencimento não pode ser menor que a data de emissão!',
            test: function (value, yup) {
              const dateValidade = new Date(value).setHours(0, 0, 0, 0)
              const dateEmissao = new Date(yup.parent.dtEmissao).setHours(
                0,
                0,
                0,
                0
              )
              return dateValidade >= dateEmissao
            },
          }),
        // nparcelas: Yup.number()
        //   .typeError('Campo obrigatório.')
        //   .integer('Informe um número válido.')
        //   .required('Campo obrigatório!'),
      }),
    []
  )
