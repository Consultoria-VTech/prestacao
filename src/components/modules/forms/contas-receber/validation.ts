import { useCallback } from 'react'
import * as Yup from 'yup'

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        planoContas: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        cliente: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        centroCusto: Yup.object().shape({
          id: Yup.number()
            .nullable()
        }),
        // contrato: Yup.object().shape({
        //   id: Yup.number()
        //     .typeError('Campo obrigatório.')
        //     .required('Campo obrigatório!'),
        // }),
        // contaBancaria: Yup.object().shape({
        //   id: Yup.number()
        //     .typeError('Campo obrigatório.')
        //     .required('Campo obrigatório!'),
        // }),
        valor: Yup.string()
          // .typeError('Campo obrigatório.')
          // .min(0, 'O valor da conta a receber não pode ser menor que 0!')
          // .integer('Informe um valor válido.')
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
        // dtVencimento: Yup.date().nullable().required('Campo obrigatório!'),
        // dtVencimento: Yup.date().when(
        //   'dtEmissao',
        //   (dtEmissao, yup) =>
        //     dtEmissao &&
        //     yup
        //       .min(
        //         dtEmissao,
        //         'A data de vencimento não pode ser menor que a data de emissão!'
        //       )
        //       .nullable()
        //       .required('Campo obrigatório!')
        // ),
        // dtVencimento: Yup.date()
        //   .required('Campo obrigatório!')
        //   .nullable()
        //   .min(
        //     Yup.ref('dtEmissao'),
        //     'A data de vencimento não pode ser menor que a data de emissão!'
        //   ),
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
        tipoDoc: Yup.string()
          // .required('Campo obrigatório!')
          .nullable()
          .transform(v => (!v ? '' : v)),
        nDoc: Yup.string()
          // .required('Campo obrigatório!')
          .nullable()
          .transform(v => (!v ? '' : v)),
        // nParcelas: Yup.number()
        //   .typeError('Campo obrigatório.')
        //   .integer('Informe um número válido.')
        //   .required('Campo obrigatório!'),
        fotoDespesa: Yup.mixed()
          // .required('Campo obrigatório!')
          .nullable(),
        // .test(
        //   'fileSize',
        //   'Arquivo muito grande! Informe um arquivo com no máximo 4MB!',
        //   value => value && value.size > 4096
        // ),
        // .test(
        //   'fileFormat',
        //   'Formato inválido! Informe um arquivo com extensão .pdf,.docx,.doc,.png,.jpg',
        //   value => value && SUPPORTED_FORMATS.includes(value.type)
        // ),
      }),

    []
  )
