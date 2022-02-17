import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type CentroCustoFiltroInputs = {
  descricao: FieldProps<string>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): CentroCustoFiltroInputs => {
  return {
    descricao: {
      field: getFieldProps('descricao'),
      isInvalid:
        get(touched, 'descricao') &&
        get(errors, 'descricao') &&
        errors.descricao !== '',
    },
  }
}
