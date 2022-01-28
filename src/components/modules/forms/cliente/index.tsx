import { useFormik } from 'formik'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useAuth } from '../../../../context/authContext'
import { ConsultarCep } from '../../../../services/consultarCep'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { TOAST_CONTAINER } from '../../../../util/constants'
import { removeMask } from '../../../../util/stringUtil'
import Input from '../../../elements/input'
import { ModalFooter } from '../../modal'
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { useModal } from './../../../../hooks/useModal'
import { alterar, cadastrar } from './../../../../services/clienteService'
import { Cliente } from './../../../../types/models/cliente'
import Alert, {
  alertCreateSuccess,
  alertError,
  alertUpdateSuccess,
} from './../../../elements/alert/index'
import Button, { BUTTON_STATE } from './../../../elements/button/index'
import Checkbox from './../../../elements/checkbox/index'
import { FormGroupInput, FormGroupSelect } from './../../form-group/index'
import { dataForm } from './formData'
import { FormCadastrarClienteStyled } from './styles'
import { validation } from './validation'

const FormCadastrarCliente: React.FC = () => {
  const { closeModal, getData, getAction } = useModal<Cliente>(
    ModalEnum.createCliente
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const readOnly = propsModal?.action === 'read'
  const [cliente, setCliente] = useState<Cliente>()

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const { user } = useAuth()
  const initialValues: Cliente = dataModal || {
    empresa: user.empresa,
    id: null,
    nome: '',
    cnpj: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: '',
    numero: null,
    bairro: '',
    complemento: '',
    telefone: '',
    email: '',
    telefone2: '',
    email2: '',
    telefone3: '',
    email3: '',
    observacao: '',
    ativo: true,
    filial: 'Matriz',
    idpessoa: null,
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

    onSubmit: async (values: Cliente) => {
      try {
        setSubmitting(true)
        setStatus(BUTTON_STATE.LOADING)

        values.cnpj = removeMask(values.cnpj)
        values.cep = removeMask(values.cep)
        values.telefone = removeMask(values.telefone)
        values.telefone2 = removeMask(values.telefone2)
        values.telefone3 = removeMask(values.telefone3)
        values.empresa = user.empresa

        if (propsModal?.action === 'update') {
          await alterar(values)
            .then(() => {
              alertUpdateSuccess()
              setCliente(values)
              setStatus(BUTTON_STATE.SUCCESS)
            })
            .catch(e => {
              alertError(e, TOAST_CONTAINER.modal)
              setStatus(BUTTON_STATE.ERROR)
            })
        } else {
          await cadastrar(values)
            .then(data => {
              alertCreateSuccess()
              setCliente(data as Cliente)
              setStatus(BUTTON_STATE.SUCCESS)
            })
            .catch(e => {
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
    // idempresa,
    // id,
    nome,
    cnpj,
    cep,
    endereco,
    cidade,
    estado,
    numero,
    bairro,
    complemento,
    telefone,
    email,
    telefone2,
    email2,
    telefone3,
    email3,
    observacao,
    ativo,
    filial,
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
    <FormCadastrarClienteStyled
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
              field={nome}
              required
              classNameFormGroup="col-md-8"
              type="text"
              label="Nome"
              readOnly={readOnly}
              messageError={errors.nome}
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

            <FormGroupSelect
              field={filial}
              required
              value={filial.field.value}
              className="col-md-12"
              label="Filial"
              onChange={filial.field.onChange}
              disabled={readOnly}
              messageError={errors.filial}>
              <option value={null}>Selecionar</option>
              <option value={'Filial'}>Filial</option>
              <option value={'Matriz'}>Matriz</option>
            </FormGroupSelect>

            {/* <div className="form-group col-md-8">
              <label className="form-control-label" htmlFor={filial.field.name}>
                Filial
              </label>
              <select
                className="form-control"
                disabled={readOnly}
                id={filial.field.name}
                value={filial.field.value}
                onBlur={filial.field.onBlur}
                onChange={filial.field.onChange}>
                <option>Matriz</option>
                <option>Filial</option>
              </select>
            </div> */}

            {/* <FormGroupInput
              field={filial}
              required
              classNameFormGroup="col-md-8"
              type="text"
              label="Filial"
              readOnly={readOnly}
              messageError={errors.filial}
            /> */}

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

        {/* Cobrança */}
        <div className="col-md-12 mt-0">
          <hr />
          <h3>Cobrança</h3>
          <div className="row">
            <FormGroupInput
              field={telefone2}
              required
              classNameFormGroup="col-md-6"
              type="text"
              mask="telephone"
              placeholder="(99) 99999-9999"
              readOnly={readOnly}
              label="Telefone cobrança 1"
              messageError={errors.telefone2}
            />

            <FormGroupInput
              field={telefone3}
              required
              classNameFormGroup="col-md-6"
              type="text"
              mask="telephone"
              placeholder="(99) 99999-9999"
              readOnly={readOnly}
              label="Telefone cobrança 2"
              messageError={errors.telefone3}
            />

            <FormGroupInput
              field={email2}
              required
              classNameFormGroup="col-md-6"
              type="text"
              readOnly={readOnly}
              label="E-mail cobrança 1"
              messageError={errors.email2}
            />

            <FormGroupInput
              field={email3}
              required
              readOnly={readOnly}
              classNameFormGroup="col-md-6"
              type="text"
              label="E-mail cobrança 2"
              messageError={errors.email3}
            />
          </div>
        </div>

        {/* Endereço */}
        <div className="col-md-12">
          <hr />
          <h3 className="">Endereço</h3>
          <div className="row">
            <div
              className={`form-group py-1 col-md-3 ${
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
            state={status}
            onSucess={() => {
              handleReset(null)
              closeModal(ModalEnum.createCliente, cliente)
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
            closeModal(ModalEnum.createCliente)
          }}>
          {readOnly ? 'Fechar' : 'Cancelar'}
        </Button>
      </ModalFooter>
    </FormCadastrarClienteStyled>
  )
}

export default FormCadastrarCliente
