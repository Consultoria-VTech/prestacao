import { format } from 'date-fns'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useAuth } from '../../../../context/authContext'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { alterar, cadastrar } from '../../../../services/contasReceberService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Cliente } from '../../../../types/models/cliente'
import { CentroCusto } from '../../../../types/models/centroCusto'
import { ContasReceber } from '../../../../types/models/contasReceber'
import { Contrato } from '../../../../types/models/contrato'
import { PlanoContas } from '../../../../types/models/planoContas'
import { NumeroParcelas, TOAST_CONTAINER } from '../../../../util/constants'
import { leftPad } from '../../../../util/stringUtil'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import DatePickerCustom from '../../../elements/datePicker'
import DropZonePreview from '../../../elements/dropzone-preview'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group'
import { ModalFooter } from '../../modal'
import { TipoDocumento } from './../../../../util/constants'
import { getFilename } from './../../../../util/getResponseHeaderValue'
import { formatNumberPtBrToUs } from './../../../../util/numberUtil'
import { FormHr } from './../../form-group/index'
import { dataForm } from './formData'
import { validation } from './validation'

const FormCadastrarContasReceber: React.FC = () => {
  const idModal = ModalEnum.createContasReceber
  const { user } = useAuth()
  const { closeModal, getData, getAction } = useModal<ContasReceber>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [contaReceber, setContasReceber] = useState<ContasReceber>()

  const { data: dataPlanoContas } = useFetch<PlanoContas[]>(
    `/api/planocontas/consultarTodosResumido`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  const { data: dataCliente } = useFetch<Cliente[]>(`/api/clientes/consultar`, {
    revalidateOnReconnect: true,
    onError: error => {
      alertError(error, TOAST_CONTAINER.modal)
    },
  })

  // const { data: dataContaBancaria } = useFetch<ContaBancaria[]>(
  //   `/api/contasbancarias/consultar`,
  //   {
  //     revalidateOnReconnect: true,
  //     onError: error => {
  //       alertError(error, TOAST_CONTAINER.modal)
  //     },
  //   }
  // )

  const { data } = useFetch(
    `/api/contasreceber/comprovante?id=${dataModal?.id}`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    },
    {
      // responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  )

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: ContasReceber = dataModal || {
    id: null,
    empresa: user.empresa,
    planoContas: { id: null },
    cliente: { id: null },
    centroCusto: { id: null },
    contrato: { id: null },
    contaBancaria: { id: null },
    valor: null,
    dtEmissao: null,
    dtVencimento: null,
    tipoDoc: null,
    nDoc: '',
    comprovante: null,
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
    validateOnBlur: true,
    initialValues: initialValues,
    validationSchema,

    onSubmit: async (values: ContasReceber) => {
      setSubmitting(true)

      try {
        setStatus(BUTTON_STATE.LOADING)
        const data = new FormData()

        data.append('id', values?.id?.toString() || null)
        data.append('empresa', user.empresa?.id?.toString())
        data.append('planoContas', values.planoContas.id.toString())
        data.append('centroCusto', values.centroCusto.id.toString())
        data.append('cliente', values.cliente.id.toString())
        //data.append('contrato', values.contrato.id.toString())
        data.append('valor', formatNumberPtBrToUs(values.valor).toString())
        // data.append('valorBaixa')
        data.append(
          'dtEmissao',
          format(values.dtEmissao as Date, 'yyyy-MM-dd hh:mm:ss')
        )
        data.append(
          'dtVencimento',
          format(values.dtVencimento as Date, 'yyyy-MM-dd hh:mm:ss')
        )
        // data.append('dtBaixa')
        // data.append('contaBancaria', values.contaBancaria.id.toString())
        data.append('tipoDoc', values.tipoDoc)
        data.append('nDoc', values.nDoc)
        // data.append('status')
        //data.append('nParcelas', values.nParcelas.toString() || "0")
        // data.append('renegociacao')
        data.append('comprovante', values.comprovante)

        if (propsModal?.action === 'update') {
          await alterar(data)
            .then(data => {
              alertUpdateSuccess()
              setContasReceber(data as ContasReceber)
              setStatus(BUTTON_STATE.SUCCESS)
            })
            .catch((e: ErrorData) => {
              alertError(e, TOAST_CONTAINER.modal)
              setStatus(BUTTON_STATE.ERROR)
            })
        } else {
          await cadastrar(data)
            .then(data => {
              alertCreateSuccess()
              setContasReceber(data as ContasReceber)
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
  const {
    planoContas,
    cliente,
    contrato,
    centroCusto,
    // contaBancaria,
    valor,
    dtEmissao,
    dtVencimento,
    tipoDoc,
    nDoc,
    //nParcelas,
    comprovante,
  } = dataForm({
    touched,
    errors,
    getFieldProps,
  })

  React.useEffect(() => {
    if (!data) return

    if (data.data && data.data !== '' && data.status === 200) {
      const filename = getFilename(data?.headers)
      setFieldValue(comprovante.field.name, new File([data?.data], filename))
    }
  }, [data])

  // const { data: dataContrato } = useFetch<Contrato[]>(
  //   cliente.field.value &&

  //       `/api/contratoscliente/${cliente.field.value?.id}`,
  //   {
  //     revalidateOnReconnect: true,
  //     onError: error => {
  //       alertError(error, TOAST_CONTAINER.modal)
  //     },
  //   }
  // )
  
  const { data: dataCentroCusto } = useFetch<CentroCusto[]>(
    `/api/centrocustos/consultar`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

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
              field={cliente}
              required
              value={cliente.field.value.id}
              className="col-md-12"
              label="Cliente"
              onChange={e => {
                setFieldValue(contrato.field.name, { id: null })
                setFieldError(contrato.field.name, null)
                setFieldValue(cliente.field.name, {
                  id: Number(e.target.value),
                })
              }}
              disabled={readOnly}
              messageError={errors.cliente?.id}>
              <option value={null}>
                {!dataCliente ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataCliente || []).map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                )
              })}
            </FormGroupSelect>

            {/* <FormGroupSelect
              field={contrato}
              required
              value={contrato.field.value?.id}
              className="col-md-12"
              label="Contrato"
              onChange={e => {
                setFieldValue(contrato.field.name, {
                  id: Number(e.target.value),
                })
              }}
              disabled={readOnly || !cliente.field.value.id}
              messageError={errors.contrato?.id}>
              <option value={null}>
                {!dataContrato ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataContrato || [])
                .filter(p => p.status.toUpperCase() === 'Aberto'.toUpperCase())
                .map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {`${leftPad(item.id, 6)} - Emi. ${format(
                        new Date(item.dtEmissao),
                        'dd/MM/yyyy'
                      )} Ven. ${format(
                        new Date(item.dtVencimento),
                        'dd/MM/yyyy'
                      )}`}
                    </option>
                  )
                })}
            </FormGroupSelect> */}

            <FormGroupSelect
              field={planoContas}
              required
              value={planoContas.field.value.id}
              className="col-md-12"
              label="Natureza"
              onChange={e => {
                setFieldValue(planoContas.field.name, {
                  id: Number(e.target.value),
                })
              }}
              disabled={readOnly}
              messageError={errors.planoContas?.id}>
              <option value={null}>
                {!dataPlanoContas ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataPlanoContas || [])
                .filter(
                  p =>
                    !p.root &&
                    (p.ativo || p.id === planoContas.field.value.id) &&
                    p.nivel >= 3 &&
                    !p.receitaOuDespesa
                )
                .map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.hierarquia} - {item.descricao}
                    </option>
                  )
                })}
            </FormGroupSelect>

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
                .filter(p => p.ativo || p.id === centroCusto.field.value.id)
                .map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.descricao}
                    </option>
                  )
                })}
            </FormGroupSelect>
          </div>
        </div>
        {/* Conta a Receber */}
        <div className="col-md-12">
          <FormHr />
          <FormLabel>Receita</FormLabel>
          <div className="row">
            <FormGroupInput
              field={valor}
              required
              classNameFormGroup="col-md-3"
              type="text"
              placeholder="0,00"
              label="Valor"
              mask="currency"
              readOnly={readOnly}
              messageError={errors.valor}
            />
            {/* <FormGroupSelect
              field={nParcelas}
              required
              value={nParcelas.field.value}
              className="col-md-3"
              label="Parcelas"
              disabled={readOnly}
              messageError={errors.nParcelas}>
              <option value={null} selected={true}>
                Selecionar
              </option>
              {NumeroParcelas.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </FormGroupSelect> */}
            <DatePickerCustom
              className="col-md-3"
              label="Data emissão"
              onBlur={dtEmissao.field.onBlur}
              isInvalid={dtEmissao.isInvalid}
              messageError={errors.dtEmissao}
              readOnly={readOnly}
              value={dtEmissao.field.value}
              name={dtEmissao.field.name}
              onChange={date => setFieldValue(dtEmissao.field.name, date)}
            />
            <DatePickerCustom
              className="col-md-3"
              label="Data vencimento"
              onBlur={dtVencimento.field.onBlur}
              isInvalid={dtVencimento.isInvalid}
              messageError={errors.dtVencimento}
              readOnly={readOnly}
              value={dtVencimento.field.value}
              name={dtVencimento.field.name}
              onChange={date => setFieldValue(dtVencimento.field.name, date)}
            />
          </div>
        </div>

        {/* Documento */}
        <div className="col-md-12">
          <FormHr />
          <FormLabel>Documento</FormLabel>
          <div className="row">
            {/* <FormGroupSelect
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
            </FormGroupSelect> */}
            <FormGroupSelect
              field={tipoDoc}
              required
              value={tipoDoc.field.value}
              className="col-md-3"
              label="Tipo de documento"
              onChange={tipoDoc.field.onChange}
              disabled={readOnly}
              messageError={errors.tipoDoc}>
              <option value={null} selected={true}>
                Selecionar
              </option>
              {TipoDocumento.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </FormGroupSelect>

            <FormGroupInput
              field={nDoc}
              required
              classNameFormGroup="col-md-3"
              type="text"
              label="Número documento"
              readOnly={readOnly}
              messageError={errors.nDoc}
            />

            <div className="col-md-12 py-2">
              <label
                className="form-control-label"
                htmlFor={comprovante.field.name}>
                Comprovante
              </label>
              <DropZonePreview
                multiFile={false}
                initialFiles={
                  comprovante.field.value ? [comprovante.field.value] : []
                }
                onChange={files => {
                  setFieldValue(comprovante.field.name, files)
                }}
                onBlur={comprovante.field.onBlur}
                isInvalid={comprovante.isInvalid}
                name={comprovante.field.name}
                readOnly={readOnly}
                containerVisible={!readOnly}
                accept={['image/*', 'application/pdf', '.doc', '.docx']}
                messageError={errors.comprovante?.toString()}
                loading={!data?.data}
              />
            </div>
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
              closeModal(idModal, contaReceber)
              setStatus(BUTTON_STATE.NOTHING)
            }}
            buttonSize="md"
            onClick={e => {
              e.preventDefault()
              if (!isSubmitting) handleSubmit()
            }}
            // disabled={
            //   dataPlanoContas || !dataCliente || !dataContrato || !data?.data
            // }
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

export default FormCadastrarContasReceber
