import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type FornecedorFiltroInputs = {
  idempresa: FieldProps<number>
  id: FieldProps<number>
  razao: FieldProps<string>
  cnpj: FieldProps<string>
  ativo: FieldProps<string | null>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): FornecedorFiltroInputs => {
  return {
    idempresa: {
      field: getFieldProps('idempresa'),
      isInvalid: false,
    },
    id: {
      field: getFieldProps('id'),
      isInvalid: false,
    },
    razao: {
      field: getFieldProps('razao'),
      isInvalid:
        get(touched, 'razao') && get(errors, 'razao') && errors.razao !== '',
    },
    cnpj: {
      field: getFieldProps('cnpj'),
      isInvalid:
        get(touched, 'cnpj') && get(errors, 'cnpj') && errors.cnpj !== '',
    },

    ativo: {
      field: getFieldProps('ativo'),
      isInvalid: false,
    },
  }
}
