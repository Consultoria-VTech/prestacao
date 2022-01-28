import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { alterar, cadastrar } from '../../../../services/contratoImpostoService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ContratoImposto } from '../../../../types/models/contratoImposto'
import { Imposto } from '../../../../types/models/imposto'
import { TOAST_CONTAINER } from '../../../../util/constants'
import { formatNumberPtBrToUs } from '../../../../util/numberUtil'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group/index'
import { ModalFooter } from '../../modal'
import { dataForm } from './formData'
import { validation } from './validation'

const FormCadastrarContratoImposto: React.FC = () => {
  const { closeModal, getData, getAction } = useModal<ContratoImposto>(
    ModalEnum.createContratoImposto
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const Router = useRouter()
  const [contratoImposto, setContratoImposto] = useState<ContratoImposto>()

  const { data: dataImposto } = useFetch<Imposto[]>(`/api/impostos/consultar`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: ContratoImposto = dataModal || {
    id: null,
    imposto: { id: null },
    contrato: { id: Number(Router.query.id) },
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

    onSubmit: async (values: ContratoImposto) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)
        values.percentual = formatNumberPtBrToUs(values.percentual)
        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(data => {
              alertUpdateSuccess()
              setContratoImposto(data as ContratoImposto)
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
              setContratoImposto(data as ContratoImposto)
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
  const { imposto, percentual } = dataForm({
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
              field={imposto}
              required
              value={imposto.field.value?.id}
              className="col-md-12"
              label="Imposto"
              onChange={e => {
                setFieldValue(imposto.field.name, {
                  id: Number(e.target.value),
                })
              }}
              disabled={readOnly || propsModal?.action === 'update'}
              messageError={errors.imposto?.id}>
              <option value={null}>
                {!dataImposto ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataImposto || []).map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.descricao}
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
              closeModal(ModalEnum.createContratoImposto, contratoImposto)
              setStatus(BUTTON_STATE.NOTHING)
            }}
            disabled={!dataImposto}
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
            closeModal(ModalEnum.createContratoImposto)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormCadastrarContratoImposto
