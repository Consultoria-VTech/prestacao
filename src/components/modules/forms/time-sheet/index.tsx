import { Field, FieldArray, Formik, useFormik } from 'formik'
import React from 'react'
import { FormGroup, FormLabel } from 'react-bootstrap-v5'
import { useAuth } from '../../../../context/authContext'
import { useFetch } from '../../../../hooks/useFetch'
import { useImmutableValue } from '../../../../hooks/useImmutableValue'
import { useModal } from '../../../../hooks/useModal'
import { ModalEnum } from '../../../../types/enum/modalEnum'
import { ICON_LIBRARY } from '../../../../types/icon'
import { Contrato } from '../../../../types/models/contrato'
import { Projeto } from '../../../../types/models/projeto'
import { Tarefas, TimeSheet } from '../../../../types/models/timeSheet'
import { TOAST_CONTAINER } from '../../../../util/constants'
import Alert, { alertError } from '../../../elements/alert'
import Button from '../../../elements/button/index'
import Icon from '../../../elements/icon'
import { FormGroupInput, FormGroupSelect, FormHr } from '../../form-group'
import { dataForm } from './formData'
import { validation } from './validation'

type FormTimeSheetProps = {
  daysInWeek: { dia: number; qtdHoras: number }[]
  sumItemsHours: { dia: number; qtdHoras: number }[]
  setSumItemsHours: React.Dispatch<React.SetStateAction<any[]>>
}

export const FormTimeSheet: React.FC<FormTimeSheetProps> = (
  props: FormTimeSheetProps
) => {
  const { daysInWeek, sumItemsHours, setSumItemsHours } = props
  const idModal = ModalEnum.createTimeSheet
  const { user } = useAuth()
  const { getData } = useModal<TimeSheet>(idModal)
  const { immutableValue: dataModal } = useImmutableValue(getData())

  const { data: dataProjetos } = useFetch<Projeto[]>(
    `/api/projetos`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    },
    undefined,
    false,
    true
  )

  const { data: dataTarefas } = useFetch<Tarefas[]>(
    `/api/tarefas`,
    {
      revalidateOnReconnect: true,
      onError: error => {
        alertError(error, TOAST_CONTAINER.modal)
      },
    },
    undefined,
    false,
    true
  )

  const initialValues: TimeSheet = dataModal || {
    id: 0,
    empresa: {
      id: user?.empresa.id
    },
    tarefas: {
      id: 0,
    },
    projetos: {
      id: 0,
    },
    funcionario: {
      id: user?.idUsuario,
    },
    data: '',
    hora: '',
    minuto: '',
    qtdHoras: 0,
  }

  const validationSchema = validation()

  const {
    getFieldProps,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleChange,
  } = useFormik({
    enableReinitialize: true,
    validateOnBlur: true,
    initialValues: initialValues,
    validationSchema,

    onSubmit: async (values: TimeSheet) => {
      setSubmitting(true)

      try {
        // setStatus(BUTTON_STATE.LOADING)
        // const data = new FormData()

        // data.append('id', values?.id?.toString() || null)
        // data.append('empresa', user.empresa?.id?.toString())
        // data.append('planoContas', values.planoContas.id.toString())
        // data.append('fornecedor', values.fornecedor.id.toString())

        // data.append('valor', formatNumberPtBrToUs(values.valor).toString())
        // // data.append('valorBaixa')
        // data.append(
        //   'dtEmissao',
        //   format(values.dtEmissao as Date, 'yyyy-MM-dd hh:mm:ss')
        // )
        // data.append(
        //   'dtVencimento',
        //   format(values.dtVencimento as Date, 'yyyy-MM-dd hh:mm:ss')
        // )
        // // data.append('contaBancaria', values.contaBancaria.id.toString())
        // data.append('tipoDoc', values.tipoDoc)
        // data.append('nDoc', values.nDoc)
        // // data.append('status')
        // data.append('nParcelas', values.nParcelas.toString())
        // // data.append('renegociacao')

        // data.append('comprovante', values.comprovante)

        // // if (propsModal?.action === 'update') {
        // //   await alterar(data)
        // //     .then(data => {
        // //       alertUpdateSuccess()
        // //       setContasPagar(data as ContasPagar)
        // //       setStatus(BUTTON_STATE.SUCCESS)
        // //     })
        // //     .catch((e: ErrorData) => {
        // //       alertError(e, TOAST_CONTAINER.modal)
        // //       setStatus(BUTTON_STATE.ERROR)
        // //     })
        // // } else {
        // //   await cadastrar(data)
        // //     .then(data => {
        // //       alertCreateSuccess()
        // //       setContasPagar(data as ContasPagar)
        // //       setStatus(BUTTON_STATE.SUCCESS)
        // //     })
        // //     .catch((e: ErrorData) => {
        // //       alertError(e, TOAST_CONTAINER.modal)
        // //       setStatus(BUTTON_STATE.ERROR)
        // //     })
        // // }

        // // revalidate()

        setSubmitting(false)
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
  const { projetos, tarefas } = dataForm({
    touched,
    errors,
    getFieldProps,
  })
  // #endregion

  const initialValuesReleaseDays = {
    projeto: {
      id: '',
    },
    atividade: {
      id: '',
    },
    dias: daysInWeek,
  }

  const getValues = values => {
    const sumItems = daysInWeek.map(d => ({ dia: d.dia, qtdHoras: 0 }))

    values.forEach(linha => {
      daysInWeek.forEach(coluna => {
        const filter = linha.dias.filter(item => item.dia === coluna.dia)
        if (filter.length === 0) return

        const indexDay = sumItems.findIndex(item => item.dia === coluna.dia)
        sumItems[indexDay].qtdHoras =
          filter[0].qtdHoras + sumItems[indexDay].qtdHoras
      })
    })

    setSumItemsHours([...sumItems])
  }

  function Form({ values, handleSubmit, handleReset, setFieldValue }) {
    // getValues(values.lancamentoDias)

    return (
      <form onSubmit={handleSubmit}>
        <FieldArray
          name="lancamentoDias"
          validateOnChange
          render={({ name, push }) => (
            <>
              <FormHr />
              <FormLabel>Informe o tempo trabalhado</FormLabel>

              {values.lancamentoDias.map((_, indexLancamentoDias) => (
                <>
                  <div className="row" key={indexLancamentoDias}>
                    <FormGroupSelect
                      field={projetos}
                      name={`${name}[${indexLancamentoDias}].projeto`}
                      required
                      value={projetos.field?.value.id}
                      className="col-md-2"
                      label="Projetos"
                      onChange={e => {
                        setFieldValue(String(projetos.field.name), {
                          id: Number(e.target.value),
                        })
                      }}
                      messageError={errors.projetos?.id}>
                      <option value={null}>
                        {!dataProjetos ? 'Carregando...' : 'Selecionar'}
                      </option>
                      {(dataProjetos || []).map(item => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.descricao}
                          </option>
                        )
                      })}
                    </FormGroupSelect>

                    <FormGroupSelect
                      field={tarefas}
                      name={`${name}[${indexLancamentoDias}].atividade`}
                      required
                      value={tarefas.field.value.id}
                      className="col-md-2"
                      label="Atividades"
                      onChange={e => {
                        setFieldValue(tarefas.field.value.nome, {
                          id: Number(e.target.value),
                        })
                      }}
                      messageError={errors.tarefas?.id}>
                      <option value={null}>
                        {!dataTarefas ? 'Carregando...' : 'Selecionar'}
                      </option>
                      {(dataTarefas || []).map(item => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.descricao}
                          </option>
                        )
                      })}
                    </FormGroupSelect>

                    {/* tempo trabalhado */}
                    <div className="col-md-8 py-1">
                      <div className="row">
                        {daysInWeek.map((day, index) => (
                          <FormGroup className="col-2" key={day.dia}>
                            <label className="form-control-label">
                              Dia {day.dia}
                            </label>
                            <div style={{ flex: 1 }}>
                              <Field
                                name={`${name}[${indexLancamentoDias}].dias[${index}].qtdHoras`}
                                className="form-control"
                                onBlur={() => getValues(values.lancamentoDias)}
                                placeholder="0"
                                type="number"
                                min="0"
                                defaultValue={day.qtdHoras}
                              />
                            </div>
                          </FormGroup>
                        ))}

                        {indexLancamentoDias ===
                          values.lancamentoDias.length - 1 && (
                          <div className="col-2 d-flex">
                            <Button
                              type="button"
                              onClick={() => push(initialValuesReleaseDays)}
                              className="btn btn-primary mx-0 w-100 mb-0 mt-auto d-flex justify-content-center">
                              <Icon
                                icon="ImPlus"
                                className="m-0"
                                iconLibrary={ICON_LIBRARY.ICOMOON_FREE}
                                size="1rem"
                              />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          )}
        />
      </form>
    )
  }

  return (
    <>
      <Formik
        initialValues={{ lancamentoDias: [initialValuesReleaseDays] }}
        onSubmit={values => console.log(values)}
        enableReinitialize
        component={Form}
      />
      <FormHr />

      <div className="row">
        <div className="col-md-4 d-flex align-items-center justify-content-start pt-md-4 mt-md-2">
          <FormLabel>Total horas</FormLabel>
        </div>

        <div className="col-md-8">
          <div className="row">
            {sumItemsHours.map(item => (
              <>
                <FormGroupInput
                  key={item.dia}
                  readOnly
                  value={item.qtdHoras}
                  classNameFormGroup="col-2"
                  type="number"
                  placeholder="0"
                  label={`Total Horas`}
                />
              </>
            ))}

            <div className="col-2 py-1 d-flex">
              <Button
                type="submit"
                className="btn btn-primary mx-0 w-100 mb-0 mt-auto d-flex justify-content-center">
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}