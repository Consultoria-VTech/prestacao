import { formatNumberPtBrToUs } from '@utils'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../../../context/authContext'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { alterar, cadastrar } from '../../../../services/contaBancariaService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Banco } from '../../../../types/models/banco'
import { ContaBancaria } from '../../../../types/models/contaBancaria'
import { TipoPessoa, TipoContaBancaria, TOAST_CONTAINER } from '../../../../util/constants'
import { leftPad } from '../../../../util/stringUtil'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import Checkbox from '../../../elements/checkbox'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group/index'
import { ModalFooter } from '../../modal'
import { useFetch } from './../../../../hooks/useFetch'
import { dataForm } from './formData'
import { validation } from './validation'

const FormCadastrarContaBancaria: React.FC = () => {
  const idModal = ModalEnum.createContaBancaria
  const { user } = useAuth()

  const { data: dataBanks } = useFetch<Banco[]>(`/api/banks/consultar`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })

  const { closeModal, getData, getAction } = useModal<ContaBancaria>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [contaBancaria, setContaBancaria] = useState<ContaBancaria>()

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: ContaBancaria = dataModal || {
    id: null,
    banco: { id: null },
    agencia: null,
    agenciaDv: null,
    conta: null,
    contaDv: null,
    saldoinicial: null,
    tipo: null,
    tipo_pessoa: null,
    ativo: true,
    observacao: '',
    empresa: user.empresa,
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

    onSubmit: async (values: ContaBancaria) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)

        values.saldoinicial = formatNumberPtBrToUs(values.saldoinicial)
        values.empresa = user.empresa
        
        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(() => {
              alertUpdateSuccess()
              setContaBancaria(values)
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
              setContaBancaria(data as ContaBancaria)
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
  
  // #endregion,

  // #region FORM DATA
  const { banco, agencia, agenciaDv, conta, contaDv, saldoinicial, tipo, tipo_pessoa,  ativo } = dataForm({
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
            <FormGroupSelect
              field={banco}
              required
              value={banco.field.value.id}
              className="col-md-12"
              label="Banco"
              onChange={e => setFieldValue('banco', { id: e.target.value })}
              disabled={readOnly}
              messageError={errors.banco?.id}>
              <option value={null}>
                {!dataBanks ? 'Carregando...' : 'Selecionar'}
              </option>
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
            <FormGroupInput
                field={saldoinicial}
                required
                classNameFormGroup="col-md-12"
                type="text"
                placeholder="0,00"
                mask="currencyNegative"
                label="Saldo Inicial"
                readOnly={readOnly}
                messageError={errors.saldoinicial}
              />
            <FormGroupSelect
              field={tipo}
              required
              value={tipo.field.value}
              className="col-md-6"
              label="Tipo"
              onChange={tipo.field.onChange}
              disabled={readOnly}
              messageError={errors.tipo}>
              <option value={null}>Selecionar</option>
              {TipoContaBancaria.map(item => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              })}
            </FormGroupSelect>
            <FormGroupSelect
              field={tipo_pessoa}
              required
              value={tipo_pessoa.field.value}
              className="col-md-6"
              label="Tipo"
              onChange={tipo_pessoa.field.onChange}
              disabled={readOnly}
              messageError={errors.tipo}>
              <option value={null}>Selecionar</option>
              {TipoPessoa.map(item => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              })}
            </FormGroupSelect>

            <div className="form-group col-md-12">
              <Checkbox
                label="Ativo"
                id={ativo.field.name}
                name={ativo.field.name}
                onChange={ativo.field.onChange}
                checked={ativo.field.value === true}
                readOnly={readOnly}
                disabled={readOnly}
                // className="col-md-4 p-0 d-flex"
                style={{
                  placeSelf: 'flex-start',
                  height: '46px',
                  color: '#612D91',
                  fontSize: '.875rem',
                }}
                value={ativo.field.value === true ? 1 : 0}
                onBlur={ativo.field.onBlur}
              />
            </div>
          </div>
          {/* Observação */}
          {/* <div className="col-md-12">
            <label
              htmlFor={observacao.field.name}
              className="form-control-label">
              Observação
            </label>
            <textarea
              style={{
                height: 84,
              }}
              className="form-control"
              rows={4}
              onChange={observacao.field.onChange}
              onBlur={observacao.field.onBlur}
              readOnly={readOnly}
              value={observacao.field.value}
              name={observacao.field.name}
              id={observacao.field.name}
            />
          </div> */}
        </div>
      </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        {!readOnly && (
          <Button
            type="button"
            state={status}
            disabled={!dataBanks}
            onSucess={() => {
              handleReset(null)
              closeModal(idModal, contaBancaria)
              // fetchData({ pageSize: pageSize, pageIndex: pageIndex })
              setStatus(BUTTON_STATE.NOTHING)
            }}
            buttonSize="md"
            onClick={e => {
              e.preventDefault()

              if (!isSubmitting) {
                handleSubmit()
              }
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
            closeModal(idModal)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormCadastrarContaBancaria
