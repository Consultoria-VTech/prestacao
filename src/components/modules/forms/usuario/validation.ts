import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (create: boolean): any =>
  useCallback(
    () =>
      Yup.object().shape({
        usuarioTipo: Yup.object().shape({
          idUsuarioTipo: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        empresa: Yup.object().shape({
          id: Yup.number()
            .typeError('Campo obrigatório.')
            .required('Campo obrigatório!'),
        }),
        nome: Yup.string()
          .typeError('Campo obrigatório.')
          .required('Campo obrigatório!'),

        senha: Yup.string()
          // .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v))
          .test({
            name: 'required',
            exclusive: false,
            params: { create },
            message: 'Campo obrigatório!',
            test: function (value) {
              if (!create) return true

              return value && create
            },
          }),
        repetirSenha: Yup.string()
          .required('Campo obrigatório!')
          .nullable()
          .test({
            name: 'required',
            exclusive: false,
            params: {},
            message: 'Senha incorreta!',
            test: function (value, yup) {
              const senha = yup.parent.senha
              if (!senha) return true
              return senha === value
            },
          })
          .transform(v => (!v ? '' : v)),

        nomeUsuario: Yup.string()
          .email('Informe um e-mail válido!')
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),

        ativo: Yup.boolean(),
      }),

    [create]
  )