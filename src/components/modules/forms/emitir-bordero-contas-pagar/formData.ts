import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { ContaBancaria } from '../../../../types/models/contaBancaria'

type BaixarContasPagarInputs = {
  valorBaixa: FieldProps<string>
  contaBancaria: FieldProps<ContaBancaria>
  dtEmissao?: FieldProps<string>
  dtBaixa: FieldProps<string>
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
    dtBaixa: {
      field: getFieldProps('dtBaixa'),
      isInvalid:
        get(touched, 'dtBaixa') &&
        get(errors, 'dtBaixa') &&
        errors.dtBaixa !== '',
    },
  }
}
