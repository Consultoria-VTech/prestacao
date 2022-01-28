import { format } from 'date-fns'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import Checkbox from '~/components/elements/checkbox'
import {
  ContaBancaria,
  ContasReceber,
  Empresa,
  PlanoContas,
} from '~/types/models'
import { useAuth } from '../../../../context/authContext'
import { useFetch } from '../../../../hooks/useFetch'
import { ErrorData } from '../../../../services/api/api'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { TOAST_CONTAINER } from '../../../../util/constants'
import { formatMoney, leftPad } from '../../../../util/stringUtil'
import Alert, { alertError, alertUpdateSuccess } from '../../../elements/alert'
import DatePickerCustom from '../../../elements/datePicker'
import { FormLabel } from '../../../elements/label'
import { ModalFooter } from '../../modal'
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { useModal } from './../../../../hooks/useModal'
import { baixarContasReceber } from './../../../../services/contasReceberService'
import { formatNumberPtBrToUs } from './../../../../util/numberUtil'
import Button, { BUTTON_STATE } from './../../../elements/button/index'
import { FormGroupInput, FormGroupSelect } from './../../form-group/index'
import { dataForm } from './formData'
import { FormConciliarReceberStyled } from './styles'
import { validation } from './validation'

type Inputs = {
  empresa: Empresa
  idcr: number
  idcontaBancaria: ContaBancaria
  valorConciliado: number
  dtbaixa: string | Date
  situacao: 'PAGO'
  valorParcela: ContasReceber
  valorConta: number
  idplanodecontas: PlanoContas
  valorResto: number
  ativo: boolean
  saldoinicial: string | number
}
const FormBaixarContasReceber: React.FC = () => {
  const idModal = ModalEnum.baixarContasReceber
  const { user } = useAuth()
  const { closeModal, getData, getAction } = useModal<ContasReceber>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const [contasReceber, setContasReceber] = useState<ContasReceber>()
  const [checked, setChecked] = useState(true)
  const readOnly = propsModal?.action === 'read'

  const { data: dataContaBancaria } = useFetch<ContaBancaria[]>(
    `/api/contasbancarias/consultar`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  const { data: dataPlanoContas } = useFetch<PlanoContas[]>(
    `/api/planocontas/consultarTodosResumido`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: Inputs = {
    valorConta: dataModal?.valorParcela as number,
    empresa: user.empresa,
    idcr: null,
    idcontaBancaria: { id: null },
    valorConciliado: null,
    dtbaixa: null,
    situacao: 'PAGO',
    valorParcela: null,
    idplanodecontas: { id: null },
    valorResto: null,
    ativo: true,
    saldoinicial: null
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

        // values.valorConciliado = values.valorConciliado.replace(",", ".")

        await baixarContasReceber(
          (values.empresa.id = user.empresa.id),
          (values.idcr = dataModal.id),
          values.idcontaBancaria.id,
          formatNumberPtBrToUs(values.valorConciliado),
          (values.dtbaixa = format(
            values.dtbaixa as Date,
            'yyyy-MM-dd hh:mm:ss'
          )),
          values.situacao,
          values.idplanodecontas.id,
          formatNumberPtBrToUs(values.valorResto)
        )
          .then(data => {
            alertUpdateSuccess(
              TOAST_CONTAINER.modal,
              'Conta a receber conciliada com sucesso!'
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

  const {
    valorConciliado,
    idcontaBancaria,
    dtbaixa,
    idplanodecontas,
    valorResto,
    ativo,
  } = dataForm({
    touched,
    errors,
    getFieldProps,
  })
  // #endregion
  const handleChange = () => {
    // Change state to the opposite (to ture) when checkbox changes
    setChecked(!checked)
  }

  const { data: saldoConta } = useFetch<ContaBancaria>(
    `/api/conciliacao/saldo/${idcontaBancaria.field.value.id}`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  function validarSaldo() {
    let saldo = saldoConta.saldo
    if(saldo == undefined || null){
      return "R$ 0,00"
    } else {
      return formatMoney(saldoConta?.saldo as number)
    }
  }
  function validarSaldoInicial() {
    let saldo = saldoConta.saldoinicial
    if(saldo == undefined || null){
      return "R$ 0,00"
    } else {
      return formatMoney(saldoConta?.saldoinicial as number)
    }
  }



  return (
    <FormConciliarReceberStyled>
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
                label="Código Conta a Receber"
                readOnly={true}
              />

              <FormGroupInput
                value={formatMoney(dataModal?.valorParcela)}
                required
                classNameFormGroup="col-md-6"
                type="text"
                readOnly={true}
                mask="currencyModal"
                label="Valor a Receber"
              />

              <FormGroupInput
                field={valorConciliado}
                required
                classNameFormGroup="col-md-6"
                type="text"
                placeholder="0,00"
                mask="currency"
                label="Valor Recebido"
                max={dataModal?.valorConciliado}
                messageError={errors.valorConciliado}
              />
              <FormLabel></FormLabel>

              <FormGroupSelect
                field={idcontaBancaria}
                required
                value={idcontaBancaria.field.value.id}
                className="col-md-12"
                label={`Conta Bancária - Saldos: Inicial - ${saldoConta ? validarSaldoInicial() : ' Carregando...'}   Atual -  ${saldoConta ? validarSaldo() : ' Carregando...'}`}
                onChange={e => {
                  setFieldValue(idcontaBancaria.field.name, {
                    id: Number(e.target.value),
                  })
                }}
                messageError={errors.idcontaBancaria?.id}>
                <option value={null}>
                  {!dataContaBancaria ? 'Carregando...' : 'Selecionar'}
                </option>
                {(dataContaBancaria || [])
                  .filter(p => p.ativo)
                  .map(item => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.banco.bankId} - {item.banco.name} Ag.{' '}
                        {item.agencia}
                        {item.agenciaDv && `-${item.agenciaDv} `}
                        Con. {item.conta}-{item.contaDv}
                      </option>
                    )
                  })}
              </FormGroupSelect>
              <DatePickerCustom
                className="col-md-12"
                label="Data Recebimento"
                onBlur={dtbaixa.field.onBlur}
                isInvalid={dtbaixa.isInvalid}
                messageError={errors.dtbaixa}
                value={dtbaixa.field.value}
                name={dtbaixa.field.name}
                popperPlacement={'top'}
                onChange={date => setFieldValue(dtbaixa.field.name, date)}
              />

              <div className="form-group">
                <Checkbox
                  label="Pagamento Total"
                  id={ativo.field.name}
                  name={ativo.field.name}
                  onChange={handleChange}
                  checked={checked}
                  className="col-md-4"
                  style={{
                    placeSelf: 'flex-end',
                    height: '46px',
                    color: '#612D91',
                  }}
                  value={ativo.field.value === true ? 1 : 0}
                  onBlur={ativo.field.onBlur}
                />
              </div>

              {!checked && (
                <div>
                  <FormLabel></FormLabel>
                  <FormLabel>Motivo Dif. Valor</FormLabel>
                  <div className="main-container">
                    <div className="form-valorResto">
                      <FormGroupInput
                        field={valorResto}
                        classNameFormGroup="col-md-12"
                        type="text"
                        placeholder="0,00"
                        mask="currency"
                        label="Valor"
                        messageError={errors.valorResto}
                      />
                    </div>
                    <div className="form-natureza">
                      <FormGroupSelect
                        field={idplanodecontas}
                        value={idplanodecontas.field.value.id}
                        className="col-md-12"
                        label="Natureza"
                        onChange={e => {
                          setFieldValue(idplanodecontas.field.name, {
                            id: Number(e.target.value),
                          })
                        }}
                        disabled={readOnly}
                        messageError={errors.idplanodecontas?.id}>
                        <option value={null}>
                          {!dataPlanoContas ? 'Carregando...' : 'Selecionar'}
                        </option>
                        {(dataPlanoContas || [])
                          .filter(
                            p =>
                              !p.root &&
                              (p.ativo ||
                                p.id === idplanodecontas.field.value.id) &&
                              p.nivel >= 2 &&
                              p.observacao === 'R'
                          )
                          .map(item => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.hierarquia} - {item.descricao}
                              </option>
                            )
                          })}
                      </FormGroupSelect>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <ModalFooter className="mt-4 py-0 pt-3">
          <Button
            type="button"
            state={status}
            onSucess={() => {
              handleReset(null)
              closeModal(idModal, contasReceber)
              setStatus(BUTTON_STATE.NOTHING)
            }}
            buttonSize="md"
            onClick={e => {
              e.preventDefault()
              if (!isSubmitting) handleSubmit()
            }}
            disabled={!dataContaBancaria}
            className="btn btn-primary ms-auto">
            Conciliar
          </Button>
          <Button
            type="button"
            className="btn"
            data-dismiss="modal"
            onClick={() => {
              handleReset(null)
              closeModal(idModal)
            }}>
            Cancelar
          </Button>
        </ModalFooter>
      </form>
    </FormConciliarReceberStyled>
  )
}

export default FormBaixarContasReceber
