import { format } from 'date-fns'
import { useFormik } from 'formik'
import React from 'react'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Cliente } from '../../../../types/models/cliente'
import { ContasReceberFiltro } from '../../../../types/models/contasReceber'
import { Contrato } from '../../../../types/models/contrato'
import { PlanoContas } from '../../../../types/models/planoContas'
import { leftPad } from '../../../../util/stringUtil'
import Alert from '../../../elements/alert'
import Button from '../../../elements/button/index'
import DatePickerCustom from '../../../elements/datePicker'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group'
import { ModalFooter } from '../../modal'
import { useFetch } from './../../../../hooks/useFetch'
import { TipoDocumento, TOAST_CONTAINER } from './../../../../util/constants'
import { alertError } from './../../../elements/alert/index'
import { FormHr } from './../../form-group/index'
import { dataForm } from './formData'

const FormFiltrarContasReceber: React.FC = () => {
  const idModal = ModalEnum.filterContasReceber

  const { closeModal, getData, getAction } = useModal<ContasReceberFiltro>(
    idModal
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())

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

  // #region FORM SUBMIT

  const initialValues: ContasReceberFiltro = dataModal || {
    idEmpresa: null,
    idPlanoContas: null,
    idCliente: null,
    idContrato: null,
    status: null,

    dtEmissaoInicial: null,
    dtEmissaoFinal: null,
    dtVencimentoInicial: null,
    dtVencimentoFinal: null,
    tipoDoc: null,
    nDoc: null,
  }

  const {
    getFieldProps,
    handleSubmit,
    errors,
    isSubmitting,
    setSubmitting,
    handleReset,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validateOnBlur: propsModal?.action !== 'read',

    onSubmit: async (values: ContasReceberFiltro) => {
      setSubmitting(true)

      try {
        closeModal(idModal, values)
      } catch (e) {
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
    idPlanoContas,
    idCliente,
    idContrato,
    dtEmissaoInicial,
    dtEmissaoFinal,
    dtVencimentoInicial,
    dtVencimentoFinal,
    tipoDoc,
    nDoc,
    // status,
  } = dataForm({
    getFieldProps,
  })
  // #endregion

  const { data: dataContrato } = useFetch<Contrato[]>(
    `/api/contratos/consultar?idCliente=${idCliente.field.value}`,
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
          <FormLabel>Filtros principais</FormLabel>
          <div className="row">
            <FormGroupSelect
              field={idCliente}
              required
              value={idCliente.field.value}
              className="col-md-12"
              label="Cliente"
              onChange={e => {
                setFieldValue(idContrato.field.name, null)
                setFieldValue(idCliente.field.name, e.target.value)
              }}>
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
              field={idContrato}
              required
              value={idContrato.field.value}
              className="col-md-12"
              label="Contrato"
              onChange={idContrato.field.onChange}>
              <option value={null}>
                {!dataContrato ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataContrato || []).map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {`${leftPad(item.id, 6)} - Emi. ${format(
                      new Date(item.dtEmissao),
                      'dd/MM/yyyy'
                    )} Ven. ${format(
                      new Date(item.dtVencimento + ' 00:00:00'),
                      'dd/MM/yyyy'
                    )}`}
                  </option>
                )
              })}
            </FormGroupSelect> */}

            {/* <FormGroupSelect
              field={idPlanoContas}
              required
              value={idPlanoContas.field.value}
              className="col-md-12"
              label="Natureza"
              onChange={idPlanoContas.field.onChange}>
              <option value={null}>
                {!dataPlanoContas ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataPlanoContas || [])
                .filter(
                  p => !p.root && p.ativo && p.nivel <= 2 && p.receitaOuDespesa
                )
                .map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.hierarquia} - {item.descricao}
                    </option>
                  )
                })}
            </FormGroupSelect> */}

            {/* <FormGroupSelect
              field={status}
              required
              value={status.field.value}
              className="col-md-12"
              label="Status"
              onChange={e => {
                setFieldValue(status.field.name, {
                  id: Number(e.target.value),
                })
              }}
              messageError={errors.status}>
              <option value={null} selected={true}>
                Selecione
              </option>
              <option value={""}>Teste 1</option>
              <option value={2}>Teste 2</option>
            </FormGroupSelect> */}
          </div>
        </div>
        {/* Conta a Receber */}
        <div className="col-md-12">
          <FormHr />
          <FormLabel>Datas</FormLabel>
          <div className="row">
            <DatePickerCustom
              className="col-md-3"
              label="Dt. inicial emissão"
              onBlur={dtEmissaoInicial.field.onBlur}
              isInvalid={dtEmissaoInicial.isInvalid}
              messageError={errors.dtEmissaoInicial}
              value={dtEmissaoInicial.field.value}
              name={dtEmissaoInicial.field.name}
              onChange={date =>
                setFieldValue(dtEmissaoInicial.field.name, date)
              }
            />
            <DatePickerCustom
              className="col-md-3"
              label="Dt. final emissão"
              onBlur={dtEmissaoFinal.field.onBlur}
              isInvalid={dtEmissaoFinal.isInvalid}
              messageError={errors.dtEmissaoFinal}
              value={dtEmissaoFinal.field.value}
              name={dtEmissaoFinal.field.name}
              onChange={date => setFieldValue(dtEmissaoFinal.field.name, date)}
            />
            <DatePickerCustom
              className="col-md-3"
              label="Dt. inicial vencimento"
              onBlur={dtVencimentoInicial.field.onBlur}
              isInvalid={dtVencimentoInicial.isInvalid}
              messageError={errors.dtVencimentoInicial}
              value={dtVencimentoInicial.field.value}
              name={dtVencimentoInicial.field.name}
              onChange={date =>
                setFieldValue(dtVencimentoInicial.field.name, date)
              }
            />
            <DatePickerCustom
              className="col-md-3"
              label="Dt. final vencimento"
              onBlur={dtVencimentoFinal.field.onBlur}
              isInvalid={dtVencimentoFinal.isInvalid}
              messageError={errors.dtVencimentoFinal}
              value={dtVencimentoFinal.field.value}
              name={dtVencimentoFinal.field.name}
              onChange={date =>
                setFieldValue(dtVencimentoFinal.field.name, date)
              }
            />
          </div>
        </div>

        {/* Documento */}
        <div className="col-md-12">
          <FormHr />
          <FormLabel>Documento</FormLabel>
          <div className="row">
            <FormGroupSelect
              field={tipoDoc}
              required
              value={tipoDoc.field.value}
              className="col-md-3"
              label="Tipo de documento"
              onChange={tipoDoc.field.onChange}
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

            {/* <FormGroupInput
              field={nDoc}
              required
              classNameFormGroup="col-md-3"
              type="text"
              label="Número documento"
              messageError={errors.nDoc}
            /> */}
          </div>
        </div>
      </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        <Button
          type="button"
          buttonSize="md"
          onClick={e => {
            e.preventDefault()
            handleSubmit()
          }}
          className="btn btn-primary ms-auto">
          Filtrar
        </Button>

        <Button
          type="button"
          className="btn"
          data-dismiss="modal"
          onClick={() => {
            handleReset(null)
            closeModal(idModal)
          }}>
          Cancelar
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormFiltrarContasReceber
