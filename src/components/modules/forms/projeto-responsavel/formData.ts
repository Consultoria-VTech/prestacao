import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { Funcionario } from '../../../../types/models/funcionario'

type ProjetoResponsavelInputs = {
  funcionario: FieldProps<Funcionario>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ProjetoResponsavelInputs => {
  return {
    funcionario: {
      field: getFieldProps('funcionario'),
      isInvalid:
        get(touched, 'funcionario') &&
        get(errors, 'funcionario') &&
        errors.funcionario !== '',
    },
  }
}