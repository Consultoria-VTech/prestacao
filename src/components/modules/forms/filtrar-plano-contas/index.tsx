import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import {
  PlanoContas,
  PlanoContasFiltro,
} from '../../../../types/models/planoContas'
import { TOAST_CONTAINER } from '../../../../util/constants'
import Alert from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group/index'
import { ModalFooter } from '../../modal'
import { alertError } from './../../../elements/alert/index'
import { dataForm } from './formData'
import { consultar } from '../../../../services/planoContasService'

const FormFiltrarPlanoContas: React.FC = () => {
  const idModal = ModalEnum.filterPlanoContas
  const { closeModal, getData } = useModal<PlanoContasFiltro>(idModal)

  const { immutableValue: dataModal } = useImmutableValue(getData())

  const { data: dataFetch } = useFetch<PlanoContas[]>(
    `/api/planocontas/consultar`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: PlanoContasFiltro = dataModal || {
    descricao: '',
  }

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
    initialValues: initialValues,

    onSubmit: async (values: PlanoContasFiltro) => {
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
  const {
    descricao,
  } = dataForm({
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
            {/* <FormGroupInput
              field={id}
              required
              classNameFormGroup="col-md-12"
              type="text"
              mask="number"
              label="Código"
            /> */}
            {/* <FormGroupSelect
              field={idPlanoContasSintetica}
              required
              value={idPlanoContasSintetica.field.value}
              className="col-md-12"
              label="Plano"
              onChange={e =>
                setFieldValue('idPlanoContasSintetica', e.target.value)
              }>
              <option value="">{!dataFetch ? 'Carregando...' : 'Todos'}</option>
              {(dataFetch || [])
                .filter(p => !p.root && p.ativo)
                .map(item => {
                  return (
                    <option
                      key={item.id}
                      value={item.id}
                      style={{
                        fontWeight: Number(item.nivel) <= 2 ? 500 : 'normal',
                      }}>
                      {item.hierarquia} - {item.descricao}
                    </option>
                  )
                })}
            </FormGroupSelect> */}
            <FormGroupInput
              field={descricao}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Descrição"
            />
            {/* <FormGroupSelect
              field={receitaOuDespesa}
              required
              value={receitaOuDespesa.field.value}
              className="col-md-12"
              label="Tipo"
              onChange={receitaOuDespesa.field.onChange}
              messageError={errors.receitaOuDespesa}>
              <option value="">Todos</option>
              <option value="true">Despesa</option>
              <option value="false">Receita</option>
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
            </FormGroupSelect> */}
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

export default FormFiltrarPlanoContas