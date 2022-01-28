import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ClienteFiltro } from '../../../../types/models/cliente'
import Alert from '../../../elements/alert'
import { FormLabel } from '../../../elements/label'
import { ModalFooter } from '../../modal'
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { useModal } from './../../../../hooks/useModal'
import Button, { BUTTON_STATE } from './../../../elements/button/index'
import { FormGroupInput, FormGroupSelect } from './../../form-group/index'
import { dataForm } from './formData'

const FormFiltrarCliente: React.FC = () => {
  const idModal = ModalEnum.filterCliente
  const { closeModal, getData } = useModal<ClienteFiltro>(idModal)

  const { immutableValue: dataModal } = useImmutableValue(getData())

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: ClienteFiltro = dataModal || {
    idEmpresa: null,
    id: null,
    nome: '',
    cnpj: '',
    filial: '',
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

    onSubmit: async (values: ClienteFiltro) => {
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
  const { idempresa, id, nome, cnpj, ativo, filial } = dataForm({
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
              field={nome}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Nome"
            />

            <FormGroupInput
              field={cnpj}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="CNPJ"
              placeholder="99.999.999/0009-99"
              maxLength={18}
              mask="cpfCnpj"
            />
            <FormGroupSelect
              field={filial}
              required
              value={filial.field.value}
              className="col-md-12"
              label="Filial"
              onChange={filial.field.onChange}
              messageError={errors.filial}>
              <option value="">Todos</option>
              <option value="Filial">Filial</option>
              <option value="Matriz">Matriz</option>
            </FormGroupSelect>
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

export default FormFiltrarCliente
