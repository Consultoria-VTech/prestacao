import { useFormik } from 'formik'
import get from 'lodash/get'
import Router from 'next/router'
import React, { useCallback, useState } from 'react'
import { BiLock, BiUserCircle } from 'react-icons/bi'
import * as Yup from 'yup'
import Auth from '../../../../services/authentication'
import { FieldProps } from '../../../../types/formProps'
import { Usuario } from '../../../../types/models/usuario'
import { PageMain } from '../../../../util/constants'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import Checkbox from '../../../elements/checkbox'
import { FormGroupInput } from '../../form-group'

export type LoginInputs = {
  usuario: FieldProps<string>
  senha: FieldProps<string>
  lembrarSenha: FieldProps<boolean>
}

export type LoginProps = {
  isAuthenticad?: string
  error?: any
}

const FormLogin: React.FC<LoginProps> = () => {
  const [success, setSuccess] = useState(BUTTON_STATE.NOTHING)
  // #region VALIDAÇÕES
  const validationSchema = useCallback(
    () =>
      Yup.object({
        usuario: Yup.string()
          .email('Informe um e-mail válido!')
          .required('Campo obrigatório!'),
        senha: Yup.string().required('Insira sua senha!'),
      }),
    []
  )
  // #endregion

  // #region FORM SUBMIT
  const initialValues: Usuario = {
    usuario: '',
    senha: '',
    lembrarSenha: false,
  }

  const {
    getFieldProps,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: Usuario) => {
      try {
        setSubmitting(true)
        setSuccess(BUTTON_STATE.LOADING)

        const senhaAtual = values.senha
        await Auth.login(values)
          .then(() => {
            setSuccess(BUTTON_STATE.SUCCESS)
          })
          .catch(error => {
            setSuccess(BUTTON_STATE.ERROR)
            values.senha = senhaAtual
            errors.senha = error?.data || 'Usuário ou senha inválido!'
            console.log('Erro no login: ', { error })
          })

        setSubmitting(false)
      } catch (e) {
        setSuccess(BUTTON_STATE.ERROR)
        console.log('Erro no login: ', { e })
      }
    },
  })

  // #endregion

  // #region FORM DATA
  const formData: LoginInputs = {
    usuario: {
      field: getFieldProps('usuario'),
      isInvalid:
        get(touched, 'usuario') &&
        get(errors, 'usuario') &&
        errors.usuario !== '',
    },
    senha: {
      field: getFieldProps('senha'),
      isInvalid:
        get(touched, 'senha') && get(errors, 'senha') && errors.senha !== '',
    },
    lembrarSenha: {
      field: getFieldProps('lembrarSenha'),
      isInvalid: false,
    },
  }

  const { usuario, senha, lembrarSenha } = formData
  // #endregion

  return (
    <form
      className="needs-validation"
      noValidate
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isSubmitting) handleSubmit(e)
      }}>
      <FormGroupInput
        field={usuario}
        required
        formAlternative={true}
        placeholder="E-mail"
        classNameFormGroup="mb-3"
        type="email"
        icon={<BiUserCircle size="1.25rem" />}
        messageError={errors.usuario}
      />

      <FormGroupInput
        field={senha}
        required
        formAlternative={true}
        placeholder="Senha"
        classNameFormGroup="mb-2"
        type="password"
        icon={<BiLock size="1.25rem" />}
        messageError={errors.senha}
      />

      <Checkbox
        label="Lembre-me"
        id={lembrarSenha.field.name}
        name={lembrarSenha.field.name}
        style={{ color: '#c4acd2' }}
        onChange={lembrarSenha.field.onChange}
        checked={lembrarSenha.field.checked}
        value={lembrarSenha.field.value === true ? 1 : 0}
        onBlur={lembrarSenha.field.onBlur}
      />

      <div className="text-center">
        <Button
          onSucess={() => Router.push(PageMain.path)}
          state={success}
          type="submit"
          className="btn btn-secondary my-4">
          Login
        </Button>
      </div>
    </form>
  )
}

export default FormLogin