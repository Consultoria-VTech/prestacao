import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useFetch } from '~/hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ErrorData } from '../../../../services/api/api'
import { alterar, cadastrar } from '../../../../services/biService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Bi, EmpresaTipo } from '../../../../types/models/bi'
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

const FormCadastrarBi: React.FC = () => {
  const idModal = ModalEnum.createBi
  const { closeModal, getData, getAction } = useModal<Bi>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [bi, setBi] = useState<Bi>()

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: Bi = dataModal || {
    link: null,
    descricao: null,
    aplicacao: null,
    workspace: null,
    report: null,
    ativo: true,
    empresa: { id: null, razao: null },
  }

  const validationSchema = validation(propsModal?.action === 'create')

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

    onSubmit: async (values: Bi) => {
      setSubmitting(true)

      try {
        setStatus(BUTTON_STATE.LOADING)

        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(data => {
              alertUpdateSuccess()
              setBi(data as Bi)
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
              setBi(data as Bi)
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
    link,
    descricao,
    aplicacao,
    workspace,
    report,
    ativo,
    empresa,
  } = dataForm({
    touched,
    errors,
    getFieldProps,
  })

  // #endregion

  const { data: dataEmpresaTipo } = useFetch(
    `/api/empresas`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  const dataEmpresa = dataEmpresaTipo?.data?.map(item =>{
    return {
      id: item.id,
      razao: item.razao,
    }
  });

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
              field={empresa}
              required
              value={empresa.field.value.id}
              className="col-md-12"
              label="Empresa"
              onChange={e => {
                setFieldValue(empresa.field.name, {
                  id: Number(e.target.value),
                })
              }}
              disabled={readOnly}
              messageError={errors.empresa?.id}>
              <option value={null}>
                {!dataEmpresa ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataEmpresa || []).map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.razao}
                  </option>
                )
              })}
            </FormGroupSelect>
            <FormGroupInput
              field={link}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Link"
              mask="none"
              readOnly={readOnly}
              messageError={errors.link}
            />
            <FormGroupInput
              field={descricao}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Descrição"
              mask="none"
              readOnly={readOnly}
              messageError={errors.descricao}
            />
            <FormGroupInput
              field={aplicacao}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Aplicação"
              mask="none"
              readOnly={readOnly}
              messageError={errors.aplicacao}
            />
            <FormGroupInput
              field={workspace}
              required
              classNameFormGroup="col-md-6"
              type="text"
              label="Workspace"
              mask="none"
              readOnly={readOnly}
              messageError={errors.workspace}
            />
            <FormGroupInput
              field={report}
              required
              classNameFormGroup="col-md-6"
              type="text"
              label="Report"
              mask="none"
              readOnly={readOnly}
              messageError={errors.report}
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
              closeModal(idModal, bi)
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

export default FormCadastrarBi