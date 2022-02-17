import {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
  BUTTON_STATE,
} from '@components'
import { useAuth } from '@context'
import { useFetch, useImmutableValue, useModal } from '@hooks'
import {
  ModalEnum,
  Funcionario,
  Usuario,
} from '@types'
import { TOAST_CONTAINER } from '@utils'
import { useFormik } from 'formik'
import { useState } from 'react'
import { FormLabel } from '~/components/elements'
import Alert from '~/components/elements/alert'
import Button from '~/components/elements/button'
import { ErrorData } from '~/services/api/api'
import { vincular } from '~/services/funcionarioService'
import { FormGroupSelect } from '../../form-group'
import { ModalFooter } from '../../modal'
import { dataForm } from './formData'
import { validation } from './validation'

export const FormVincularUsuarioFuncionario = () => {
  const { closeModal, getData, getAction } = useModal<Funcionario>(
    ModalEnum.vincularUsuario
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [funcionario, setFuncionario] = useState<Funcionario>()
  const { user } = useAuth()

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: Funcionario = dataModal || {
    usuario: {idUsuario: null}
  }

  const validationSchema = validation()
  const {
    getFieldProps,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleReset,
    setFieldValue,
    setFieldError,
  } = useFormik({
    enableReinitialize: true,
    validateOnBlur: propsModal?.action !== 'read',
    initialValues: initialValues,
    validationSchema,

    onSubmit: async (values: Funcionario) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)
          await vincular(dataModal?.id, values)
            .then(data => {
              alertUpdateSuccess()
              setFuncionario(data as Funcionario)
              setStatus(BUTTON_STATE.SUCCESS)
            })
            .catch((e: ErrorData) => {
              alertError(e, TOAST_CONTAINER.modal)
              setStatus(BUTTON_STATE.ERROR)
            })

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
  const {usuario} =
    dataForm({
      touched,
      errors,
      getFieldProps,
    })
  // #endregion

  const { data: dataUsuarios } = useFetch<Usuario[]>(
    `/api/usuarios/consultar`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

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
          <FormLabel>SELECIONE O USUÁRIO A SER VINCULADO:</FormLabel>
          <div className="row">
            <FormGroupSelect
              field={usuario}
              required
              value={usuario.field.value?.idUsuario}
              className="col-md-12"
              label="Usuários"
              onChange={e => {
                setFieldValue(usuario.field.name, {
                  idUsuario: String(e.target.value),
                })
              }}
              disabled={false}
              messageError={errors.usuario?.idUsuario}>
              <option value={null}>
                {!dataUsuarios ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataUsuarios || []).map(item => {
                return (
                  <option key={item.idUsuario} value={item.idUsuario}>
                    {item.nome} {item.sobrenome}
                  </option>
                )
              })}
            </FormGroupSelect>
          </div>
        </div>
      </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        <Button
          type="button"
          state={status}
          disabled={!usuario.field.value?.idUsuario}
          onSucess={() => {
            handleReset(null)
            closeModal(ModalEnum.vincularUsuario)
            setStatus(BUTTON_STATE.NOTHING)
          }}
          buttonSize="md"
          onClick={e => {
            e.preventDefault()
            if (!isSubmitting) handleSubmit()
          }}
          className="btn btn-primary ms-auto">
          Confirmar
        </Button>
        <Button
          type="button"
          className="btn"
          data-dismiss="modal"
          onClick={() => {
            handleReset(null)
            closeModal(ModalEnum.vincularUsuario)
          }}>
          Cancelar
        </Button>
      </ModalFooter>
    </form>
  )
}