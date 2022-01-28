import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { ContaBancaria } from '../../../../types/models/contaBancaria'

type ConciliacaoInputs = {
  contaBancaria: FieldProps<ContaBancaria>
  valor: FieldProps<string>
  tipo: FieldProps<string>
  dataPagamento: FieldProps<string>
  dataConciliacao: FieldProps<string>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ConciliacaoInputs => {
  return {
    contaBancaria: {
      field: getFieldProps('contaBancaria'),
      isInvalid:
        get(touched, 'contaBancaria') &&
        get(errors, 'contaBancaria') &&
        errors.contaBancaria !== '',
    },
    valor: {
      field: getFieldProps('valor'),
      isInvalid:
        get(touched, 'valor') && get(errors, 'valor') && errors.valor !== '',
    },

    tipo: {
      field: getFieldProps('tipo'),
      isInvalid:
        get(touched, 'tipo') && get(errors, 'tipo') && errors.tipo !== '',
    },
    dataPagamento: {
      field: getFieldProps('dataPagamento'),
      isInvalid:
      get(touched, 'dataPagamento') &&
      get(errors, 'dataPagamento') &&
      errors.dataPagamento !== '',
    },
    dataConciliacao: {
      field: getFieldProps('dataConciliacao'),
      isInvalid:
        get(touched, 'dataConciliacao') &&
        get(errors, 'dataConciliacao') &&
        errors.dataConciliacao !== '',
    },
  }
}
