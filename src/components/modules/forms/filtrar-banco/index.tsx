import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { BancoFiltros } from '../../../../types/models/banco'
import Alert from '../../../elements/alert'
import { FormLabel } from '../../../elements/label'
import { ModalFooter } from '../../modal'
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { useModal } from './../../../../hooks/useModal'
import Button, { BUTTON_STATE } from './../../../elements/button/index'
import { FormGroupInput } from './../../form-group/index'
import { dataForm } from './formData'

const FormFiltrarBanco: React.FC = () => {
  const { closeModal, getData } = useModal<BancoFiltros>(ModalEnum.filterBanco)

  const { immutableValue: dataModal } = useImmutableValue(getData())

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: BancoFiltros = dataModal || {
    bankId: null,
    name: '',
  }

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
    initialValues: initialValues,

    onSubmit: async (values: BancoFiltros) => {
      try {
        setSubmitting(true)
        closeModal(ModalEnum.filterBanco, values)
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
          <FormLabel>Filtros</FormLabel>
          <div className="row">
            <FormGroupInput
              field={bankId}
              required
              classNameFormGroup="col-md-12"
              type="text"
              mask="number"
              label="Código"
              messageError={errors.bankId}
            />
            <FormGroupInput
              field={name}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Nome"
              messageError={errors.name}
            />
          </div>
        </div>
      </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        <Button
          type="button"
          state={status}
          buttonSize="md"
          onClick={e => {
            e.preventDefault()
            if (!isSubmitting) handleSubmit()
          }}
          className="btn btn-primary ms-auto">
          Filtrar
        </Button>
        <Button
          type="button"
          className="btn"
          data-dismiss="modal"
          onClick={() => {
            handleReset(null)
            closeModal(ModalEnum.filterBanco)
          }}>
          Fechar
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormFiltrarBanco
