import { Funcionario, ModalEnum, ProjetoResponsavel } from '@types'
import { TOAST_CONTAINER } from '@utils'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { ModalFooter } from 'react-bootstrap-v5'
import {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
  BUTTON_STATE,
  FormLabel,
} from '~/components/elements'
import Alert from '~/components/elements/alert'
import Button from '~/components/elements/button'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import {
  alterar,
  cadastrar,
} from '../../../../services/projetoResponsavelService'
import { FormGroupSelect } from '../../form-group'
import { dataForm } from './formData'
import { validation } from './validation'

export const FormCadastrarProjetoResponsavel = () => {
  const { closeModal, getData, getAction } = useModal<ProjetoResponsavel>(
    ModalEnum.createProjetoResponsavel
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const Router = useRouter()
  const [projeto, setProjetoResponsavel] = useState<ProjetoResponsavel>()

  const { data: dataFuncionario } = useFetch<Funcionario[]>(
    `/api/funcionarios/consultar`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: ProjetoResponsavel = dataModal || {
    id: null,
    funcionario: { id: null },
    projeto: { id: Number(Router.query.id) },
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
  } = useFormik({
    enableReinitialize: true,
    validateOnBlur: propsModal?.action !== 'read',
    initialValues: initialValues,
    validationSchema,

    onSubmit: async (values: ProjetoResponsavel) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)
        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(data => {
              alertUpdateSuccess()
              setProjetoResponsavel(data as ProjetoResponsavel)
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
              setProjetoResponsavel(data as ProjetoResponsavel)
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
  const { funcionario } = dataForm({
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
              field={funcionario}
              required
              value={funcionario.field.value?.id}
              className="col-md-12"
              label="Funcionário"
              onChange={e => {
                setFieldValue(funcionario.field.name, {
                  id: Number(e.target.value),
                })
              }}
              disabled={readOnly || propsModal?.action === 'update'}
              messageError={errors.funcionario?.id}>
              <option value={null}>
                {!dataFuncionario ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataFuncionario || []).map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                )
              })}
            </FormGroupSelect>
          </div>
        </div>
      </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        {!readOnly && (
          <Button
            type="button"
            state={status}
            onSucess={() => {
              location.reload()
              handleReset(null)
              closeModal(ModalEnum.createProjetoResponsavel, projeto)
              setStatus(BUTTON_STATE.NOTHING)
            }}
            disabled={!dataFuncionario}
            buttonSize="md"
            onClick={e => {
              e.preventDefault()
              if (!isSubmitting) handleSubmit()
            }}
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
            closeModal(ModalEnum.createProjetoResponsavel)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </form>
  )
}