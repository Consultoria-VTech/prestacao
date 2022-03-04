import { useFormik } from 'formik'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { ConsultarCep } from '../../../../services/consultarCep'
import { alterar, cadastrar } from '../../../../services/empresaService'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { TOAST_CONTAINER } from '../../../../util/constants'
import { removeMask } from '../../../../util/stringUtil'
import Checkbox from '../../../elements/checkbox'
import Input from '../../../elements/input'
import { ModalFooter } from '../../modal'
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { useModal } from './../../../../hooks/useModal'
import { Empresa } from './../../../../types/models/empresa'
import {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from './../../../elements/alert/index'
import Button, { BUTTON_STATE } from './../../../elements/button/index'
import { FormGroupInput } from './../../form-group/index'
import { dataForm } from './formData'
import { FormCadastrarEmpresaStyled } from './styles'
import { validation } from './validation'

const FormCadastrarEmpresa: React.FC = () => {
  const { closeModal, getData, getAction } = useModal<Empresa>(
    ModalEnum.createEmpresa
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [empresa, setEmpresa] = useState<Empresa>()

  // #region FORM SUBMIT
  const [success, setSuccess] = useState(BUTTON_STATE.NOTHING)

  const initialValues: Empresa = dataModal || {
    id: null,
    razao: '',
    cnpj: '',
    ie: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: '',
    numero: null,
    bairro: '',
    complemento: '',
    telefone: '',
    email: '',
    observacao: '',
    ativo: true,
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

    onSubmit: async (values: Empresa) => {
      setSubmitting(true)
      setSuccess(BUTTON_STATE.LOADING)

      values.cnpj = removeMask(values.cnpj)
      values.cep = removeMask(values.cep)
      values.telefone = removeMask(values.telefone)

      if (propsModal?.action === 'update') {
        await alterar(values)
          .then(data => {
            alertUpdateSuccess()
            setEmpresa(data as Empresa)
            setSuccess(BUTTON_STATE.SUCCESS)
          })
          .catch(e => {
            alertError(e, TOAST_CONTAINER.modal)
            setSuccess(BUTTON_STATE.ERROR)
          })
      } else {
        await cadastrar(values)
          .then(data => {
            alertCreateSuccess()
            setEmpresa(data as Empresa)
            setSuccess(BUTTON_STATE.SUCCESS)
          })
          .catch(e => {
            alertError(e, TOAST_CONTAINER.modal)
            setSuccess(BUTTON_STATE.ERROR)
          })
      }

      setSubmitting(false)
    },
  })

  // #endregion

  // #region FORM DATA
  const {
    // idempresa,
    // id,
    razao,
    cnpj,
    ie,
    cep,
    endereco,
    cidade,
    estado,
    numero,
    bairro,
    complemento,
    telefone,
    email,

    observacao,
    ativo,
    // idpessoa,
  } = dataForm({ touched, errors, getFieldProps })
  // #endregion

  // #region Eventos
  const ref = React.useRef<HTMLInputElement>()
  const [focus, setFocus] = useState(false)
  React.useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('focus', function () {
        setFocus(true)
      })

      ref.current.addEventListener('blur', function () {
        setFocus(false)
      })
    }
  }, [ref])

  const handleClickConsultarCep = React.useCallback(() => {
    if (errors.cep || readOnly) return

    ConsultarCep(cep.field.value)
      .then(res => {
        setFieldValue('cidade', res.city)
        setFieldValue('estado', res.state)
        setFieldValue('endereco', res.street)
        setFieldValue('bairro', res.neighborhood)
      })
      .catch(e => setFieldError('cep', 'O cep informado não foi encontrado!'))
  }, [cep, readOnly])
  // #endregion

  return (
    <FormCadastrarEmpresaStyled
      className="row justify-content-center needs-validation"
      noValidate
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isSubmitting) handleSubmit(e)
      }}>
      <div className="row col-md-12 g-3 mt-0">
        {/* Dados */}
        <div className="col-md-12">
          <h3>Dados</h3>
          <div className="row">
            <FormGroupInput
              field={razao}
              required
              classNameFormGroup="col-md-12"
              type="text"
              label="Nome"
              readOnly={readOnly}
              messageError={errors.razao}
            />

            <FormGroupInput
              field={cnpj}
              required
              classNameFormGroup="col-md-4"
              type="text"
              label="CNPJ"
              placeholder="99.999.999/0009-99"
              maxLength={18}
              mask="cpfCnpj"
              readOnly={readOnly}
              messageError={errors.cnpj}
            />
            <FormGroupInput
              field={ie}
              required
              classNameFormGroup="col-md-4"
              type="text"
              label="IE"
              placeholder="IE"
              maxLength={18}
              mask="number"
              readOnly={readOnly}
              messageError={errors.ie}
            />
            <FormGroupInput
              field={email}
              required
              classNameFormGroup="col-md-8"
              type="text"
              label="E-mail"
              readOnly={readOnly}
              messageError={errors.email}
            />

            <FormGroupInput
              field={telefone}
              required
              classNameFormGroup="col-md-4"
              type="text"
              label="Telefone"
              placeholder="(99) 99999-9999"
              mask="telephone"
              readOnly={readOnly}
              messageError={errors.telefone}
            />
          </div>
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

        {/* Endereço */}
        <div className="col-md-12 mt-0">
          <hr />
          <h3 className="">Endereço</h3>
          <div className="row">
            <div
              className={`form-group col-md-3 ${
                cep.isInvalid ? 'has-danger' : ''
              } ${focus ? 'focused' : ''}`}>
              <label htmlFor={cep.field.name} className="form-control-label">
                Cep
              </label>
              <div
                className={`input-group input-group-merge ${
                  cep.isInvalid
                    ? 'position-relative alert-validate alert-validate-with-icon-right'
                    : ''
                }`}
                data-validate={errors.cep}>
                <Input
                  className={`form-control ${
                    cep.isInvalid ? 'is-invalid' : ''
                  }`}
                  type="text"
                  onBlur={cep.field.onBlur}
                  onChange={cep.field.onChange}
                  readOnly={readOnly}
                  value={cep.field.value}
                  placeholder="99999-999"
                  id={cep.field.name}
                  name={cep.field.name}
                  required
                  onKeyDown={e =>
                    e.key === 'Enter' && handleClickConsultarCep()
                  }
                  mask="cep"
                  ref={ref}
                />

                {!readOnly && (
                  <div
                    style={{ cursor: !readOnly ? 'pointer' : 'default' }}
                    className={`input-group-append ${
                      cep.isInvalid ? 'is-invalid' : ''
                    }`}
                    onClick={handleClickConsultarCep}>
                    <span
                      className="input-group-text"
                      style={{ height: '100%' }}>
                      <BsSearch />
                    </span>
                  </div>
                )}
              </div>
            </div>

            <FormGroupInput
              field={cidade}
              required
              classNameFormGroup="col-md-7"
              type="text"
              label="Cidade"
              readOnly={true}
              messageError={errors.cidade}
            />

            <FormGroupInput
              field={estado}
              required
              classNameFormGroup="col-md-2"
              type="text"
              label="Estado"
              readOnly={true}
              messageError={errors.estado}
            />
            <FormGroupInput
              field={endereco}
              required
              classNameFormGroup="col-md-10"
              type="text"
              label="Rua"
              readOnly={readOnly}
              messageError={errors.endereco}
            />
            <FormGroupInput
              field={numero}
              required
              classNameFormGroup="col-md-2"
              type="text"
              readOnly={readOnly}
              mask="number"
              label="Número"
              messageError={errors.numero}
            />
            <FormGroupInput
              field={bairro}
              required
              classNameFormGroup="col-md-12"
              type="text"
              readOnly={readOnly}
              label="Bairro"
              messageError={errors.bairro}
            />
            <FormGroupInput
              field={complemento}
              required
              classNameFormGroup="col-md-12"
              type="text"
              readOnly={readOnly}
              label="Complemento"
              messageError={errors.complemento}
            />
          </div>
        </div>

        {/* Observação */}
        <div className="col-md-12">
          <label htmlFor={observacao.field.name} className="form-control-label">
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

      <ModalFooter className="mt-4 py-0 pt-3">
        {!readOnly && (
          <Button
            type="button"
            state={success}
            onSucess={() => {
              location.reload()
              handleReset(null)
              closeModal(ModalEnum.createEmpresa, empresa)
              // fetchData({ pageSize: pageSize, pageIndex: pageIndex })
              setSuccess(BUTTON_STATE.NOTHING)
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
            closeModal(ModalEnum.createEmpresa)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </FormCadastrarEmpresaStyled>
  )
}

export default FormCadastrarEmpresa