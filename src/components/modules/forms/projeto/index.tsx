import {
    alertCreateSuccess,
    alertError,
    alertUpdateSuccess,
    BUTTON_STATE,
  } from '@components'
  import { useAuth } from '@context'
  import { useFetch, useImmutableValue, useModal } from '@hooks'
  import { Contrato, ModalEnum, Projeto, ProjetoSituacaoEnum } from '@types'
  import { formatNumberPtBrToUs, leftPad, TOAST_CONTAINER } from '@utils'
  import format from 'date-fns/format'
  import { useFormik } from 'formik'
  import { useState } from 'react'
  import { FormLabel } from '~/components/elements'
  import Alert from '~/components/elements/alert'
  import Button from '~/components/elements/button'
  import DatePickerCustom from '~/components/elements/datePicker'
  import { ErrorData } from '~/services/api/api'
  import { alterar, cadastrar } from '~/services/projetoService'
  import { FormGroupInput, FormGroupSelect } from '../../form-group'
  import { ModalFooter } from '../../modal'
  import { dataForm } from './formData'
  import { validation } from './validation'
  export const FormCadastrarProjeto = () => {
    const { closeModal, getData, getAction } = useModal<Projeto>(
      ModalEnum.createProjeto
    )
    const { immutableValue: propsModal } = useImmutableValue({
      action: getAction(),
    })
    const { immutableValue: dataModal } = useImmutableValue(getData())
    const readOnly = propsModal?.action === 'read'
    const [projeto, setProjeto] = useState<Projeto>()
    const { user } = useAuth()
  
    const { data: dataContrato } = useFetch<Contrato[]>(
      `/api/contratos/consultar`,
      {
        revalidateOnReconnect: true,
        onError: error => {
          alertError(error, TOAST_CONTAINER.modal)
        },
      }
    )
  
    // #region FORM SUBMIT
    const [status, setStatus] = useState(BUTTON_STATE.NOTHING)
  
    const initialValues: Projeto = dataModal || {
      id: null,
      descricao: null,
      empresa: user.empresa,
      contrato: { id: null },
      dtInicio: null,
      dtFinalizacao: null,
      limiteAlmoco: null,
      limiteKm: null,
      situacao: ProjetoSituacaoEnum.Aberto,
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
  
      onSubmit: async (values: Projeto) => {
        try {
          setSubmitting(true)
          setStatus(BUTTON_STATE.LOADING)
  
          values.limiteAlmoco = formatNumberPtBrToUs(values.limiteAlmoco)
          values.limiteKm = formatNumberPtBrToUs(values.limiteKm)
  
          if (propsModal?.action === 'update') {
            await alterar(values)
              .then(data => {
                alertUpdateSuccess()
                setProjeto(data as Projeto)
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
                setProjeto(data as Projeto)
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
      id,
      descricao,
      contrato,
      dtInicio,
      dtFinalizacao,
      limiteAlmoco,
      limiteKm,
      situacao,
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
            <FormGroupInput
              field={descricao}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Descrição"
              readOnly={readOnly}
              messageError={errors.descricao}
            />
            <div className="row">
              <FormGroupSelect
                field={contrato}
                required
                value={contrato.field.value.id}
                className="col-md-12"
                label="Contrato"
                onChange={e => {
                  setFieldValue(contrato.field.name, {
                    id: Number(e.target.value),
                  })
                }}
                disabled={readOnly || propsModal?.action === 'update'}
                messageError={errors.contrato?.id}>
                <option value={null}>
                  {!dataContrato ? 'Carregando...' : 'Selecionar'}
                </option>
                {(dataContrato || []).map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {`${leftPad(item.id, 6)} -
                      Emi. ${format(
                        new Date(item.dtEmissao),
                        'dd/MM/yyyy'
                      )} Ven. ${format(
                        new Date(item.dtVencimento),
                        'dd/MM/yyyy'
                      )}`}
                    </option>
                  )
                })}
              </FormGroupSelect>
  
              <DatePickerCustom
                className="col-md-3"
                label="Data Inicial"
                onBlur={dtInicio.field.onBlur}
                isInvalid={dtInicio.isInvalid}
                messageError={errors.dtInicio}
                readOnly={readOnly}
                value={dtInicio.field.value}
                name={dtInicio.field.name}
                popperPlacement="auto"
                onChange={date => setFieldValue(dtInicio.field.name, date)}
              />
              <DatePickerCustom
                className="col-md-3"
                label="Data Finalização"
                onBlur={dtFinalizacao.field.onBlur}
                isInvalid={dtFinalizacao.isInvalid}
                messageError={errors.dtFinalizacao}
                readOnly={readOnly}
                value={dtFinalizacao.field.value}
                name={dtFinalizacao.field.name}
                popperPlacement="auto"
                onChange={date => setFieldValue(dtFinalizacao.field.name, date)}
              />
              <FormGroupInput
                field={limiteAlmoco}
                required
                classNameFormGroup="col-md-3"
                type="text"
                placeholder="0,00"
                label="Limite Almoço"
                mask="currency"
                readOnly={readOnly}
                messageError={errors.limiteAlmoco}
              />
              <FormGroupInput
                field={limiteKm}
                required
                classNameFormGroup="col-md-3"
                type="text"
                placeholder="0,00"
                label="Limite Km"
                mask="currency"
                readOnly={readOnly}
                messageError={errors.limiteKm}
              />
              <FormGroupSelect
                field={situacao}
                required
                value={situacao.field.value}
                className="col-md-12"
                label="Situação"
                disabled={true}
                messageError={errors.situacao}>
                <option value={null} selected={true}>
                  Selecionar
                </option>
                {Object.keys(ProjetoSituacaoEnum)
                  .filter(value => typeof ProjetoSituacaoEnum[value] === 'number')
                  .map(value => {
                    return (
                      <option
                        key={ProjetoSituacaoEnum[value]}
                        value={ProjetoSituacaoEnum[value]}>
                        {value}
                      </option>
                    )
                  })}
              </FormGroupSelect>
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
                closeModal(ModalEnum.createProjeto, projeto)
                // fetchData({ pageSize: pageSize, pageIndex: pageIndex })
                setStatus(BUTTON_STATE.NOTHING)
              }}
              disabled={!dataContrato}
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
              closeModal(ModalEnum.createProjeto)
            }}>
            {readOnly ? 'Fechar' : 'Cancelar'}
          </Button>
        </ModalFooter>
      </form>
    )
  }