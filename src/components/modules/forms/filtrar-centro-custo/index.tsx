import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { CentroCustoFiltro } from '../../../../types/models/centroCusto'
import Alert from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group/index'
import { ModalFooter } from '../../modal'
import { dataForm } from './formData'

const FormFiltrarCentroCusto: React.FC = () => {
  const idModal = ModalEnum.filterCentroCusto
  const { closeModal, getData } = useModal<CentroCustoFiltro>(idModal)

  const { immutableValue: dataModal } = useImmutableValue(getData())

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: CentroCustoFiltro = dataModal || {
    idEmpresa: null,
    id: null,
    descricao: '',
    ativo: null,
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

    onSubmit: async (values: CentroCustoFiltro) => {
      try {
        setSubmitting(true)
        closeModal(idModal, values)
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
  const { idempresa, id, descricao, ativo } = dataForm({
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
              field={id}
              required
              classNameFormGroup="col-md-12"
              type="text"
              mask="number"
              label="Código"
            />
            <FormGroupInput
              field={descricao}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Descrição"
            />
            <FormGroupSelect
              field={ativo}
              required
              value={ativo.field.value as string}
              className="col-md-12"
              label="Ativo"
              onChange={ativo.field.onChange}>
              <option value="">Todos</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </FormGroupSelect>
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
            closeModal(idModal)
          }}>
          Fechar
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormFiltrarCentroCusto
