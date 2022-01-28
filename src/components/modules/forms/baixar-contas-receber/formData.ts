import get from 'lodash/get'
import { PlanoContas, ContaBancaria } from '~/types/models'
import { DataForm, FieldProps } from '../../../../types/formProps'

type BaixarContasPagarInputs = {
  valorConciliado: FieldProps<string>
  idcontaBancaria: FieldProps<ContaBancaria>
  dtbaixa: FieldProps<string>
  idplanodecontas: FieldProps<PlanoContas>
  valorResto: FieldProps<string>
  ativo: FieldProps<boolean>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): BaixarContasPagarInputs => {
  return {
    valorConciliado: {
      field: getFieldProps('valorConciliado'),
      isInvalid:
        get(touched, 'valorConciliado') &&
        get(errors, 'valorConciliado') &&
        errors.valorConciliado !== '',
    },
    idcontaBancaria: {
      field: getFieldProps('idcontaBancaria'),
      isInvalid:
        get(touched, 'idcontaBancaria') &&
        get(errors, 'idcontaBancaria') &&
        errors.idcontaBancaria !== '',
    },
    dtbaixa: {
      field: getFieldProps('dtbaixa'),
      isInvalid:
        get(touched, 'dtbaixa') &&
        get(errors, 'dtbaixa') &&
        errors.dtbaixa !== '',
    },
    idplanodecontas: {
      field: getFieldProps('idplanodecontas'),
      isInvalid:
        get(touched, 'idplanodecontas') &&
        get(errors, 'idplanodecontas') &&
        errors.idplanodecontas !== '',
    },
    valorResto: {
      field: getFieldProps('valorResto'),
      isInvalid:
        get(touched, 'valorResto') &&
        get(errors, 'valorResto') &&
        errors.valorResto !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid:
        get(touched, 'ativo') &&
        get(errors, 'ativo') &&
        errors.ativo !== '',
    },
  }
}
