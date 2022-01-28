import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type BancoInputs = {
  id: FieldProps<number>
  descricao: FieldProps<string>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): BancoInputs => {
  return {
    id: {
      field: getFieldProps('id'),
      isInvalid: get(touched, 'id') && get(errors, 'id') && errors.id !== '',
    },
    descricao: {
      field: getFieldProps('descricao'),
      isInvalid:
        get(touched, 'descricao') &&
        get(errors, 'descricao') &&
        errors.descricao !== '',
    },
  }
}
