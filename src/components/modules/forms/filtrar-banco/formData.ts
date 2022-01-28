import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type BancoInputs = {
  bankId: FieldProps<number>
  name: FieldProps<string>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): BancoInputs => {
  return {
    bankId: {
      field: getFieldProps('bankId'),
      isInvalid:
        get(touched, 'bankId') && get(errors, 'bankId') && errors.bankId !== '',
    },
    name: {
      field: getFieldProps('name'),
      isInvalid:
        get(touched, 'name') && get(errors, 'name') && errors.name !== '',
    },
  }
}
