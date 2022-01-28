import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useAuth } from '../../../../context/authContext'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { alterar, cadastrar } from '../../../../services/conciliacaoService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Conciliacao } from '../../../../types/models/conciliacao'
import { ContaBancaria } from '../../../../types/models/contaBancaria'
import { TipoSaldo, TOAST_CONTAINER } from '../../../../util/constants'
import { leftPad } from '../../../../util/stringUtil'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import DatePickerCustom from '../../../elements/datePicker'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group'
import { ModalFooter } from '../../modal'
import { formatNumberPtBrToUs } from './../../../../util/numberUtil'
import { dataForm } from './formData'
import { validation } from './validation'
import { format } from 'date-fns'

const FormCadastrarConciliacao: React.FC = () => {
  const idModal = ModalEnum.createConciliacao
  const { user } = useAuth()
  const { closeModal, getData, getAction } = useModal<Conciliacao>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [conciliacao, setConciliacao] = useState<Conciliacao>()

  const { data: dataContaBancaria } = useFetch<ContaBancaria[]>(
    `/api/contasbancarias/consultar`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)
  const [startDate, setStartDate] = useState(new Date())

  const initialValues: Conciliacao = dataModal || {
    contaBancaria: { id: null },
    valor: null,
    tipo: null,
    dataConciliacao: null,
    dataPagamento: null,
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
    validateOnBlur: true,
    initialValues: initialValues,
    validationSchema,

    onSubmit: async (values: Conciliacao) => {
      setSubmitting(true)

      try {
        setStatus(BUTTON_STATE.LOADING)

        values.dataPagamento = format(values.dataPagamento as Date, 'yyyy-MM-dd hh:mm:ss'),
        values.dataConciliacao = format(values.dataConciliacao as Date, 'yyyy-MM-dd hh:mm:ss'),
        values.valor = formatNumberPtBrToUs(values.valor).toString()
        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(data => {
              alertUpdateSuccess()
              setConciliacao(data as Conciliacao)
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
              setConciliacao(data as Conciliacao)
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
  const { contaBancaria, valor, tipo, dataConciliacao, dataPagamento } =
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
          <FormLabel>Dados</FormLabel>
          <div className="row">
            <FormGroupInput
              required
              value={leftPad(dataModal?.id, 6)}
              classNameFormGroup="col-md-12"
              type="text"
              label="ID / Código"
              readOnly={true}
            />
            <FormGroupSelect
              field={contaBancaria}
              required
              value={contaBancaria.field.value.id}
              className="col-md-12"
              label="Conta bancária"
              onChange={e => {
                setFieldValue(contaBancaria.field.name, {
                  id: Number(e.target.value),
                })
              }}
              disabled={readOnly}
              messageError={errors.contaBancaria?.id}>
              <option value={null}>
                {!dataContaBancaria ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataContaBancaria || [])
                .filter(p => p.ativo)
                .map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.banco.bankId} - {item.banco.name} Ag. {item.agencia}
                      {item.agenciaDv && `-${item.agenciaDv} `}
                      Con. {item.conta}-{item.contaDv}
                    </option>
                  )
                })}
            </FormGroupSelect>
            <FormGroupSelect
              field={tipo}
              required
              value={tipo.field.value}
              className="col-md-6"
              label="Tipo"
              onChange={tipo.field.onChange}
              disabled={readOnly}
              messageError={errors.tipo}>
              <option value={null} selected={true}>
                Selecionar
              </option>
              {TipoSaldo.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </FormGroupSelect>
            <FormGroupInput
              field={valor}
              required
              classNameFormGroup="col-md-6"
              type="text"
              placeholder="0,00"
              label="Valor"
              mask="currency"
              readOnly={readOnly}
              messageError={errors.valor}
            />
            <DatePickerCustom
              className="col-md-6"
              label="Data Rec. / Pag."
              isInvalid={dataPagamento.isInvalid}
              messageError={errors.dataPagamento}
              value={dataPagamento.field.value}
              name={dataPagamento.field.name}
              popperPlacement={'top'}
              onChange={date => setFieldValue(dataPagamento.field.name, date)}
            />
            <DatePickerCustom
              className="col-md-6"
              label="Data Conciliação"
              onBlur={dataConciliacao.field.onBlur}
              isInvalid={dataConciliacao.isInvalid}
              messageError={errors.dataConciliacao}
              value={dataConciliacao.field.value}
              name={dataConciliacao.field.name}
              popperPlacement={'top'}
              onChange={date => setFieldValue(dataConciliacao.field.name, date)}
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
              closeModal(idModal, conciliacao)
              setStatus(BUTTON_STATE.NOTHING)
            }}
            buttonSize="md"
            onClick={e => {
              e.preventDefault()
              if (!isSubmitting) handleSubmit()
            }}
            disabled={!dataContaBancaria}
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

export default FormCadastrarConciliacao
