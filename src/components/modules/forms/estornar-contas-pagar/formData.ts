import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { ContaBancaria } from '../../../../types/models/contaBancaria'

type BaixarContasPagarInputs = {
  valorBaixa: FieldProps<string>
  contaBancaria: FieldProps<ContaBancaria>
  dtbaixa: FieldProps<string>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): BaixarContasPagarInputs => {
  return {
    valorBaixa: {
      field: getFieldProps('valorBaixa'),
      isInvalid:
        get(touched, 'valorBaixa') && get(errors, 'valorBaixa') && errors.valorBaixa !== '',
    },
    contaBancaria: {
      field: getFieldProps('contaBancaria'),
      isInvalid:
        get(touched, 'contaBancaria') &&
        get(errors, 'contaBancaria') &&
        errors.contaBancaria !== '',
    },
    dtbaixa: {
      field: getFieldProps('dtbaixa'),
      isInvalid:
        get(touched, 'dtbaixa') &&
        get(errors, 'dtbaixa') &&
        errors.dtbaixa !== '',
    },
  }
}
