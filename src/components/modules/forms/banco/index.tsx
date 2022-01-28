import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ErrorData } from '../../../../services/api/api'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Banco } from '../../../../types/models/banco'
import { TOAST_CONTAINER } from '../../../../util/constants'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from '../../../elements/alert'
import { FormLabel } from '../../../elements/label'
import { ModalFooter } from '../../modal'
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { useModal } from './../../../../hooks/useModal'
import { alterar, cadastrar } from './../../../../services/bancoService'
import Button, { BUTTON_STATE } from './../../../elements/button/index'
import { FormGroupInput } from './../../form-group/index'
import { dataForm } from './formData'
import { validation } from './validation'

const FormCadastrarBanco: React.FC = () => {
  const { closeModal, getData, getAction } = useModal<Banco>(
    ModalEnum.createBanco
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [banco, setBanco] = useState<Banco>()

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: Banco = dataModal || {
    id: null,
    bankId: null,
    name: '',
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
  } = useFormik({
    enableReinitialize: true,
    validateOnBlur: propsModal?.action !== 'read',
    initialValues: initialValues,
    validationSchema,

    onSubmit: async (values: Banco) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)

        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(() => {
              alertUpdateSuccess()
              setBanco(values)
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
              setBanco(data as Banco)
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
  const { bankId, name } = dataForm({
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
              field={bankId}
              required
              classNameFormGroup="col-md-2"
              type="text"
              readOnly={readOnly}
              mask="number"
              label="Código"
              messageError={errors.bankId}
            />
            <FormGroupInput
              field={name}
              required
              classNameFormGroup="col-md-10"
              type="text"
              label="Nome"
              readOnly={readOnly}
              messageError={errors.name}
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
              closeModal(ModalEnum.createBanco, banco)
              // fetchData({ pageSize: pageSize, pageIndex: pageIndex })
              setStatus(BUTTON_STATE.NOTHING)
            }}
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
            closeModal(ModalEnum.createBanco)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormCadastrarBanco
