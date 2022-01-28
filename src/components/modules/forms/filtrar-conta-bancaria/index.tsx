import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useAuth } from '../../../../context/authContext'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Banco } from '../../../../types/models/banco'
import { ContaBancariaFiltro } from '../../../../types/models/contaBancaria'
import { TipoContaBancaria, TOAST_CONTAINER } from '../../../../util/constants'
import { leftPad } from '../../../../util/stringUtil'
import Alert, { alertError } from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group/index'
import { ModalFooter } from '../../modal'
import { dataForm } from './formData'

const FormFiltrarContaBancaria: React.FC = () => {
  const idModal = ModalEnum.filterContaBancaria
  const { user } = useAuth()

  const { data: dataBanks } = useFetch<Banco[]>(`/api/banks/consultar`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })

  const { closeModal, getData, getAction } = 
    useModal<ContaBancariaFiltro>(idModal)

  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: ContaBancariaFiltro = dataModal || {
    id: null,
    idBanco: null,
    agencia: null,
    agenciaDv: null,
    conta: null,
    contaDv: null,
    tipo: null,
    ativo: false,
    idEmpresa: null,
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
    validateOnBlur: propsModal?.action !== 'read',
    initialValues: initialValues,

    onSubmit: async (values: ContaBancariaFiltro) => {
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
  const { id, idBanco, agencia, agenciaDv, conta, contaDv, tipo, ativo } =
  dataForm({
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
            <FormGroupSelect
              field={idBanco}
              required
              value={idBanco.field.value}
              className="col-md-12"
              label="Banco"
              onChange={e => setFieldValue('idBanco', e.target.value)}
              messageError={errors.idBanco}>
              <option value="">{!dataBanks ? 'Carregando...' : 'Todos'}</option>
              {(dataBanks || []).map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {leftPad(item.bankId, 3)} - {item.name}
                  </option>
                )
              })}
            </FormGroupSelect>

            <FormGroupInput
              field={agencia}
              required
              classNameFormGroup="col-md-3"
              type="text"
              mask="number"
              label="Agência"
              readOnly={readOnly}
              messageError={errors.agencia}
            />
            <FormGroupInput
              field={agenciaDv}
              required
              classNameFormGroup="col-md-1"
              type="text"
              mask="number"
              label="DV"
              maxLength={1}
              readOnly={readOnly}
              messageError={errors.agenciaDv}
            />
            <FormGroupInput
              field={conta}
              required
              classNameFormGroup="col-md-4"
              type="text"
              label="Conta"
              mask="number"
              readOnly={readOnly}
              messageError={errors.conta}
            />
            <FormGroupInput
              field={contaDv}
              required
              classNameFormGroup="col-md-1"
              type="text"
              mask="number"
              label="DV"
              maxLength={1}
              readOnly={readOnly}
              messageError={errors.contaDv}
            />
            <FormGroupSelect
              field={tipo}
              required
              value={tipo.field.value}
              className="col-md-12"
              label="Tipo"
              onChange={tipo.field.onChange}
              disabled={readOnly}
              messageError={errors.tipo}>
              <option value="">Todos</option>
              {TipoContaBancaria.map(item => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              })}
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
          disabled={!dataBanks}
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

export default FormFiltrarContaBancaria
