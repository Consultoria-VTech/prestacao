import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { Imposto } from '../../../../types/models/imposto'

type ContratoResponsavelInputs = {
  imposto: FieldProps<Imposto>
  percentual: FieldProps<string>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ContratoResponsavelInputs => {
  return {
    imposto: {
      field: getFieldProps('imposto'),
      isInvalid:
        get(touched, 'imposto') &&
        get(errors, 'imposto') &&
        errors.imposto !== '',
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
