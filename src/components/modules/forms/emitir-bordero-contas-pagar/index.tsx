import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { emitirBordero } from '../../../../services/contasPagarService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ContaBancaria } from '../../../../types/models/contaBancaria'
import { ContasPagar } from '../../../../types/models/contasPagar'
import { TOAST_CONTAINER } from '../../../../util/constants'
import { leftPad } from '../../../../util/stringUtil'
import Alert, { alertError, alertUpdateSuccess } from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group/index'
import { ModalFooter } from '../../modal'
import { formatNumberPtBrToUs } from './../../../../util/numberUtil'
import { validation } from './validation'
import { format } from 'date-fns'
import DatePickerCustom from '../../../elements/datePicker'
import { Conciliacao } from '../../../../types/models/conciliacao'

type Inputs = {
  valorBaixa: number
  valorConta: number
  contaBancaria: ContaBancaria
  dtBaixa: string | Date
  conciliacao: Conciliacao
}
const FormEmitirBordero: React.FC = () => {
  const idModal = ModalEnum.emitirBorderoContasPagar
  const { closeModal, getData, getAction } = useModal<ContasPagar>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const [contasPagar, setContasPagar] = useState<ContasPagar>()
  const readOnly = propsModal?.action === 'read'

  // const { data: dataContaBancaria } = useFetch<ContaBancaria[]>(
  //   `/api/contasbancarias/consultar`,
  //   {
  //     revalidateOnReconnect: true,
  //     onError: error => {
  //       alertError(error, TOAST_CONTAINER.modal)
  //     },
  //   }
  // )

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: Inputs = {
    valorConta: dataModal?.valor as number,
    valorBaixa: null,
    contaBancaria: { id: null },
    dtBaixa: null,
    conciliacao: null
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

    onSubmit: async values => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)
          
        await emitirBordero(dataModal.id)
          .then(data => {
            alertUpdateSuccess(
              TOAST_CONTAINER.modal,
              'Conta a pagar estornada com sucesso!'
            )
            setContasPagar(data as ContasPagar)
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
          <FormLabel>Deseja gerar o lançamento a baixo ?</FormLabel>
          <div className="row">
            <FormGroupInput
              required
              value={leftPad(dataModal?.id, 6)}
              classNameFormGroup="col-md-12"
              type="text"
              label="Código Conta a Pagar"
              readOnly={true}
            />
          </div>
        </div>
      </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        <Button
          type="button"
          state={status}
          onSucess={() => {
            handleReset(null)
            closeModal(idModal)
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
            closeModal(idModal)
          }}>
          Cancelar
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormEmitirBordero
