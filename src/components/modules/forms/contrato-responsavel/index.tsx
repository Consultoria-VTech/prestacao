import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuth } from '../../../../context/authContext'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import {
  alterar,
  cadastrar,
} from '../../../../services/contratoResponsavelService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ContratoResponsavel } from '../../../../types/models/contratoResponsavel'
import { Funcionario } from '../../../../types/models/funcionario'
import { TOAST_CONTAINER } from '../../../../util/constants'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group/index'
import { ModalFooter } from '../../modal'
import { formatNumberPtBrToUs } from './../../../../util/numberUtil'
import Checkbox from './../../../elements/checkbox/index'
import { dataForm } from './formData'
import { validation } from './validation'

const FormCadastrarContratoResponsavel: React.FC = () => {
  const { closeModal, getData, getAction } = useModal<ContratoResponsavel>(
    ModalEnum.createContratoResponsavel
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const Router = useRouter()
  const [contrato, setContratoResponsavel] = useState<ContratoResponsavel>()
  const { user } = useAuth()

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

  const initialValues: ContratoResponsavel = dataModal || {
    id: null,
    funcionario: { id: null },
    admin: false,
    contrato: { id: Number(Router.query.id) },
    empresa: user.empresa,
    percentual: null,
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

    onSubmit: async (values: ContratoResponsavel) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)
        values.percentual = formatNumberPtBrToUs(values.percentual)
        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(data => {
              alertUpdateSuccess()
              setContratoResponsavel(data as ContratoResponsavel)
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
              setContratoResponsavel(data as ContratoResponsavel)
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
  const { funcionario, admin, percentual } = dataForm({
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
            <FormGroupInput
              field={percentual}
              required
              classNameFormGroup="col-md-12"
              type="text"
              placeholder="0,00"
              label="Percentual"
              mask="currency"
              readOnly={readOnly}
              messageError={errors.percentual}
            />
            <div className="form-group">
              <Checkbox
                label="Administrador"
                id={admin.field.name}
                name={admin.field.name}
                onChange={admin.field.onChange}
                checked={admin.field.value === true}
                readOnly={readOnly}
                disabled={readOnly}
                className="col-md-4"
                style={{
                  placeSelf: 'flex-end',
                  height: '46px',
                  color: '#612D91',
                }}
                value={admin.field.value === true ? 1 : 0}
                onBlur={admin.field.onBlur}
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
              closeModal(ModalEnum.createContratoResponsavel, contrato)
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
            closeModal(ModalEnum.createContratoResponsavel)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormCadastrarContratoResponsavel
