import {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
  BUTTON_STATE,
} from '@components'
import { useAuth } from '@context'
import { useFetch, useImmutableValue, useModal } from '@hooks'
import {
  Funcionario,
  ModalEnum,
  PrestacaoContas,
  PrestacaoContasSituacaoEnum,
  ProjetoResponsavel,
} from '@types'
import { TOAST_CONTAINER } from '@utils'
import { useFormik } from 'formik'
import { useState } from 'react'
import { date } from 'yup/lib/locale'
import { FormLabel } from '~/components/elements'
import Alert from '~/components/elements/alert'
import Button from '~/components/elements/button'
import DatePickerCustom from '~/components/elements/datePicker'
import { ErrorData } from '~/services/api/api'
import { alterar, cadastrar } from '~/services/prestacaoContasService'
import { FormGroupInput, FormGroupSelect } from '../../form-group'
import { ModalFooter } from '../../modal'
import { dataForm } from './formData'
import { validation } from './validation'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'

export const FormCadastrarPrestacaoContas = () => {
  const { closeModal, getData, getAction } = useModal<PrestacaoContas>(
    ModalEnum.createPrestacaoContas
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [prestacaoContas, setPrestacaoContas] = useState<PrestacaoContas>()
  const { user } = useAuth()

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: PrestacaoContas = dataModal || {
    id: null,
    observacao: "",
    empresa: user.empresa,
    projeto: { id: null },
    dtEmissao: null,
    funcionario: { id: null },
    situacao: PrestacaoContasSituacaoEnum.Aberto,
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

    onSubmit: async (values: PrestacaoContas) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)

        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(data => {
              alertUpdateSuccess()
              setPrestacaoContas(data as PrestacaoContas)
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
              setPrestacaoContas(data as PrestacaoContas)
              setStatus(BUTTON_STATE.SUCCESS)
              console.log("new data", new Date())
              console.log("current data", values.dtEmissao)
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
  const { id, observacao, projeto, dtEmissao, funcionario, situacao } =
    dataForm({
      touched,
      errors,
      getFieldProps,
    })
  // #endregion

  const { data: dataProjeto, isValidating } = useFetch<ProjetoResponsavel[]>(
    funcionario.field.value?.id &&
      `/api/projetoresponsavel/consultar?idfuncionario=${funcionario.field.value?.id}`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  const { data: dataFuncionario } = useFetch<Funcionario[]>(
    `/api/funcionarios/consultarLogado`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

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
              field={funcionario}
              required
              value={funcionario.field.value?.id}
              className="col-md-12"
              label="Funcionário"
              onChange={e => {
                setFieldValue(funcionario.field.name, {
                  id: Number(e.target.value),
                })
              }}
              disabled={readOnly || propsModal?.action === 'update'}
              messageError={errors.funcionario?.id}>
              <option value={null}>
                {!dataFuncionario ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataFuncionario || []).map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                )
              })}
            </FormGroupSelect>

            <FormGroupSelect
              field={projeto}
              required
              value={projeto.field.value.id}
              className="col-md-12"
              label="Projeto"
              onChange={e => {
                setFieldValue(projeto.field.name, {
                  id: Number(e.target.value),
                })
              }}
              disabled={
                readOnly ||
                propsModal?.action === 'update' ||
                !funcionario.field.value?.id
              }
              messageError={errors.projeto?.id}>
              <option value={null}>
                {isValidating ? 'Carregando...' : 'Selecionar'}
              </option>

              {(dataProjeto || []).map(item => {
                return (
                  <option key={item.id} value={item.projeto.id}>
                    {item.projeto.descricao}
                  </option>
                )
              })}
            </FormGroupSelect>

            <DatePickerCustom
              className="col-md-3"
              label="Data Emissão"
              onBlur={dtEmissao.field.onBlur}
              isInvalid={dtEmissao.isInvalid}
              messageError={errors.dtEmissao}
              readOnly={false}
              value={dtEmissao.field.value}
              name={dtEmissao.field.name}
              popperPlacement="auto"
              onChange={date => setFieldValue(dtEmissao.field.name, date)}
            />
            {/* <FormGroupSelect
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
              {Object.keys(PrestacaoContasSituacaoEnum)
                .filter(
                  value =>
                    typeof PrestacaoContasSituacaoEnum[value] === 'number'
                )
                .map(value => {
                  return (
                    <option
                      key={value}
                      value={PrestacaoContasSituacaoEnum[value]}>
                      {value}
                    </option>
                  )
                })}
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
        {!readOnly && propsModal?.action === 'update' && (
          <Button
            type="button"
            state={status}
            onSucess={() => {
              location.reload();
              handleReset(null)
              closeModal(ModalEnum.createPrestacaoContas, prestacaoContas)
              // fetchData({ pageSize: pageSize, pageIndex: pageIndex })
              setStatus(BUTTON_STATE.NOTHING)
            }}
            buttonSize="md"
            disabled={isValidating && !funcionario.field.value?.id}
            onClick={e => {
              e.preventDefault()
              if (!isSubmitting) handleSubmit()
            }}
            className="btn btn-primary ms-auto">
            Salvar
          </Button>
        )}
        {!readOnly && propsModal?.action !== 'aprovar' && propsModal?.action !== 'update' &&(
          <Button
            type="button"
            state={status}
            onSucess={() => {
              location.reload();
              handleReset(null)
              closeModal(ModalEnum.createPrestacaoContas, prestacaoContas)
              //fetchData({ pageSize: pageSize, pageIndex: pageIndex })
              setStatus(BUTTON_STATE.NOTHING)
            }}
            buttonSize="md"
            disabled={isValidating && !funcionario.field.value?.id}
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
            closeModal(ModalEnum.createPrestacaoContas)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </form>
  )
}