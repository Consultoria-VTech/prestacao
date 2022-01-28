import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { ParametrosCobranca } from '../../../../types/models/parametrosCobranca'

type BaixarContasReceberInputs = {
  valor: FieldProps<string>
  parametroCobranca: FieldProps<ParametrosCobranca>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): BaixarContasReceberInputs => {
  return {
    valor: {
      field: getFieldProps('valor'),
      isInvalid:
        get(touched, 'valor') && get(errors, 'valor') && errors.valor !== '',
    },

    parametroCobranca: {
      field: getFieldProps('parametroCobranca'),
      isInvalid:
        get(touched, 'parametroCobranca') &&
        get(errors, 'parametroCobranca') &&
        errors.parametroCobranca !== '',
    },
  }
}
