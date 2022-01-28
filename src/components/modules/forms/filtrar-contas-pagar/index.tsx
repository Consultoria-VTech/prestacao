import { useFormik } from 'formik'
import React from 'react'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ContasPagarFiltro } from '../../../../types/models/contasPagar'
import { Fornecedor } from '../../../../types/models/fornecedor'
import { PlanoContas } from '../../../../types/models/planoContas'
import { TipoDocumento, TOAST_CONTAINER } from '../../../../util/constants'
import Alert, { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import DatePickerCustom from '../../../elements/datePicker'
import { FormLabel } from '../../../elements/label'
import { FormGroupInput, FormGroupSelect } from '../../form-group'
import { ModalFooter } from '../../modal'
import { FormHr } from './../../form-group/index'
import { dataForm } from './formData'

const FormFiltrarContasPagar: React.FC = () => {
  const idModal = ModalEnum.filterContasPagar

  const { closeModal, getData, getAction } =
    useModal<ContasPagarFiltro>(idModal)
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })

  const { data: dataPlanoContas } = useFetch<PlanoContas[]>(
    `/api/planocontas/consultarTodosResumido`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  const { data: dataFornecedor } = useFetch<Fornecedor[]>(
    `/api/fornecedores/consultar`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    }
  )

  // const { data: dataCentroCusto } = useFetch<CentroCusto[]>(
  //   `/api/centrocustos/consultar`,
  //   {
  //     revalidateOnReconnect: true,
  //     onError: error => {
  //       alertError(error, TOAST_CONTAINER.modal)
  //     },
  //   }
  // )

  const { immutableValue: dataModal } = useImmutableValue(getData())

  // #region FORM SUBMIT

  const initialValues: ContasPagarFiltro = dataModal || {
    idEmpresa: null,
    idNatureza: null,
    idFornecedor: null,
    // idCentroCusto: null,
    idStatus: null,

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

    onSubmit: async (values: ContasPagarFiltro) => {
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
    natureza,
    fornecedor,
    // centroCusto,
    dtEmissaoInicial,
    dtEmissaoFinal,
    dtVencimentoInicial,
    dtVencimentoFinal,
    tipoDoc,
    nDoc,
    status,
  } = dataForm({
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
          <FormLabel>Filtros principais</FormLabel>
          <div className="row">
            <FormGroupSelect
              field={fornecedor}
              required
              value={fornecedor.field.value}
              className="col-md-12"
              label="Fornecedor"
              onChange={fornecedor.field.onChange}>
              <option value={null}>
                {!dataFornecedor ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataFornecedor || []).map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.razao}
                  </option>
                )
              })}
            </FormGroupSelect>

            {/* <FormGroupSelect
              field={natureza}
              required
              value={natureza.field.value}
              className="col-md-12"
              label="Natureza"
              onChange={natureza.field.onChange}>
              <option value={null}>
                {!dataPlanoContas ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataPlanoContas || [])
                .filter(p => !p.root && p.ativo && p.nivel <= 2)
                .map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.hierarquia} - {item.descricao}
                    </option>
                  )
                })}
            </FormGroupSelect> */}

            {/* <FormGroupSelect
              field={centroCusto}
              required
              value={centroCusto.field.value}
              className="col-md-12"
              label="Centro de custo"
              onChange={centroCusto.field.onChange}>
              <option value={null}>
                {!dataCentroCusto ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataCentroCusto || [])
                .filter(p => p.ativo)
                .map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.descricao}
                    </option>
                  )
                })}
            </FormGroupSelect> */}
          </div>
        </div>
        {/* Conta a Pagar */}
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
              popperPlacement="top"
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
              popperPlacement="top"
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
              popperPlacement="top"
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
              popperPlacement="top"
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

export default FormFiltrarContasPagar
