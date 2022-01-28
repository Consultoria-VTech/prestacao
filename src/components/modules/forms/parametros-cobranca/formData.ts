import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type ParametrosCobrancaInputs = {
  id: FieldProps<number>
  descricao: FieldProps<string>
  taxa: FieldProps<string>
  tipo: FieldProps<number>
  ativo: FieldProps<boolean>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ParametrosCobrancaInputs => {
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

    tipo: {
      field: getFieldProps('tipo'),
      isInvalid:
        get(touched, 'tipo') && get(errors, 'tipo') && errors.tipo !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid:
        get(touched, 'ativo') && get(errors, 'ativo') && errors.ativo !== '',
    },
    taxa: {
      field: getFieldProps('taxa'),
      isInvalid:
        get(touched, 'taxa') && get(errors, 'taxa') && errors.taxa !== '',
    },
  }
}
