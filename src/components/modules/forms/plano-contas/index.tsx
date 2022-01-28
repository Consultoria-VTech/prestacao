import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useAuth } from '../../../../context/authContext'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { alterar, cadastrar } from '../../../../services/planoContasService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { PlanoContas } from '../../../../types/models/planoContas'
import { TOAST_CONTAINER } from '../../../../util/constants'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import Checkbox from '../../../elements/checkbox'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group'
import { ModalFooter } from '../../modal'
import { dataForm } from './formData'
import { validation } from './validation'

const FormCadastrarPlanoContas: React.FC = () => {
  const idModal = ModalEnum.createPlanoContas

  const { user } = useAuth()

  const { data: dataFetch } = useFetch<PlanoContas[]>(
    `/api/planocontas/consultarTodosResumido`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  const { closeModal, getData, getAction } = useModal<PlanoContas>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [planoContas, setPlanoContas] = useState<PlanoContas>()

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: PlanoContas = dataModal || {
    id: null,
    descricao: null,
    planoContasSintetica: { id: null },
    receitaOuDespesa: false,
    ativo: false,
    observacao: '',
    nconta: '',
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

    onSubmit: async (values: PlanoContas) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)
        values.empresa = user.empresa
        const plano = values
        plano.receitaOuDespesa = !!+plano.receitaOuDespesa
        if (propsModal?.action === 'update') {
          await alterar(plano)
            .then(() => {
              alertUpdateSuccess()
              setPlanoContas(values)
              setStatus(BUTTON_STATE.SUCCESS)
            })
            .catch((e: ErrorData) => {
              alertError(e, TOAST_CONTAINER.modal)
              setStatus(BUTTON_STATE.ERROR)
            })
        } else {
          await cadastrar(plano)
            .then(data => {
              alertCreateSuccess()
              setPlanoContas(data as PlanoContas)
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
    planoContasSintetica,
    receitaOuDespesa,
    ativo,
    observacao,
    nconta,
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
          <FormLabel>Dados</FormLabel>
          <div className="row">
            <FormGroupSelect
              field={planoContasSintetica}
              required
              value={planoContasSintetica.field.value.id}
              className="col-md-12"
              label="Categoria"
              onChange={e =>
                setFieldValue('planoContasSintetica', { id: e.target.value })
              }
              disabled={readOnly}
              messageError={errors.planoContasSintetica?.id}>
              <option value={null}>
                {!dataFetch ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataFetch || [])
                .filter(p => !p.root && p.ativo && p.nivel < 2)
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
            </FormGroupSelect>
            <FormGroupInput
              field={descricao}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Descrição"
              readOnly={readOnly}
              messageError={errors.descricao}
            />
            <FormGroupInput
              field={nconta}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Conta Contabil"
              readOnly={readOnly}
              messageError={errors.nconta}
            />
            <FormGroupSelect
              field={receitaOuDespesa}
              required
              value={receitaOuDespesa.field.value}
              className="col-md-12"
              label="Tipo"
              onChange={receitaOuDespesa.field.onChange}
              disabled={readOnly}
              messageError={errors.receitaOuDespesa}>
              <option value={null}>Selecione</option>
              <option value={0}>Despesa</option>
              <option value={1}>Receita</option>
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
          <div className="col-md-12">
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
          </div>
        </div>
      </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        {!readOnly && (
          <Button
            type="button"
            state={status}
            onSucess={() => {
              location.reload()
              handleReset(null)
              closeModal(idModal, planoContas)
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
            disabled={!dataFetch}
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

export default FormCadastrarPlanoContas
