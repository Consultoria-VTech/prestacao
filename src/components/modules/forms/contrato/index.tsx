import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useAuth } from '../../../../context/authContext'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { alterar, cadastrar } from '../../../../services/contratoService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { CentroCusto } from '../../../../types/models/centroCusto'
import { Cliente } from '../../../../types/models/cliente'
import { Contrato } from '../../../../types/models/contrato'
import { Fornecedor } from '../../../../types/models/fornecedor'
import { NumeroParcelas, TOAST_CONTAINER } from '../../../../util/constants'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group/index'
import { ModalFooter } from '../../modal'
import { useFetch } from './../../../../hooks/useFetch'
import { formatNumberPtBrToUs } from './../../../../util/numberUtil'
import DatePickerCustom from './../../../elements/datePicker/index'
import { dataForm } from './formData'
import { validation } from './validation'

const FormCadastrarContrato: React.FC = () => {
  const { closeModal, getData, getAction } = useModal<Contrato>(
    ModalEnum.createContrato
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [contrato, setContrato] = useState<Contrato>()
  const [checked, setChecked] = useState(true)
  const { user } = useAuth()

  const { data: dataCliente } = useFetch<Cliente[]>(`/api/clientes/consultar`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })

  const { data: dataFornecedor } = useFetch<Fornecedor[]>(
    `/api/fornecedores/consultar`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  const { data: dataCentroCusto } = useFetch<CentroCusto[]>(
    `/api/centrocustos/consultar`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: Contrato = dataModal || {
    id: null,
    cliente: { id: null },
    fornecedor: { id: null },
    empresa: user.empresa,
    centroCusto: { id: null },
    observacao: null,
    dtEmissao: null,
    dtVencimento: null,
    valor: null,
    status: null,
    nparcelas: 1,
    tipo: null,
    parcelas: null,
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
    setFieldError,
  } = useFormik({
    enableReinitialize: true,
    validateOnBlur: propsModal?.action !== 'read',
    initialValues: initialValues,
    validationSchema,

    onSubmit: async (values: Contrato) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)

        values.valor = formatNumberPtBrToUs(values.valor)

        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(data => {
              alertUpdateSuccess()
              setContrato(data as Contrato)
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
              setContrato(data as Contrato)
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

  const handleChange = () => {
    // Change state to the opposite (to ture) when checkbox changes
    setChecked(!checked)
  }
  // #endregion

  // #region FORM DATA
  const {
    cliente,
    fornecedor,
    centroCusto,
    observacao,
    dtEmissao,
    dtVencimento,
    valor,
    status: StatusField,
    nparcelas,
    tipo,
    parcelas
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
          <FormLabel>Dados</FormLabel>
          <div className="row">
            <FormGroupSelect
              field={tipo}
              required
              value={tipo.field.value}
              className="col-md-12"
              label="Tipo"
              onChange={e => {
                setFieldValue(cliente.field.name, { id: null })
                setFieldValue(fornecedor.field.name, { id: null })
                setFieldError(cliente.field.name, null)
                setFieldError(fornecedor.field.name, null)
                setFieldValue(tipo.field.name, e.target.value)
              }}
              disabled={readOnly || propsModal?.action === 'update'}
              messageError={errors.tipo}>
              <option value="">Selecionar</option>
              <option value="CR">Contas a Receber</option>
              <option value="CP">Contas a Pagar</option>
            </FormGroupSelect>
            {tipo.field.value === 'CP' ? (
              <FormGroupSelect
                field={fornecedor}
                required
                value={fornecedor.field.value.id}
                className="col-md-12"
                label="Fornecedor"
                onChange={e => {
                  setFieldValue(fornecedor.field.name, {
                    id: Number(e.target.value),
                  })
                }}
                disabled={readOnly || propsModal?.action === 'update'}
                messageError={errors.fornecedor?.id}>
                <option value={null}>
                  {!dataFornecedor ? 'Carregando...' : 'Selecionar'}
                </option>
                {tipo.field.value &&
                  (dataFornecedor || []).map(item => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.razao}
                      </option>
                    )
                  })}
              </FormGroupSelect>
            ) : (
              <FormGroupSelect
                field={cliente}
                required
                value={cliente.field.value.id}
                className="col-md-12"
                label="Cliente"
                onChange={e => {
                  setFieldValue(cliente.field.name, {
                    id: Number(e.target.value),
                  })
                }}
                disabled={readOnly || propsModal?.action === 'update'}
                messageError={errors.cliente?.id}>
                <option value={null}>
                  {!dataCliente ? 'Carregando...' : 'Selecionar'}
                </option>
                {tipo.field.value &&
                  (dataCliente || []).map(item => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.nome}
                      </option>
                    )
                  })}
              </FormGroupSelect>
            )}

            <FormGroupSelect
              field={centroCusto}
              required
              value={centroCusto.field.value.id}
              className="col-md-12"
              label="Centro de custo"
              onChange={e => {
                setFieldValue(centroCusto.field.name, {
                  id: Number(e.target.value),
                })
              }}
              disabled={readOnly}
              messageError={errors.centroCusto?.id}>
                <option value={null}>
                  {!dataCentroCusto ? 'Carregando...' : 'Selecionar'}
                </option>
              {(dataCentroCusto || [])
                .filter(p => p.ativo)
                .map(item => {
                  return (
                    
                    <option key={item.id} value={item.id}>
                      {item.descricao}
                    </option>
                  )
                })}
            </FormGroupSelect>

            <DatePickerCustom
              className="col-md-4"
              label="Data emissão"
              onBlur={dtEmissao.field.onBlur}
              isInvalid={dtEmissao.isInvalid}
              messageError={errors.dtEmissao}
              readOnly={readOnly}
              value={dtEmissao.field.value}
              name={dtEmissao.field.name}
              popperPlacement="top"
              onChange={date => setFieldValue(dtEmissao.field.name, date)}
            />
            <DatePickerCustom
              className="col-md-4"
              label="Data vencimento 1ª parcela"
              onBlur={dtVencimento.field.onBlur}
              isInvalid={dtVencimento.isInvalid}
              messageError={errors.dtVencimento}
              readOnly={readOnly}
              value={dtVencimento.field.value}
              name={dtVencimento.field.name}
              popperPlacement="top"
              onChange={date => setFieldValue(dtVencimento.field.name, date)}
            />
            <FormGroupInput
              field={valor}
              required
              classNameFormGroup="col-md-4"
              type="text"
              placeholder="0,00"
              label="Valor"
              mask="currency"
              readOnly={readOnly}
              // messageError={errors.valor}
            />

            <FormGroupSelect
              field={parcelas}
              required
              value={parcelas.field.value}
              className="col-md-4"
              label="Parcelas"
              disabled={readOnly}
              messageError={errors.parcelas}>
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </FormGroupSelect>

            {parcelas.field.value === 'sim' && (
              <FormGroupSelect
                field={nparcelas}
                required
                value={nparcelas.field.value}
                className="col-md-4"
                label="Número de Parcelas"
                disabled={readOnly}
                messageError={errors.nparcelas}>
                
                {NumeroParcelas.map((item, index) => (
                  <option key={item} value={item} selected={index === 0}>
                    {item}
                  </option>
                ))}
              </FormGroupSelect>
            )}

            {/* <FormGroupSelect
              field={nparcelas}
              required
              value={nparcelas.field.value}
              className="col-md-3"
              label="Qtd. Parcelas"
              disabled={readOnly}
              messageError={errors.nparcelas}>
              <option value={null} selected={true}>
                Selecionar
              </option>
              {NumeroParcelas.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </FormGroupSelect> */}
            <FormGroupInput
              field={observacao}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Observação"
              readOnly={readOnly}
              messageError={errors.observacao}
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
              closeModal(ModalEnum.createContrato, contrato)
              // fetchData({ pageSize: pageSize, pageIndex: pageIndex })
              setStatus(BUTTON_STATE.NOTHING)
            }}
            disabled={!dataCliente}
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
            closeModal(ModalEnum.createContrato)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormCadastrarContrato
