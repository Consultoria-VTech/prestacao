import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useAuth } from '../../../../context/authContext'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { alterar, cadastrar } from '../../../../services/usuarioService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Usuario, UsuarioTipo } from '../../../../types/models/usuario'
import { TOAST_CONTAINER } from '../../../../util/constants'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import Checkbox from '../../../elements/checkbox'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group'
import { ModalFooter } from '../../modal'
import { dataForm } from './formData'
import { validation } from './validation'

const FormCadastrarUsuario: React.FC = () => {
  const idModal = ModalEnum.createUsuario
  const { user } = useAuth()
  const { closeModal, getData, getAction } = useModal<Usuario>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [usuario, setUsuario] = useState<Usuario>()

  const { data: dataUsuarioTipo } = useFetch<UsuarioTipo[]>(
    `/api/usuariotipos`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: Usuario = dataModal || {
    usuarioTipo: { idUsuarioTipo: null },
    nome: null,
    sobrenome: null,
    empresa: user.empresa,
    nomeUsuario: null,
    ativo: true,
    senha: null,
    repetirSenha: null,
  }

  const validationSchema = validation(propsModal?.action === 'create')

  const {
    getFieldProps,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleReset,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    validateOnBlur: true,
    initialValues: initialValues,
    validationSchema,

    onSubmit: async (values: Usuario) => {
      setSubmitting(true)

      try {
        setStatus(BUTTON_STATE.LOADING)

        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(data => {
              alertUpdateSuccess()
              setUsuario(data as Usuario)
              setStatus(BUTTON_STATE.SUCCESS)
            })
            .catch((e: ErrorData) => {
              alertError(e, TOAST_CONTAINER.modal)
              setStatus(BUTTON_STATE.ERROR)
            })
        } else {
          await cadastrar(values)
            .then(data => {
              alertCreateSuccess()
              setUsuario(data as Usuario)
              setStatus(BUTTON_STATE.SUCCESS)
            })
            .catch((e: ErrorData) => {
              alertError(e, TOAST_CONTAINER.modal)
              setStatus(BUTTON_STATE.ERROR)
            })
        }

        setSubmitting(false)
      } catch (e) {
        setStatus(BUTTON_STATE.ERROR)
        Alert({
          title: 'Aconteceu um erro',
          body: e.message,
          type: 'error',
        })
      }
    },
  })

  // #endregion

  // #region FORM DATA
  const {
    usuarioTipo,
    nome,
    sobrenome,
    ativo,
    nomeUsuario,
    senha,
    repetirSenha,
    empresa,
  } = dataForm({
    touched,
    errors,
    getFieldProps,
  })

  // #endregion

  return (
    <form
      className="row justify-content-center needs-validation"
      noValidate
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isSubmitting) handleSubmit(e)
      }}>
      <div className="row col-md-12 g-3 mt-0">
        {/* Dados */}
        <div className="col-md-12">
          <FormLabel>Dados</FormLabel>
          <div className="row">
            <FormGroupSelect
              field={usuarioTipo}
              required
              value={usuarioTipo.field.value.idUsuarioTipo}
              className="col-md-12"
              label="Tipo de usuário"
              onChange={e => {
                setFieldValue(usuarioTipo.field.name, {
                  idUsuarioTipo: Number(e.target.value),
                })
              }}
              disabled={readOnly}
              messageError={errors.usuarioTipo?.idUsuarioTipo}>
              <option value={null}>
                {!dataUsuarioTipo ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataUsuarioTipo || []).map(item => {
                return (
                  <option key={item.idUsuarioTipo} value={item.idUsuarioTipo}>
                    {item.descricaoUsuarioTipo}
                  </option>
                )
              })}
            </FormGroupSelect>

            <FormGroupInput
              field={nome}
              required
              classNameFormGroup="col-md-6"
              type="text"
              label="Nome"
              mask="none"
              readOnly={readOnly}
              messageError={errors.nome}
            />
            <FormGroupInput
              field={sobrenome}
              required
              classNameFormGroup="col-md-6"
              type="text"
              label="Sobrenome"
              mask="none"
              readOnly={readOnly}
              messageError={errors.sobrenome}
            />
            <FormGroupInput
              field={nomeUsuario}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="E-mail"
              mask="none"
              readOnly={readOnly}
              messageError={errors.nomeUsuario}
            />
            {propsModal?.action === 'create' && (
              <>
                <FormGroupInput
                  field={senha}
                  required
                  classNameFormGroup="col-md-12"
                  type="password"
                  label="Senha"
                  mask="none"
                  readOnly={readOnly}
                  messageError={errors.senha}
                />
                <FormGroupInput
                  field={repetirSenha}
                  required
                  classNameFormGroup="col-md-12"
                  type="password"
                  label="Confirmar senha"
                  mask="none"
                  readOnly={readOnly}
                  messageError={errors.repetirSenha}
                />{' '}
              </>
            )}
            <div className="form-group">
              <Checkbox
                label="Ativo"
                id={ativo.field.name}
                name={ativo.field.name}
                onChange={ativo.field.onChange}
                checked={ativo.field.value === true}
                readOnly={readOnly}
                disabled={readOnly}
                className="col-md-4"
                style={{
                  placeSelf: 'flex-end',
                  height: '46px',
                  color: '#612D91',
                }}
                value={ativo.field.value === true ? 1 : 0}
                onBlur={ativo.field.onBlur}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        {!readOnly && (
          <Button
            type="button"
            state={status}
            onSucess={() => {
              handleReset(null)
              closeModal(idModal, usuario)
              setStatus(BUTTON_STATE.NOTHING)
            }}
            buttonSize="md"
            onClick={e => {
              e.preventDefault()
              if (!isSubmitting) handleSubmit()
            }}
            disabled={!dataUsuarioTipo}
            className="btn btn-primary ms-auto">
            Salvar
          </Button>
        )}
        <Button
          type="button"
          className="btn"
          data-dismiss="modal"
          onClick={() => {
            handleReset(null)
            closeModal(idModal)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormCadastrarUsuario