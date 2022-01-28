import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { Funcionario } from '../../../../types/models/funcionario'

type ContratoResponsavelInputs = {
  funcionario: FieldProps<Funcionario>
  admin: FieldProps<boolean>
  percentual: FieldProps<string>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ContratoResponsavelInputs => {
  return {
    funcionario: {
      field: getFieldProps('funcionario'),
      isInvalid:
        get(touched, 'funcionario') &&
        get(errors, 'funcionario') &&
        errors.funcionario !== '',
    },
    admin: {
      field: getFieldProps('admin'),
      isInvalid:
        get(touched, 'admin') && get(errors, 'admin') && errors.admin !== '',
    },
    percentual: {
      field: getFieldProps('percentual'),
      isInvalid:
        get(touched, 'percentual') &&
        get(errors, 'percentual') &&
        errors.percentual !== '',
    },
  }
}
