import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type CentroCustoInputs = {
  id: FieldProps<number>
  descricao: FieldProps<string>
  ativo: FieldProps<boolean>
  observacao: FieldProps<string>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): CentroCustoInputs => {
  return {
    id: {
      field: getFieldProps('id'),
      isInvalid: false,
    },
    descricao: {
      field: getFieldProps('descricao'),
      isInvalid:
        get(touched, 'descricao') &&
        get(errors, 'descricao') &&
        errors.descricao !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid:
        get(touched, 'ativo') && get(errors, 'ativo') && errors.ativo !== '',
    },
    observacao: {
      field: getFieldProps('observacao'),
      isInvalid: false,
    },
  }
}
