import {
  BUTTON_STATE,
} from '@components'
import { useAuth } from '@context'
import { useFetch, useImmutableValue, useModal } from '@hooks'
import {
  ModalEnum,
  PrestacaoDespesa,
  PrestacaoDespesaStatus,
  PrestacaoDespesaTipoReembolso,
} from '@types'
import {getFilename, TOAST_CONTAINER } from '@utils'
import { useFormik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { FormLabel } from '~/components/elements'
import Button from '~/components/elements/button'
import DropZonePreview from '~/components/elements/dropzone-preview'
import DropZonePreviewDespesa from '~/components/elements/dropzone-preview-despesa'
import { ErrorData } from '~/services/api/api'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from './../../../elements/alert/index'
import {
  alterar,
  alterarSituacao,
  cadastrar,
} from '~/services/prestacaoDespesaService'
import { FormGroupInput, FormGroupSelect } from '../../form-group'
import { ModalFooter } from '../../modal'
import { dataForm } from './formData'
import { validation } from './validation'
import DatePickerCustom from '~/components/elements/datePicker'
import DatePickerCustomDespesa from '~/components/elements/datePicker-despesa'
import { format } from 'date-fns'
import Select from '~/components/elements/select'
import Input from '~/components/elements/input'


const FormCadastrarPrestacaoDespesa: React.FC = () => {
  const idModal = ModalEnum.createPrestacaoDespesa
  const { closeModal, getData, getAction } = useModal<PrestacaoDespesa>(
    ModalEnum.createPrestacaoDespesa
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const ap = propsModal?.action === 'aprovar'
  const [prestacaoDespesa, setPrestacaoDespesa] = useState<PrestacaoDespesa>()
  const { user } = useAuth()

  const { data } = useFetch(
    dataModal?.id && `/api/prestacaodespesas/comprovante/${dataModal?.id}`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    },
    {
      //responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  )

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)
  const [statusAprovar, setStatusAprovar] = useState(BUTTON_STATE.NOTHING)
  const [statusReprovar, setStatusReprovar] = useState(BUTTON_STATE.NOTHING)
  const [salvando, setSalvando] = useState(false)
  const [validoDescricao, setValidoDescricao] = useState(true)
  const [validoTipoReembolso, setValidoTipoReembolso] = useState(true)
  const [validoValor, setValidoValor] = useState(true)
  const [validoComprovante, setValidoComprovante] = useState(true)

  const initialValues: PrestacaoDespesa = dataModal || {
    id: null,
    descricao: null,
    observacao: null,
    empresa: user.empresa,
    prestacaoContas: { id: null },
    valor: null,
    dtDespesa: null,
    tipoReembolso: null,
    status: null,
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

    onSubmit: async (values: PrestacaoDespesa) => {
      setSubmitting(true)
      const teste = values.valor.toString().replace('.', '')
      const teste2 = values.valor.toString()
      const regex = /,|_/;
      try {
        if (propsModal?.action !== 'aprovar') 
        setStatus(BUTTON_STATE.LOADING)

        const data = new FormData()
        data.append('id', values?.id?.toString() || null)
        data.append('descricao', values?.descricao)
        data.append('empresa', user.empresa?.id?.toString())
        data.append('prestacaoContas', values.prestacaoContas.id.toString())
        if(propsModal?.action === 'create' || regex.test(teste2))
        data.append('valor', teste.toString().replace(',', '.'))
        else if(regex.test(teste2) === false) 
        data.append('valor', values.valor.toString())
        data.append(
          'dtDespesa',
          format(values.dtDespesa as Date, 'yyyy-MM-dd hh:mm:ss')
        )
        data.append('tipoReembolso', values.tipoReembolso.toString())
        data.append('comprovante', values.comprovante)
        data.append('observacao', values?.observacao)
        data.append('quilometragem', values?.quilometragem || "0")

        if (
          propsModal?.action === 'update' ||
          propsModal?.action === 'aprovar'
        ) {
          await alterar(data)
            .then(dataValues => {
              if (propsModal?.action === 'update') {
                alertUpdateSuccess()
                setStatus(BUTTON_STATE.SUCCESS)
                setPrestacaoDespesa(dataValues as PrestacaoDespesa)
              }
            })
            .catch((e: ErrorData) => {
              alertError(e, TOAST_CONTAINER.modal)
              setStatus(BUTTON_STATE.ERROR)
            })
        } else {
          await cadastrar(data)
            .then(dataValues => {
              alertCreateSuccess()
              setPrestacaoDespesa(dataValues as PrestacaoDespesa)
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
  function validacaoComprovante() {
    if (comprovante.field.value === undefined || comprovante.field.value === null || !comprovante.field.value)
      setValidoComprovante(true)
    else{
      setValidoComprovante(false)
    }
  }

  function validacaoValor() {
    if (valor.field.value === undefined || valor.field.value === null || valor.field.value === "")
      setValidoValor(true)
    else{
      setValidoValor(false)
    }
  }

  function validacaoTipoReembolso() {
    if (tipoReembolso.field.value === undefined || tipoReembolso.field.value === null)
      setValidoTipoReembolso(true)
    else{
      setValidoTipoReembolso(false)
    }
  }

  function validacaoDescricao() {
    if (descricao.field.value === undefined || descricao.field.value === null || descricao.field.value === "Selecionar")
      setValidoDescricao(true)
    else{
      setValidoDescricao(false)
    }
  }

  function validacaoDataDespesa() {
    if (descricao.field.value === undefined || descricao.field.value === null || descricao.field.value === "Selecionar")
      setValidoDescricao(true)
    else{
      setValidoDescricao(false)
    }
  }

  React.useEffect(() => {
    if (!data) return

    if (data.data && data.data !== '' && data.status === 200) {
      const filename = getFilename(data?.headers)
      setFieldValue(comprovante.field.name, new File([data?.data], filename))
    }
  }, [data])


  // #endregion

  // #region FORM DATA
  const {
    descricao,
    observacao,
    quilometragem,
    status: statusPrestacao,
    valor,
    dtDespesa,
    tipoReembolso,
    comprovante,
  } = dataForm({
    touched,
    errors,
    getFieldProps,
  })
  // #endregion

  const alterarSituacaoDespesa = useCallback(
    async (novaSituacao: number) => {
      await alterarSituacao(dataModal?.id, novaSituacao)
        .then((data: PrestacaoDespesa) => {
          alertUpdateSuccess()
          setPrestacaoDespesa(data)

          if (novaSituacao === PrestacaoDespesaStatus.Aprovado)
            setStatusAprovar(BUTTON_STATE.SUCCESS)
          else setStatusReprovar(BUTTON_STATE.SUCCESS)
        })
        .catch(e => {
          alertError(e, TOAST_CONTAINER.modal)
          if (novaSituacao === PrestacaoDespesaStatus.Aprovado)
            setStatusAprovar(BUTTON_STATE.ERROR)
          else setStatusReprovar(BUTTON_STATE.ERROR)
        })
    },
    [dataModal?.id, prestacaoDespesa]
  )

  useEffect(() => {
    setSalvando(false)
    setValidoDescricao(true)
    setValidoTipoReembolso(true)
    setValidoValor(true)
    setValidoComprovante(true)
  }, [])

  useEffect(() => {
    validacaoComprovante()
  }, [comprovante.field.value])

  useEffect(() => {
    validacaoValor()
  }, [valor.field.value])

  useEffect(() => {
    validacaoDescricao()
  }, [descricao.field.value])

  useEffect(() => {
    validacaoTipoReembolso()
  }, [tipoReembolso.field.value])

  useEffect(()=>{
    const despesa  = new Date();
  }, [])
    //console.log(dtDespesa);
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
          <div className={`form-group py-1 ${ validoDescricao && salvando ? 'has-danger' : ''}`}>
                <label className="form-control-label">
                  Tipo de Despesa
                </label>
              <div
                className={validoDescricao && salvando ? 'position-relative alert-validate' : ''}
                style={{ flex: 1 }}
                data-validate= "Campo Obrigatório">
                <Select
                  className={`form-control col-md-12 ${validoDescricao && salvando ? 'pe-2-25 is-invalid' : ''}`}
                  disabled={readOnly || ap}
                  onChange={e => setFieldValue("descricao", e.target.value)}
                  value={descricao.field.value || null}
                  name="descricao">
                  <option value={null} selected={true}>Selecionar</option>
                  <option value="Almoço">Almoço</option>
                  <option value="Jantar">Jantar</option>
                  <option value="Quilometragem">Quilometragem</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Pedágio">Pedágio</option>
                  <option value="Táxi/Uber">Táxi/Uber</option>
                  <option value="Estacionamento">Estacionamento</option>
                  <option value="Passagem | Ônibus">Passagem | Ônibus</option>
                  <option value="Passagem | Metrô/Trem">Passagem | Metrô/Trem</option>
                  <option value="Cursos/Treinamentos">Cursos/Treinamentos</option>
                  <option value="Outros">Outros</option>
                </Select>
              </div>
            </div>

      
      <div className={`form-group py-1 col-md-6 ${ validoValor && salvando ? 'has-danger' : ''}`}>
                <label className="form-control-label">
                  Valor
                </label>
        <div className={validoValor && salvando ? 'position-relative alert-validate ' : ''}
              style={{ flex: 1 }}
              data-validate= "Campo Obrigatório">
                <Input
                  className={`form-control col-md-6 ${validoValor && salvando ? 'pe-2-25 is-invalid' : ''}`}
                  readOnly={readOnly || ap}
                  required
                  placeholder="0,00"
                  type="text"
                  value={valor.field.value}
                  name="valor"
                  mask="currency"
                  onChange={e => setFieldValue("valor", e.target.value)}
                />
            </div>
          </div>

        <div className={`form-group col-md-3 ${ validoValor && salvando ? 'has-danger' : ''}`}>
        <div className={validoValor && salvando ? 'position-relative alert-validate ' : ''}
              style={{ flex: 1 }}
              data-validate= "Campo Obrigatório">
                <DatePickerCustomDespesa
                  label="Data Despesa"
                  onBlur={dtDespesa.field.onBlur}
                  isInvalid={dtDespesa.isInvalid}
                  messageError={errors.dtDespesa}
                  readOnly={readOnly || ap}
                  value={dtDespesa.field.value}
                  name={dtDespesa.field.name}
                  popperPlacement="auto"
                  onChange={date => setFieldValue(dtDespesa.field.name, date)}
                />
            </div>
          </div>

            {descricao.field.value === 'Quilometragem' && (
                          <FormGroupInput
                            field={quilometragem}
                            classNameFormGroup="col-md-3"
                            type="text"
                            label="KM Rodados"
                            readOnly={readOnly || ap}
                            messageError={errors.quilometragem}
                          />
            )
            }

              <div className={`form-group py-1 ${validoTipoReembolso && salvando ? 'has-danger' : ''}`}>
                <label className="form-control-label">
                  Tipo de reembolso
                </label>
              <div
                className={validoTipoReembolso && salvando ? 'position-relative alert-validate' : ''}
                style={{ flex: 1 }}
                data-validate= "Campo Obrigatório">
                <Select
                  className={`form-control col-md-12 ${validoTipoReembolso && salvando ? 'pe-2-25 is-invalid' : ''}`}
                  disabled={readOnly || ap}
                  onChange={e => setFieldValue("tipoReembolso", e.target.value)}
                  value={tipoReembolso.field.value || null}
                  name="tipoReembolso">
                  <option value={null} selected={true}>
                    Selecionar
                  </option>  
                  {Object.keys(PrestacaoDespesaTipoReembolso)
                    .filter(
                      value =>
                        typeof PrestacaoDespesaTipoReembolso[value] === 'number'
                    )
                    .map(value => {
                      return (
                        <option
                          key={value}
                          value={PrestacaoDespesaTipoReembolso[value]}>
                          {value}
                        </option>
                      )
                    })}
                </Select>
              </div>
            </div>
            
            {/* <FormGroupSelect
              field={statusPrestacao}
              required
              value={statusPrestacao.field.value}
              className="col-md-12"
              label="Status"
              disabled={true}
              messageError={errors.status}>
              <option value={null} selected={true}>
                Selecionar
              </option>
              {Object.keys(PrestacaoDespesaStatus)
                .filter(
                  value => typeof PrestacaoDespesaStatus[value] === 'number'
                )
                .map(value => {
                  return (
                    <option key={value} value={PrestacaoDespesaStatus[value]}>
                      {value}
                    </option>
                  )
                })}
            </FormGroupSelect> */}
            <FormGroupInput
              field={observacao}
              classNameFormGroup="col-md-12"
              type="text"
              label="Observação"
              readOnly={readOnly || ap}
              messageError={errors.observacao}
            />

            <div className={`form-group col-md-12 py-2 has-danger`}>
                <label className="form-control-label">
                  Comprovante
                </label>
              <div
                className={validoComprovante && salvando ? 'alert-validate' : ''}
                style={ validoComprovante && salvando ? { flex: 1, display : 'none'} : { flex: 1}}
                data-validate= "Campo Obrigatório | Tamanho Max: 2mb"> 
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
                readOnly={readOnly || ap}
                containerVisible={!readOnly || !ap}
                accept={['image/*', 'application/pdf', '.doc', '.docx']}
                messageError={errors.comprovante?.toString()}
                loading={!readOnly && 
                          propsModal?.action !== 'aprovar' && 
                          propsModal?.action !== 'update'
                        ? false : !readOnly}
              />
            </div>

              {validoComprovante && salvando && 
              <div
                className={validoComprovante && salvando ? 'alert-validate' : ''}
                style={{ flex: 1}}
                data-validate= "Campo Obrigatório | Tamanho Max: 2mb"> 
                <DropZonePreviewDespesa
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
                readOnly={readOnly || ap}
                containerVisible={!readOnly || !ap}
                accept={['image/*', 'application/pdf', '.doc', '.docx']}
                messageError={errors.comprovante?.toString()}
                loading={data?.data}
                /> 
              </div>               
              }
          </div>
        </div>
      </div>
    </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        {!readOnly && propsModal?.action !== 'aprovar' && propsModal?.action !== 'update' &&(
          <Button
            type="button"
            state={status}
            onSucess={() => {
              location.reload()
              handleReset(null)
              closeModal(ModalEnum.createPrestacaoDespesa, prestacaoDespesa)
              // fetchData({ pageSize: pageSize, pageIndex: pageIndex })
              setStatus(BUTTON_STATE.NOTHING)
            }}
            buttonSize="md"
            onClick={e => {
              e.preventDefault()
              if (!isSubmitting && validoComprovante === false) handleSubmit()
              setSalvando(true)
              validacaoDescricao()
              validacaoTipoReembolso()
              validacaoValor()
              validacaoComprovante()
            }}
            className="btn btn-primary ms-auto">
            Salvar
          </Button>
        )}

        {!readOnly && propsModal?.action === 'update' && (
          <Button
            type="button"
            state={status}
            onSucess={() => {
              location.reload()
              handleReset(null)
              closeModal(ModalEnum.createPrestacaoDespesa, prestacaoDespesa)
              // fetchData({ pageSize: pageSize, pageIndex: pageIndex })
              setStatus(BUTTON_STATE.NOTHING)
            }}
            buttonSize="md"
            onClick={e => {
              e.preventDefault()
              if (!isSubmitting) handleSubmit()
              setSalvando(true)
              validacaoDescricao()
              validacaoTipoReembolso()
              validacaoValor()
              
            }}
            
            className="btn btn-primary ms-auto">
            Salvar
          </Button>
        )}

        
        {propsModal?.action === 'aprovar' && (
          <>
            <Button
              type="button"
              state={statusAprovar}
              onSucess={() => {
                location.reload()
                handleReset(null)
                closeModal(ModalEnum.createPrestacaoDespesa, prestacaoDespesa)
                setStatusAprovar(BUTTON_STATE.NOTHING)
              }}
              buttonSize="md"
              onClick={e => {
                e.preventDefault()
                if (!isSubmitting) {
                  setStatusAprovar(BUTTON_STATE.LOADING)
                  alterarSituacaoDespesa(PrestacaoDespesaStatus.Aprovado)
                }
              }}
              className="btn btn-primary ms-auto">
              Aprovar
            </Button>
            <Button
              type="button"
              state={statusReprovar}
              onSucess={() => {
                location.reload()
                handleReset(null)
                closeModal(ModalEnum.createPrestacaoDespesa, prestacaoDespesa)
                setStatusReprovar(BUTTON_STATE.NOTHING)
              }}
              buttonSize="md"
              onClick={e => {
                e.preventDefault()
                if (!isSubmitting) {
                  setStatusReprovar(BUTTON_STATE.LOADING)
                  alterarSituacaoDespesa(PrestacaoDespesaStatus.Reprovado)
                }
              }}
              className="btn btn-danger">
              Reprovar
            </Button>
          </>
        )}
        <Button
          type="button"
          className="btn"
          data-dismiss="modal"
          onClick={() => {
            handleReset(null)
            closeModal(ModalEnum.createPrestacaoDespesa)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormCadastrarPrestacaoDespesa