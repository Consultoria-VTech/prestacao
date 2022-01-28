import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useAuth } from '../../../../context/authContext'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import {
  alterar,
  cadastrar,
} from '../../../../services/parametrosCobrancaService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ParametrosCobranca } from '../../../../types/models/parametrosCobranca'
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
import { formatNumberPtBrToUs } from './../../../../util/numberUtil'
import { dataForm } from './formData'
import { validation } from './validation'

const FormCadastrarParametrosCobranca: React.FC = () => {
  const idModal = ModalEnum.createParametroCobranca

  const { user } = useAuth()

  const { closeModal, getData, getAction } =
    useModal<ParametrosCobranca>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [parametrosCobranca, setParametrosCobranca] =
    useState<ParametrosCobranca>()

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: ParametrosCobranca = dataModal || {
    id: null,
    descricao: null,
    tipo: true,
    ativo: false,
    taxa: null,
    empresa: user.empresa,
  }

  console.log(initialValues)

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

    onSubmit: async (values: ParametrosCobranca) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)
        values.empresa = user.empresa
        values.taxa = formatNumberPtBrToUs(values.taxa)
        const parametro = values
        parametro.tipo = !!+parametro.tipo

        if (propsModal?.action === 'update') {
          await alterar(parametro)
            .then(data => {
              alertUpdateSuccess()
              setParametrosCobranca(data as ParametrosCobranca)
              setStatus(BUTTON_STATE.SUCCESS)
            })
            .catch((e: ErrorData) => {
              alertError(e, TOAST_CONTAINER.modal)
              setStatus(BUTTON_STATE.ERROR)
            })
        } else {
          await cadastrar(parametro)
            .then(data => {
              alertCreateSuccess()
              setParametrosCobranca(data as ParametrosCobranca)
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
  const { taxa, tipo, ativo, descricao } = dataForm({
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
              label="Descrição"
              readOnly={readOnly}
              messageError={errors.descricao}
            />
            <FormGroupSelect
              field={tipo}
              required
              value={tipo.field.value}
              className="col-md-12"
              label="Tipo"
              onChange={tipo.field.onChange}
              disabled={readOnly || propsModal?.action === 'update'}
              messageError={errors.tipo}>
              <option value={null}>Selecione</option>
              <option value={0}>Despesa</option>
              <option value={1}>Receita</option>
            </FormGroupSelect>
            <FormGroupInput
              field={taxa}
              required
              classNameFormGroup="col-md-12"
              type="text"
              placeholder="0,00"
              label="Taxa"
              mask="currency"
              readOnly={readOnly}
              messageError={errors.taxa}
            />

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
        </div>
      </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        {!readOnly && (
          <Button
            type="button"
            state={status}
            onSucess={() => {
              handleReset(null)
              closeModal(idModal, parametrosCobranca)
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

export default FormCadastrarParametrosCobranca
