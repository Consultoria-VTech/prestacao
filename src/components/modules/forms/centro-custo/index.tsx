import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useAuth } from '../../../../context/authContext'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { alterar, cadastrar } from '../../../../services/centroCustoService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { CentroCusto } from '../../../../types/models/centroCusto'
import { TOAST_CONTAINER } from '../../../../util/constants'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from '../../../elements/alert'
import Button, { BUTTON_STATE } from '../../../elements/button/index'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput } from '../../form-group/index'
import { ModalFooter } from '../../modal'
import Checkbox from './../../../elements/checkbox/index'
import { dataForm } from './formData'
import { validation } from './validation'

const FormCadastrarCentroCusto: React.FC = () => {
  const idModal = ModalEnum.createCentroCusto

  const { closeModal, getData, getAction } = useModal<CentroCusto>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [centroCusto, setCentroCusto] = useState<CentroCusto>()

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)
  const { user } = useAuth()
  const initialValues: CentroCusto = dataModal || {
    id: null,
    descricao: '',
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
  } = useFormik({
    enableReinitialize: true,
    validateOnBlur: propsModal?.action !== 'read',
    initialValues: initialValues,
    validationSchema,

    onSubmit: async (values: CentroCusto) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)

        values.empresa = user.empresa
        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(() => {
              alertUpdateSuccess()
              setCentroCusto(values)
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
              setCentroCusto(data as CentroCusto)
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
  const { descricao, ativo, observacao } = dataForm({
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
              field={descricao}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Nome"
              readOnly={readOnly}
              messageError={errors.descricao}
            />
            <div className="form-group">
              <Checkbox
                label="Ativo"
                id={ativo.field.name}
                name={ativo.field.name}
                onChange={ativo.field.onChange}
                checked={ativo.field.value === true}
                readOnly={readOnly}
                disabled={readOnly}
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
            {/* Observação */}
            <div className="col-md-12">
              <label
                htmlFor={observacao.field.name}
                className="form-control-label">
                Observação
              </label>
              <textarea
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
      </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        {!readOnly && (
          <Button
            type="button"
            state={status}
            onSucess={() => {
              location.reload()
              handleReset(null)
              closeModal(idModal, centroCusto)
              // fetchData({ pageSize: pageSize, pageIndex: pageIndex })
              setStatus(BUTTON_STATE.NOTHING)
            }}
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
            closeModal(idModal)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormCadastrarCentroCusto
