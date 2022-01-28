import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { renegociarContasReceber } from '../../../../services/contasReceberService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ContasReceber } from '../../../../types/models/contasReceber'
import { ParametrosCobranca } from '../../../../types/models/parametrosCobranca'
import { TOAST_CONTAINER } from '../../../../util/constants'
import { formatNumberPtBrToUs } from '../../../../util/numberUtil'
import { formatMoney, leftPad } from '../../../../util/stringUtil'
import Alert, { alertError, alertUpdateSuccess } from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group/index'
import { ModalFooter } from '../../modal'
import { dataForm } from './formData'
import { validation } from './validation'

type Inputs = {
  valor: number
  parametroCobranca: ParametrosCobranca
  valorConta: number
}
const FormRenegociarContasReceber: React.FC = () => {
  const idModal = ModalEnum.renegociarContasReceber
  const { closeModal, getData, getAction } = useModal<ContasReceber>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const [contasReceber, setContasReceber] = useState<ContasReceber>()

  const { data: dataParametrosCobranca } = useFetch<ParametrosCobranca[]>(
    `/api/parametroscobranca/consultar`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: Inputs = {
    valor: null,
    valorConta: dataModal?.valor as number,
    parametroCobranca: { id: null },
  }

  const validationSchema = validation()
  const {
    getFieldProps,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    handleReset,
  } = useFormik({
    enableReinitialize: true,
    validateOnBlur: propsModal?.action !== 'read',
    initialValues: initialValues,
    validationSchema,

    onSubmit: async values => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)

        await renegociarContasReceber(
          dataModal.id,
          values.parametroCobranca.id,
          formatNumberPtBrToUs(values.valor)
        )
          .then(data => {
            alertUpdateSuccess(
              TOAST_CONTAINER.modal,
              'Conta a receber renegociada com sucesso!'
            )
            setContasReceber(data as ContasReceber)
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

  const { valor, parametroCobranca } = dataForm({
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
            <FormGroupInput
              required
              value={leftPad(dataModal?.id, 6)}
              classNameFormGroup="col-md-12"
              type="text"
              label="Conta a pagar"
              readOnly={true}
            />

            <FormGroupInput
              value={dataModal?.valor}
              required
              classNameFormGroup="col-md-6"
              type="text"
              readOnly={true}
              mask="currency"
              label="Valor da conta"
            />

            <FormGroupInput
              field={valor}
              required
              classNameFormGroup="col-md-6"
              type="text"
              mask="currency"
              label="Valor a renegociar"
              max={dataModal?.valor}
              messageError={errors.valor}
            />
            <FormGroupSelect
              field={parametroCobranca}
              required
              value={parametroCobranca.field.value.id}
              className="col-md-12"
              label="Parâmetro de Cobrança"
              onChange={e =>
                setFieldValue('parametroCobranca', { id: e.target.value })
              }
              messageError={errors.parametroCobranca?.id}>
              <option value={null}>
                {!dataParametrosCobranca ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataParametrosCobranca || []).map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.descricao} - {formatMoney(item.taxa as number)}
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
          onSucess={() => {
            handleReset(null)
            closeModal(idModal, contasReceber)
            setStatus(BUTTON_STATE.NOTHING)
          }}
          buttonSize="md"
          onClick={e => {
            e.preventDefault()
            if (!isSubmitting) handleSubmit()
          }}
          disabled={!dataParametrosCobranca}
          className="btn btn-primary ms-auto">
          Renegociar
        </Button>
        <Button
          type="button"
          className="btn"
          data-dismiss="modal"
          onClick={() => {
            handleReset(null)
            closeModal(idModal)
          }}>
          Cancelar
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormRenegociarContasReceber
