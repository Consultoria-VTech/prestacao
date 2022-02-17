import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ErrorData } from '../../../../services/api/api'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { Contrato } from '../../../../types/models/contrato'
import { useAuth } from '../../../../context/authContext'
import { TOAST_CONTAINER } from '../../../../util/constants'
import { leftPad } from '../../../../util/stringUtil'
import Alert, { alertError, alertUpdateSuccess } from '../../../elements/alert'
import { FormLabel } from '../../../elements/label'
import { ModalFooter } from '../../modal'
import { useImmutableValue } from './../../../../hooks/useImmutableValue'
import { useModal } from './../../../../hooks/useModal'
import { gerarParcelasContratoReceber, gerarParcelasContratoPagar } from './../../../../services/contratoService'
import Button, { BUTTON_STATE } from './../../../elements/button/index'
import { FormGroupInput, FormGroupSelect } from './../../form-group/index'
import { validation } from './validation'
import { dataForm } from './formData'
import { format } from 'date-fns'

const FormGerarParcelasContrato: React.FC = () => {
  const { closeModal, getData, getAction } = useModal<Contrato>(
    ModalEnum.gerarParcelasContrato
  )
  const { immutableValue: propsModal } = useImmutableValue({
    action: getAction(),
  })
  const { immutableValue: dataModal } = useImmutableValue(getData())
  const [contrato, setContrato] = useState<Contrato>()
  const readOnly = propsModal?.action === 'read'
  const { user } = useAuth()

  // const { data: dataPlanoContas } = useFetch<PlanoContas[]>(
  //   `/api/planocontas/consultarTodosResumido`,
  //   {
  //     revalidateOnReconnect: true,
  //     onError: error => {
  //       alertError(error, TOAST_CONTAINER.modal)
  //     },
  //   }
  // )

  // #region FORM SUBMIT
  const [status, setStatus] = useState(BUTTON_STATE.NOTHING)

  const initialValues: Contrato = dataModal || {
    id: null,
    cliente: { id: null },
    fornecedor: { id: null },
    empresa: user.empresa,
    centroCusto: { id: null },
    observacao: null,
    dtEmissao: null,
    dtVencimento: null,
    valor: null,
    status: null,
    nparcelas: null,
    tipo: null,
    parcelas: null
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

    
    
    onSubmit: async values => {
      var metodo = '';
      var valorParcela
      var converteValor = parseFloat(values.valor.replace(".", ""))
      

      if (values.tipo == 'CP') { 
        metodo = 'contaspagar/gerarparcelas'  
        valorParcela = (converteValor / values.nparcelas).toFixed(2)

        try {
          setSubmitting(true)
          setStatus(BUTTON_STATE.LOADING)
          Alert({
            title: 'Atenção',
            body: 'Geração de parcelas de contratos de Contas a Pagar, precisa ser lançado manualmente',
            type: 'info',
          })
  
          // values.dtEmissao = format(values.dtEmissao as Date, 'yyyy-MM-dd hh:mm:ss'),
          // values.dtVencimento = format(values.dtVencimento as Date, 'yyyy-MM-dd hh:mm:ss'),
          // values.valor = dataModal.valor.replace(".","").replace(",",".")
          
          // await gerarParcelasContratoPagar(
          //   values.empresa.id = dataModal.empresa.id,
          //   values.fornecedor.id = dataModal.fornecedor.id,
          //   values.id = dataModal.id,
          //   values.valor = dataModal.valor,
          //   values.dtEmissao = dataModal.dtEmissao as Date,
          //   values.dtVencimento = dataModal.dtVencimento as Date,
          //   values.nparcelas = dataModal.nparcelas,
          //   valorParcela = valorParcela,
          //   metodo = metodo
          // )
          //   .then(data => {
          //     alertUpdateSuccess(
          //       TOAST_CONTAINER.modal,
          //       'Conta a receber estornada com sucesso!'
          //     )
          //     setContrato(data as Contrato)
          //     setStatus(BUTTON_STATE.SUCCESS)
          //   })
  
            // .catch((e: ErrorData) => {
            //   alertError(e, TOAST_CONTAINER.modal)
            //   setStatus(BUTTON_STATE.ERROR)
            // })
  
          setSubmitting(false)
        } catch (e) {
          setStatus(BUTTON_STATE.ERROR)
          Alert({
            title: 'Aconteceu um erro',
            body: e.message,
            type: 'error',
          })
        }

      }
      if (values.tipo == 'CR') {

        metodo = 'contasreceber/gerarparcelas'
        valorParcela = (converteValor / values.nparcelas).toFixed(2)

        try {
          setSubmitting(true)
          setStatus(BUTTON_STATE.LOADING)

          values.dtEmissao = format(values.dtEmissao as Date, 'yyyy-MM-dd hh:mm:ss')
          values.dtVencimento = format(values.dtVencimento as Date, 'yyyy-MM-dd hh:mm:ss')
          values.valor = dataModal.valor.replace(".","").replace(",",".")
          

          await gerarParcelasContratoReceber(
            values.empresa.id = dataModal.empresa.id,
            values.cliente.id = dataModal.cliente.id,
            values.id = dataModal.id,
            values.valor = dataModal.valor,
            values.dtEmissao = dataModal.dtEmissao as Date,
            values.dtVencimento = dataModal.dtVencimento as Date,
            values.nparcelas = dataModal.nparcelas,
            valorParcela = valorParcela,
            metodo = metodo
          )
            .then(data => {
              alertUpdateSuccess(
                TOAST_CONTAINER.modal,
                'Parcelas geradas com sucesso!'
              )
              setContrato(data as Contrato)
              setStatus(BUTTON_STATE.SUCCESS)
            })
  
            .catch((e: ErrorData) => {
              alertError(e, TOAST_CONTAINER.modal)
              setStatus(BUTTON_STATE.ERROR)
            })
  
          setSubmitting(false)
        } catch (e) {
          setStatus(BUTTON_STATE.ERROR)
          Alert({
            title: 'Aconteceu um erro',
            body: e.message,
            type: 'error',
          })
        }
      }
    },
  })

  // #endregion

  // #region FORM DATA

  const { valorBaixa, contaBancaria, dtBaixa, planoContas } = dataForm({
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
          <FormLabel>Deseja gerar parcelas do lançamento a baixo ?</FormLabel>
          <div className="row">
            <FormGroupInput
              required
              value={leftPad(dataModal?.id, 6)}
              classNameFormGroup="col-md-12"
              type="text"
              label="Código"
              readOnly={true}
            />
            {/* <FormGroupSelect
              field={planoContas}
              required
              value={planoContas.field.value.id}
              className="col-md-12"
              label="Natureza"
              onChange={e => {
                setFieldValue(planoContas.field.name, {
                  id: Number(e.target.value),
                })
              }}
              disabled={readOnly}
              messageError={errors.planoContas?.id}>
              <option value={null}>
                {!dataPlanoContas ? 'Carregando...' : 'Selecionar'}
              </option>
              {(dataPlanoContas || [])
                .filter(
                  p =>
                    !p.root &&
                    (p.ativo || p.id === planoContas.field.value.id) &&
                    p.nivel >= 2 &&
                    p.receitaOuDespesa
                )
                .map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.hierarquia} - {item.descricao}
                    </option>
                  )
                })}
            </FormGroupSelect> */}
          </div>
        </div>
      </div>

      <ModalFooter className="mt-4 py-0 pt-3">
        <Button
          type="button"
          state={status}
          onSucess={() => {
            handleReset(null)
            closeModal(ModalEnum.gerarParcelasContrato)
            setStatus(BUTTON_STATE.NOTHING)
          }}
          buttonSize="md"
          onClick={e => {
            e.preventDefault()
            if (!isSubmitting) handleSubmit()
          }}
          className="btn btn-primary ms-auto">
          Confirmar
        </Button>
        <Button
          type="button"
          className="btn"
          data-dismiss="modal"
          onClick={() => {
            handleReset(null)
            closeModal(ModalEnum.gerarParcelasContrato)
          }}>
          Cancelar
        </Button>
      </ModalFooter>
    </form>
  )
}

export default FormGerarParcelasContrato
