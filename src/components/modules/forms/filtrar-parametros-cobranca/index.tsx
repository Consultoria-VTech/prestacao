import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useAuth } from '../../../../context/authContext'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ParametrosCobrancaFiltros } from '../../../../types/models/parametrosCobranca'
import Alert from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group'
import { ModalFooter } from '../../modal'
import { dataForm } from './formData'

const FormCadastrarParametrosCobranca: React.FC = () => {
  const idModal = ModalEnum.filterParametroCobranca

  const { user } = useAuth()

  const { closeModal, getData, getAction } =
    useModal<ParametrosCobrancaFiltros>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: ParametrosCobrancaFiltros = dataModal || {
    id: null,
    descricao: null,
    tipo: null,
    ativo: null,
    idEmpresa: user?.empresa?.id,
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
    validateOnBlur: propsModal?.action !== 'read',
    initialValues: initialValues,

    onSubmit: async (values: ParametrosCobrancaFiltros) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)
        values.idEmpresa = user.empresa.id
        // const parametro = values
        // parametro.tipo = !!+parametro.tipo

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
  const { id, tipo, ativo, descricao } = dataForm({
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
              messageError={errors.descricao}
            />
            <FormGroupSelect
              field={tipo}
              required
              value={tipo.field.value as string}
              className="col-md-12"
              label="Tipo"
              onChange={tipo.field.onChange}
              messageError={errors.tipo}>
              <option value="">Todos</option>
              <option value="false">Despesa</option>
              <option value="true">Receita</option>
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

            if (!isSubmitting) {
              handleSubmit()
            }
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

export default FormCadastrarParametrosCobranca
