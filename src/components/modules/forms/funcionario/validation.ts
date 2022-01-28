import { cpf as validCpf } from 'cpf-cnpj-validator'
import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        nome: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        cpf: Yup.string()
          .max(18, 'Informe no máximo 11 dígitos.')
          .required('Campo obrigatório.')
          .test(
            'cpf',
            'Cpf inválido',
            async value =>
              (await Promise.resolve(
                validCpf.isValid(value) || validCpf.isValid(value)
              )) === true
          )
          .transform(v => (!v ? '' : v)),

        cep: Yup.string()
          .max(10, 'Informe no máximo 8 dígitos.')
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        endereco: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        cidade: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        estado: Yup.string()
          .required('Campo obrigatório!')
          .min(2, 'O número mínimo de caracteres é 2.')
          .max(2, 'O número máximo de caracteres é 2.')
          .transform(v => (!v ? '' : v)),

        numero: Yup.number()
          .typeError('Campo obrigatório.')
          .integer('Informe um número válido.')
          .required('Campo obrigatório!'),

        bairro: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        complemento: Yup.string().transform(v => (!v ? '' : v)),

        telefone: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        email: Yup.string()
          .email('Informe um e-mail válido!')
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        telefone2: Yup.string().transform(v => (!v ? '' : v)),

        email2: Yup.string()
          .email('Informe um e-mail válido!')
          .transform(v => (!v ? '' : v)),

        telefone3: Yup.string().transform(v => (!v ? '' : v)),

        email3: Yup.string()
          .email('Informe um e-mail válido!')
          .transform(v => (!v ? '' : v)),

        observacao: Yup.string().transform(v => (!v ? '' : v)),
        ativo: Yup.boolean(),
        cargo: Yup.string()
          .transform(v => (!v ? '' : v))
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        dtAdmissao: Yup.date()
          .default(() => new Date())
          .nullable()
          .required('Campo obrigatório!'),
      }),
    []
  )
