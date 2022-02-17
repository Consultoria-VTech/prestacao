import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ErrorData } from '../../../../services/api/api'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ContaBancaria } from '../../../../types/models/contaBancaria'
import { ContasReceber } from '../../../../types/models/contasReceber'
import { TOAST_CONTAINER } from '../../../../util/constants'
import { leftPad } from '../../../../util/stringUtil'
import Alert, { alertError, alertUpdateSuccess } from '../../../elements/alert'
import DatePickerCustom from '../../../elements/datePicker'
import { FormLabel } from '../../../elements/label'
import { ModalFooter } from '../../modal'
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { useModal } from './../../../../hooks/useModal'
import { emitirNfsContasReceber } from './../../../../services/contasReceberService'
import Button, { BUTTON_STATE } from './../../../elements/button/index'
import { FormGroupInput, FormGroupSelect } from './../../form-group/index'
import { validation } from './validation'
import { dataForm } from './formData'
import { useFetch } from '../../../../hooks/useFetch'
import { format } from 'date-fns'
import { formatNumberPtBrToUs } from './../../../../util/numberUtil'

type Inputs = {
  valorBaixa: number
  valorConta: number
  contaBancaria: ContaBancaria
  dtBaixa: string | Date
}
const FormEmitirNFSContasReceber: React.FC = () => {
  const { closeModal, getData, getAction } = useModal<ContasReceber>(
    ModalEnum.emitirNFSContasReceber
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const [contasReceber, setContasReceber] = useState<ContasReceber>()
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

        await emitirNfsContasReceber(dataModal.id)
          
          .then(data => {
            alertUpdateSuccess(
              TOAST_CONTAINER.modal,
              'Conta a receber emitida com sucesso!'
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

  const { valorBaixa, contaBancaria, dtBaixa } = dataForm({
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
          <FormLabel>Deseja emitir a NF a seguir ?</FormLabel>
          <div className="row">
            <FormGroupInput
              required
              value={leftPad(dataModal?.id, 6)}
              classNameFormGroup="col-md-12"
              type="text"
              label="Código Conta a Receber"
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
            location.reload()
            handleReset(null)
            closeModal(ModalEnum.emitirNFSContasReceber)
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
            closeModal(ModalEnum.emitirNFSContasReceber)
          }}>
          Cancelar
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormEmitirNFSContasReceber
